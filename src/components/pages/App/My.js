import { useState, useEffect, useContext } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import Models from "../../Models"
import AppHeader from "../../AppHeader"
import NoContentCard from "../../NoContentCard"
import SearchById from "../../SearchById"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import CustomizedSnackbar from "../../Alert"


function My() {
  const history = useHistory()
  let location = useLocation()
  //in the fure prevent changing the url manually too??
  let currentURL = window.location.href
  console.log(currentURL)

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
        return {...model, is_private: !model.is_private}
      } else {
        return {...model, is_private: model.is_private}
      }
    })

    setModels(updatedModelList)
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="My Models" button="NEW" buttonIcon="plus" path="/new" />
        <SearchById getModelsById={getModelsById} fetchModelById={fetchModelById} handleMessage={handleMessage}/>

        {message && <CustomizedSnackbar message={message} severity="error"/>}
        {deleteMessage.message && <CustomizedSnackbar message={deleteMessage.message} severity={deleteMessage.severity}/>}

        {(models && models.length > 0) ?
          <div className={"content-table"}>
            <Models models={models} onDelete={deleteModel} handlePrivacy={modelPrivacy} />
          </div>
          :
          <NoContentCard text="No models found!" />
        }

      </div>
    </>
  )
}

export default My
