import React from "react"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import AppHeader from "../../AppHeader"

const Shared = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Shared Models" button="SHARE MODEL" buttonIcon="share-alt" path="/my"/>
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

export default Shared