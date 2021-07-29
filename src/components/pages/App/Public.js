import React from "react"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import SearchById from "../../SearchById"

const Public = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Public Models" button="PUBLISH MODEL" buttonIcon="globe-americas" path="/my"/>
        <SearchById />
      </div>
    </>
  )
}

export default Public