import React from "react";
import "../../Sidebar.css";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";

const My = () => {
  
  return (
    <>
      <div className="main">
        <div className="header">
          <h1 className={"title"}>My Models</h1>
          <div className={"main-button"}>
            NEW MODEL
            <FontAwesomeIcon className="btn-icon" icon={faPlus} />
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
          <FontAwesomeIcon icon={faSearch} className={"search-icon"}/>
        </div>
        
      </div>
    </>
  );
}

export default My;
