import React from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./New.css"

const New = () => {
  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="New Model" button="BACK" path="/my" />
        <div className="content">
          <div className="content-left">
            <div className="content-line">
              <label for="title">Title</label>
              <input className="content-input" id="title" required></input>
            </div>
            <div className="content-line">
              <label for="description">Description</label>
              <textarea className="content-input-fat" id="description" required></textarea>
            </div>
            <div className="content-line">
              <label for="outputType">Output Type</label>
              <select className="content-input" id="outputType" name="outputType" required>
                <option value="" disabled selected>Select your option</option>
                <option value=".nii.gz">File .nii.gz</option>
                <option value="string">String</option>
              </select>
            </div>
            <div className="content-line">
              <label for="privacy">Privacy</label>
              <input className="content-input" id="privacy" required></input>
            </div>
          </div>
          <div className="content-right">
            <label for="pythonScript">Python Script</label>
            <div className="content-box">
              
            </div>
            <label for="models">Models</label>
            <div className="content-box">
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default New