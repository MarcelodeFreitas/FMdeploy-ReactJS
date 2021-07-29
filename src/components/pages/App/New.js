import React from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./New.css"

const New = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="New Model" button="BACK" path="/my" />
        <div className="content">
          <div className="content-left">
            <label>hey</label>
            <input></input>
            <label>hey</label>
            <input></input>
          </div>
          <div className="content-right">
            <label>hey</label>
            <input></input>
            <label>hey</label>
            <input></input>
          </div>
        </div>
      </div>
    </>
  )
}

export default New