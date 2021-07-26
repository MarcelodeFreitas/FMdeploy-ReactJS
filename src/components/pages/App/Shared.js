import React from "react"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faShareAlt } from "@fortawesome/free-solid-svg-icons"

const Shared = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <div className="header">
          <h1 className={"title"}>Shared Models</h1>
          <div className={"main-button"}>
            SHARE MODEL
            <FontAwesomeIcon className="btn-icon" icon={faShareAlt} />
          </div>
        </div>
        <hr className={"line"} />
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