import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import { useContext, useEffect, useState } from "react"
import StoreContext from "../../Store/Context"
import axios from "axios"
import baseUrl from "../../server/server"
import Models from "../../Models"
import NoContentCard from "../../NoContentCard"

const Public = () => {

  const { token } = useContext(StoreContext)

  const [models, setModels] = useState("")

  useEffect(() => {

    //get ai models owned by current user
    const getPublicModels = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/ai/public`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getPublicModels: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getPublicModels error: ", e.response)
      }
    }

    const fetchMyModels = async () => {
      const modelsFromServer = await getPublicModels()
      setModels(modelsFromServer)
    }

    fetchMyModels()

  }, [token])

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Public Models" button="PUBLISH" buttonIcon="globe-americas" path="/my"/>
        

        {(models && models.length > 0) ?
          <div className={"content-table"}>
            <Models models={models} actionButtons="run"/>
          </div>
          :
          <NoContentCard text="No models found!" />
        }
      </div>
    </>
  )
}

export default Public