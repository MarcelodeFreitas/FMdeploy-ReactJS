import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Sidebar from "../../Sidebar";
import "../../Sidebar.css";
import "./Main.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Main() {
  const history = useHistory();
  let location = useLocation();
  //in the fure prevent changing the url manually too??
  let currentURL = window.location.href;
  console.log(currentURL);

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
      history.go(1);
    }
  });
  return (
    <>
      <Sidebar />
      <div className="main">
        <div className="header">
          <h1 className={"title"}>My Models</h1>
          <button className={"btn"}>
            NEW MODEL
            {/* <FontAwesomeIcon className="btn-icon" icon={faPlus}/> */}
          </button>
        </div>
        <hr className={"line"} />
      </div>
    </>
  );
}

export default Main;
