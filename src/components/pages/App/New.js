import React from "react"
import { Link } from "react-router-dom"
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
        <div className="header">
          <h1 className={"title"}>New Model</h1>
          <Link to="/app" className="main-button">
            BACK
          </Link>
        </div>
        <hr className={"line"} />
      </div>
    </>
  );
};

export default New;
