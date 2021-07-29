import React, { useState } from "react"
import { useHistory, useLocation } from "react-router-dom"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Models from "../../Models"
import AppHeader from "../../AppHeader"
import NoContentCard from "../../NoContentCard"

const model_list = [
  {
      id: 1,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 2,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 3,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 4,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 5,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 6,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 7,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 8,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 9,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 10,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
  {
      id: 11,
      name: 'OB MASKS',
      author: "Francisca",
      date: "08/07/2021",
  },
]

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

  const [models, setModels] = useState(model_list)

  // Delete an AI model
  const deleteModel = (id) => {
    //delete AI model from state
    setModels(models.filter((model) => 
        model.id !== id
    ))
  }

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

        { models.length > 0 ?
          <div className={"content-table"}>
            <Models models={models} onDelete={deleteModel}/>
          </div>
          :
          <NoContentCard text="No models found!"/>
        }
        
      </div>
    </>
  )
}

export default My
