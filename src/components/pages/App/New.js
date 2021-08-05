import React, { useState, useContext } from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "./Main.css"
import "./New.css"
import baseUrl from "../../server/server"
import axios from "axios"
import querystring from "querystring"
import StoreContext from "../../Store/Context"

const initialState = () => {
  return { title: "", description: "", inputType: "", outputType: "", isPrivate: true }
}

//Function to creqate a new model
const newModel = async (token, title, description, outputType, isPrivate) => {
  try {
      const response = await axios.post(
        `${baseUrl}/ai`,
        {
          title: title,
          description: description,
          output_type: outputType,
          is_private: isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      return await response.data
    } catch (e) {
      console.log(e)
    }
  
};

const New = () => {

  const { token } = useContext(StoreContext)

  const [id, setId] = useState("")

  const [values, setValues] = useState({ title: "", description: "", inputType: "", outputType: "", isPrivate: true })

  const onChange = (event) => {
    
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    setValues({
      ...values,
      [name]: value,
    })
  }

  const submitHandler = async (event) => {
    event.preventDefault() //dont reload the page

    console.log(values)

    const data = await newModel(token, values.title, values.description, values.outputType, values.isPrivate)

    setId(await data.ai_id)
    console.log(id)

  }

  const clearHandler = () => {

    setValues(initialState)

  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="New Model" button="CANCEL" path="/my" />
        <div className="content">

          <div className="content-left">
            <form onSubmit={submitHandler}>
              <div className="content-line">
                <label htmlFor="title">Title</label>
                <input 
                  className="content-input" 
                  type="text" 
                  name="title" 
                  id="title" 
                  onChange={onChange}
                  value={values.title}
                  required
                />
              </div>
              <div className="content-line">
                <label htmlFor="description">Description</label>
                <textarea 
                  className="content-input-fat" 
                  id="description" 
                  name="description"
                  onChange={onChange}
                  value={values.description}
                  required
                />
              </div>
              <div className="content-line">
                <label htmlFor="inputType">Input Type</label>
                <select 
                  className="content-input" 
                  id="inputType" 
                  name="inputType" 
                  onChange={onChange}
                  value={values.inputType}
                  required
                >
                  <option value="" disabled defaultValue="selected">Select your option</option>
                  <option value=".nii.gz">File .nii.gz</option>
                  <option value="string">String</option>
                </select>
              </div>
              <div className="content-line">
                <label htmlFor="outputType">Output Type</label>
                <select 
                  className="content-input" 
                  id="outputType" 
                  name="outputType" 
                  onChange={onChange}
                  value={values.outputType}
                  required
                >
                  <option value="" disabled defaultValue="selected">Select your option</option>
                  <option value=".nii.gz">File .nii.gz</option>
                  <option value="string">String</option>
                </select>
              </div>
              <div className="content-slider">
                <label htmlFor="privacy">Private</label>
                <div className="toggle-slider">
                  <input 
                  type="checkbox" 
                  name="isPrivate" 
                  id="isPrivate"
                  onChange={onChange}
                  checked={values.isPrivate}
                  />
                </div>
              </div>

              
              <div className="buttons-form">
                <div className="clear-button" onClick={clearHandler}>
                  CLEAR
                </div>
                <input className="confirm-button" type="submit" value="CREATE" />
              </div>
            </form>
          </div>

          <div className="content-right">
            <div>
              <label htmlFor="pythonScript">Python Script</label>
              <div className="content-box">

              </div>
              <div className="buttons">
                <div className="clear-button">
                  CLEAR
                </div>
                <div className="confirm-button">
                  CONFIRM
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="pythonScript">Models</label>
              <div className="content-box">

              </div>
              <div className="buttons">
                <div className="clear-button">
                  CLEAR
                </div>
                <div className="confirm-button">
                  CONFIRM
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default New