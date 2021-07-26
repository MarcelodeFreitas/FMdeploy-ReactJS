import React from "react";
import Sidebar from "../../Sidebar";
import "../../Sidebar.css";
import "./Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobeAmericas, faSearch } from "@fortawesome/free-solid-svg-icons";

const Public = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <div className="header">
          <h1 className={"title"}>Public Models</h1>
          <div className={"main-button"}>
            PUBLISH MODEL
            <FontAwesomeIcon className="btn-icon" icon={faGlobeAmericas} />
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
  );
};

export default Public;
