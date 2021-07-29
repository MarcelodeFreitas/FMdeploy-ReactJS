import React from "react"
import { useHistory, useLocation } from "react-router-dom"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Models from "../../Models"
import AppHeader from "../../AppHeader"

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

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="My Models" button="NEW MODEL" buttonIcon="plus" path="/new"/>
        <div className={"searchbar"}>
          <input
            className={"searchbar-input"}
            type="text"
            name="search"
            id="search"
            placeholder="Search by Model ID"
            required
          />
          <FontAwesomeIcon icon={faSearch} className={"search-icon"}/>
        </div>

        <div className={"content-table"}>
          <Models />
        </div>
        
      </div>
    </>
  )
}

export default My
