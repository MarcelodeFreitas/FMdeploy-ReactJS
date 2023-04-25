import { useState, useEffect, useContext } from "react";
import Sidebar from "../../Sidebar";
import "../../Sidebar.css";
import "./Main.css";
import AppHeader from "../../AppHeader";
import StoreContext from "../../Store/Context";
import CustomizedSnackbar from "../../Alert";
import Cards from "../../Cards";
import axiosInstance from "../../axios/axiosInstance";
import CollapsibleTable from "../../CollapsibleTable";

import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

function RunHistory() {
  const { token } = useContext(StoreContext);

  const [runHistory, setRunHistory] = useState("");

  const [runHistoryError, setRunHistoryError] = useState("");

  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
    severity: "",
  });

  useEffect(() => {
    //get the run history for the current user
    const getRunHistory = async () => {
      try {
        const response = await axiosInstance.get("/runhistory", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("getRunHistory: ", await response.data);
        return await response.data.reverse();
      } catch (e) {
        console.log("getRunHistory error: ", await e.response);
        if (e.response) {
          console.log("getRunHistory error detail: ", e.response.data.detail);
          setRunHistoryError(e.response.data.detail);
        }
      }
    };

    const fetchRunHistory = async () => {
      const runHistoryFromServer = await getRunHistory();
      setRunHistory(runHistoryFromServer);
    };

    fetchRunHistory();
  }, [token]);

  const handleFileDownload = (fileId) => {
    axios
      .get(`/api/files/${fileId}`, { responseType: "blob" })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          response.headers["content-disposition"].split("filename=")[1]
        );
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleFlagCreate = (runHistoryId) => {
    // code to create a flag for the specified run history id
  };

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="Run History" />

        {deleteMessage.message && (
          <CustomizedSnackbar
            message={deleteMessage.message}
            severity={deleteMessage.severity}
          />
        )}

        <CollapsibleTable historyList={runHistory} />
      </div>
      <Cards />
    </>
  );
}

export default RunHistory;
