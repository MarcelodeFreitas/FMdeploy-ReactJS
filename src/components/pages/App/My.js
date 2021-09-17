import { useState, useEffect, useContext } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import Models from "../../Models"
import AppHeader from "../../AppHeader"
import NoContentCard from "../../NoContentCard"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import CustomizedSnackbar from "../../Alert"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'
import { IconButton } from "@material-ui/core"

function My() {
  const history = useHistory()
  // console.log(history)
  let location = useLocation()
  // console.log(location.pathname)
  //in the fure prevent changing the url manually too??
  let currentURL = window.location.href
  // console.log(currentURL)

  history.listen((newLocation, action) => {
    if (action === "PUSH") {
      if (
        newLocation.pathname !== location.pathname ||
        newLocation.search !== location.search
      ) {
        // Save new location
        location.pathname = newLocation.pathname;
        location.search = newLocation.search;

        // Clone location object and push it to history
        history.push({
          pathname: newLocation.pathname,
          search: newLocation.search,
        });
      }
    } else {
      // Send user back if they try to navigate back
      history.go(1)
    }
  })

  const { token } = useContext(StoreContext)

  const [models, setModels] = useState("")

  const [message, setMessage] = useState("")

  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
    severity: "",
  })

  //get ai models owned by id
  const getModelsById = async (aiId) => {
    console.log(aiId)
    try {
      const response = await axios.get(
        `${baseUrl}/ai/${aiId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      return await response.data
    } catch (e) {
      console.log("getModelsById error: ", e.response)
      return e.response.data.detail
    }
  }

  const fetchModelById = async (getModelsById) => {
    setModels(getModelsById)
  }

  const handleMessage = async (message) => {
    setMessage(message)
    setTimeout(() => setMessage(""), 6100)
  }

  useEffect(() => {

    //get ai models owned by current user
    const getMyModels = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/userai/owned_list`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getMyModels: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getMyModels error: ", e.response)
      }
    }

    const fetchMyModels = async () => {
      const modelsFromServer = await getMyModels()
      setModels(modelsFromServer)
    }

    fetchMyModels()

  }, [token])

  const handleDeleteMessage = (message, severity) => {
    setDeleteMessage({
      message: message,
      severity: severity
    })
    setTimeout(() => setDeleteMessage({
      message: "",
      severity: ""
    }), 6100)
  }

  // Delete an AI model
  const deleteModel = async (id) => {

    //delete ai model from server
    try {
      const response = await axios.delete(
        `${baseUrl}/ai/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log(await response)
      handleDeleteMessage(await response.data.detail, "success")
    } catch (e) {
      console.log(e)
      handleDeleteMessage(e.response.data.detail, "error")
    }

    //delete AI model from state
    setModels(models.filter((model) =>
      model.ai_id !== id
    ))
  }

  // public not public ai model
  const modelPrivacy = async (aiId, privacy) => {
    try {
      const response = await axios.put(
        `${baseUrl}/ai`,
        {
          ai_id: aiId,
          is_private: privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      // this.setState({ message: await response.data.detail, severity: "success" })
      console.log("modelPrivacy response: ", await response)
    } catch (e) {
      // this.setState({ message: await e.response.data.detail, severity: "error" })
      console.log("modelPrivacy error: ", e.response.data.detail)
    }

    //update AI model from state
    const updatedModelList = models.map((model) => {
      if (model.ai_id === aiId) {
        return { ...model, is_private: !model.is_private }
      } else {
        return { ...model, is_private: model.is_private }
      }
    })

    setModels(updatedModelList)
  }

  const [searchById, setSearchById] = useState("")
  const [idResults, setIdResults] = useState([])
  const [searchByTitle, setSearchByTitle] = useState("")
  const [titleResults, setTitleResults] = useState([])
  const [searchByAuthor, setSearchByAuthor] = useState("")
  const [authorResults, setAuthorResults] = useState([])

  const [renderType, setRenderType] = useState("default")

  const RenderModelList = ({modelList, type}) => {
    console.log("yooo:", modelList, type)
    if (modelList.length > 0 ) {
      if (type === "default") {
        return(
          <div className={"content-table"}>
            <Models models={models} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        )
      }
      if (type === "searchId") {
        return(
          <div className={"content-table"}>
            Search by Id Results:
            <Models models={idResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        )
      }
      if (type === "searchTitle") {
        return(
          <div className={"content-table"}>
            Search by Title Results:
            <Models models={titleResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        )
      }
      if (type === "searchAuthor") {
        return(
          <div className={"content-table"}>
            Search by Title Results:
            <Models models={authorResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        )
      }
    } else {
      return(
        <NoContentCard text="No models found!" />
      )
    }
    
  }

  const handleSearch = (searchBy, search) => {
    if (searchBy === "id") {
      setIdResults(models.filter((model) =>
        model.ai_id.includes(search)
      ))
    }
    if (searchBy === "title") {
      setTitleResults(models.filter((model) =>
        model.title.includes(search)
      ))
    }
    if (searchBy === "author") {
      setAuthorResults(models.filter((model) =>
        model.author.includes(search)
      ))
    }
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="My Models" button="NEW" buttonIcon="plus" path="/new" />

        {message && <CustomizedSnackbar message={message} severity="error" />}
        {deleteMessage.message && <CustomizedSnackbar message={deleteMessage.message} severity={deleteMessage.severity} />}

        {(models && models.length > 0) ?
          <>
            <div className="searchBars">
              <Autocomplete
                id="searchByModelId"
                freeSolo
                selectOnFocus
                clearOnBlur
                value={searchById}
                sx={{ width: 420, marginTop: "10px", marginBottom: "10px", marginLeft: "20px" }}
                onChange={(event, newValue, reason) => {
                  console.log("onChange", reason)
                  handleSearch("id", newValue)
                  setRenderType("searchId")
                  if (reason === "clear") {
                    setRenderType("default")
                  }
                  
                }}
                onInputChange={(event, newValue) => {
                  setRenderType("searchId")
                  setSearchById(newValue)
                  handleSearch("id", newValue)
                }}
                onOpen = {() => {
                  setSearchById("")
                  setIdResults([])
                  setSearchByTitle("")
                  setTitleResults([])
                  setSearchByAuthor("")
                  setAuthorResults([])
                }}
                options={models.map((option) => option.ai_id)}
                renderInput={(params) =>
                  <TextField {...params} label="search by Model Id" color="warning" />}
              />
              <Autocomplete
                id="searchByTitle"
                freeSolo
                selectOnFocus
                clearOnBlur
                value={searchByTitle}
                sx={{ width: 420, marginTop: "10px", marginBottom: "10px", marginLeft: "20px" }}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setRenderType("searchTitle")
                  setSearchByTitle(newValue)
                  handleSearch("title", newValue)
                }}
                onInputChange={(event, newValue) => {
                  console.log(newValue)
                  setRenderType("searchTitle")
                  setSearchByTitle(newValue)
                  handleSearch("title", newValue)
                }}
                onOpen = {() => {
                  setSearchById("")
                  setIdResults([])
                  setSearchByTitle("")
                  setTitleResults([])
                  setSearchByAuthor("")
                  setAuthorResults([])
                }}
                onClose = {() => {
                  setRenderType("default")
                }}
                options={models.map((option) => option.title)}
                renderInput={(params) =>
                  <TextField {...params} label="search by Title" color="warning" />
                }
              />
              <Autocomplete
                id="searchByAuthor"
                freeSolo
                selectOnFocus
                clearOnBlur
                value={searchByAuthor}
                sx={{ width: 420, marginTop: "10px", marginBottom: "10px", marginLeft: "20px" }}
                onChange={(event, newValue) => {
                  console.log(newValue)
                  setRenderType("searchAuthor")
                  setSearchByAuthor(newValue)
                  handleSearch("author", newValue)
                }}
                onInputChange={(event, newValue) => {
                  setRenderType("searchAuthor")
                  console.log(newValue)
                  setSearchByAuthor(newValue)
                  handleSearch("author", newValue)
                }}
                onOpen = {() => {
                  setSearchById("")
                  setIdResults([])
                  setSearchByTitle("")
                  setTitleResults([])
                  setSearchByAuthor("")
                  setAuthorResults([])
                }}
                onClose = {() => {
                  setRenderType("default")
                }}
                options={models.map((option) => option.author)}
                renderInput={(params) =>
                  <TextField {...params} label="search by Author" color="warning" />
                }
              />
            </div>



          </>
          :
          <NoContentCard text="No models found!" />
        }


        {/* {
          (models.length > 0 && idResults.length === 0 && titleResults.length === 0 && authorResults.length === 0) &&
          
        } */}

        {/* {(models && models.length > 0 && idResults.length > 0) &&
          <div className={"content-table"}>
            id
            <Models models={idResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        }

        {(models && models.length > 0 && titleResults.length > 0) &&
          <div className={"content-table"}>
            title
            <Models models={titleResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        }

        {(models && models.length > 0 && authorResults.length > 0) &&
          <div className={"content-table"}>
            author
            <Models models={authorResults} infoLevel="MyModels" actionButtons="all" onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
        } */}

        <RenderModelList modelList={models} type={renderType}/>


      </div>
    </>
  )
}

export default My
