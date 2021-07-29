import React from "react"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import AppHeader from "../../AppHeader"

const Public = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Public Models" button="PUBLISH MODEL" buttonIcon="globe-americas" path="/my"/>
        <div className={"searchbar"}>
          <input
            className={"searchbar-input"}
            type="text"
            name="search"
            id="search"
            placeholder="Search by Model ID"
            required
          />
          <FontAwesomeIcon icon={faSearch} className={"search-icon"} />
        </div>
      </div>
    </>
  )
}

export default Public
