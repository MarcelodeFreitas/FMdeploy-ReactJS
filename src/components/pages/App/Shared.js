import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import SearchById from "../../SearchById"
import { useContext, useEffect, useState } from "react"
import StoreContext from "../../Store/Context"
import axios from "axios"
import baseUrl from "../../server/server"
import Models from "../../Models"
import NoContentCard from "../../NoContentCard"

const Shared = () => {

  const { token } = useContext(StoreContext)

  const [models, setModels] = useState("")

  useEffect(() => {

    //get ai models owned by current user
    const getSharedModels = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}/userai/shared_list`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getSharedModels: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getSharedModels error: ", e.response)
      }
    }

    const fetchMyModels = async () => {
      const modelsFromServer = await getSharedModels()
      setModels(modelsFromServer)
    }

    fetchMyModels()

  }, [token])

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Shared Models" button="SHARE" buttonIcon="share-alt" path="/my"/>
        <SearchById />

        {(models && models.length > 0) ?
          <div className={"content-table"}>
            <Models models={models} infoLevel="Shared" actionButtons="run"/>
          </div>
          :
          <NoContentCard text="No models found!" />
        }
      </div>
    </>
  )
}

export default Shared