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
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

import CustomizedSnackbar from "../../Alert"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    } catch (e) {
      console.log(e)
    }

    //delete AI model from state
    setModels(models.filter((model) =>
      model.ai_id !== id
    ))
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="My Models" button="NEW" buttonIcon="plus" path="/new" />
        <SearchById getModelsById={getModelsById} fetchModelById={fetchModelById} handleMessage={handleMessage}/>

        {message && <CustomizedSnackbar message={message} severity="error"/>}

        {(models && models.length > 0) ?
          <div className={"content-table"}>
            <Models models={models} onDelete={deleteModel} />
          </div>
          :
          <NoContentCard text="No models found!" />
        }

      </div>
    </>
  )
}

export default My
