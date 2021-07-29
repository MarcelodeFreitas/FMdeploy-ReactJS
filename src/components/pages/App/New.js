import React from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons" */

const New = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="New Model" button="BACK" path="/my"/>
      </div>
    </>
  )
}

export default New
