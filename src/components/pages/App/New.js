import React, { Component } from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "./Main.css"
import "./New.css"
import baseUrl from "../../server/server"
import axios from "axios"
import StoreContext from "../../Store/Context"
import { Card, CardContent, MenuItem, Box, ThemeProvider, InputLabel } from "@material-ui/core"
import { Field } from "formik"
import { CheckboxWithLabel, TextField, Select, SimpleFileUpload } from "formik-material-ui"
import FormikStepper, { FormikStep } from "./formicStepper"
import * as yup from 'yup'
import { MultipleFileUploadField } from "../../uploadFiles/multipleFileUpload"
import theme from "../../theme/theme"

const defaultState = {
  title: "",
  description: "",
  inputType: "",
  outputType: "",
  isPrivate: true
}

const sleep = (time) => new Promise((acc) => setTimeout(acc, time))

//Function to create a new model
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

}

export default class New extends Component {

  static contextType = StoreContext

  constructor(props) {
    super(props);
    this.state = {
      ...defaultState,
      id: "",

    }
  }

  render() {
    return (
      <>
      <ThemeProvider theme={theme}>
        <Sidebar />
        <div className="main">
          <AppHeader title="New Model" button="CANCEL" buttonIcon="undo-alt" path="/my" />
          <div className="content">

            <div className="material-ui-card">
              <Card>
                <CardContent>
                  <FormikStepper
                    initialValues={defaultState} 
                    onSubmit={async (values) => {
                      await sleep(3000)
                      console.log('values', values)
                    }}>

                    <FormikStep
                      label="Create Model"
                      validationSchema={yup.object().shape({
                        title: yup.string().required(),
                        description: yup.string().required(),
                        inputType: yup.string().required('Please, select office'),
                        outputType: yup.string().required('Please, select office2'),
                        isPrivate: yup.boolean().required(),
                      })}>
                      <Box paddingBottom={2}>
                        <Box paddingBottom={4}>
                          <Field fullWidth
                            component={TextField}
                            name="title"
                            type="text"
                            label="Title"
                          />
                        </Box>
                        <Box paddingBottom={4}>
                          <Field fullWidth
                            component={TextField}
                            name="description"
                            type="text"
                            label="Description"
                          />
                        </Box>
                        <Box paddingBottom={4}>
                          <InputLabel htmlFor="inputType">Input Type</InputLabel>
                          <Field fullWidth
                            labelId="inputType"
                            component={Select}
                            name="inputType"
                            type="select"
                            inputProps={{
                              id: 'inputType',
                            }}
                          >
                            <MenuItem value={".nii.gz"}>.nii.gz</MenuItem>
                            <MenuItem value={"string"}>string</MenuItem>
                          </Field>
                        </Box>
                        <Box paddingBottom={4}>
                          <InputLabel htmlFor="outputType">Output Type</InputLabel>
                          <Field fullWidth
                            component={Select}
                            name="outputType"
                            inputProps={{
                              id: 'outputType',
                            }}
                          >
                            <MenuItem value={".nii.gz"}>.nii.gz</MenuItem>
                            <MenuItem value={"string"}>string</MenuItem>
                          </Field>
                        </Box>
                        <Box paddingBottom={2}>
                          <Field
                            component={CheckboxWithLabel}
                            type="checkbox"
                            name="isPrivate"
                            Label={{ label: 'Private' }}
                          />
                        </Box>
                      </Box>

                    </FormikStep>

                    <FormikStep
                      label="Add Model Files">
                      <Box paddingBottom={2}>
                        <Field component={SimpleFileUpload} name="file" label="Simple File Upload" />
                        <MultipleFileUploadField name="files" />
                      </Box>
                    </FormikStep>



                  </FormikStepper>
                </CardContent>
              </Card>
            </div>
            {/* <div className="content-left">

              <div className="new-header">
                <p>
                  1. Create Model
                </p>
              </div>

              <form onSubmit={this.submitHandler}>
                <div className="content-line">
                  <label className="new-label" htmlFor="title">Title</label>
                  <input
                    className="content-input"
                    type="text"
                    name="title"
                    id="title"
                    onChange={this.onChange}
                    value={this.title}
                    required
                  />
                </div>
                <div className="content-line">
                  <label className="new-label" htmlFor="description">Description</label>
                  <textarea
                    className="content-input-fat"
                    id="description"
                    name="description"
                    onChange={this.onChange}
                    value={this.description}
                    required
                  />
                </div>
                <div className="content-line">
                  <label className="new-label" htmlFor="inputType">Input Type</label>
                  <select
                    className="content-input"
                    id="inputType"
                    name="inputType"
                    onChange={this.onChange}
                    value={this.inputType}
                    required
                  >
                    <option value="" disabled defaultValue="selected">Select your option</option>
                    <option value=".nii.gz">File .nii.gz</option>
                    <option value="string">String</option>
                  </select>
                </div>
                <div className="content-line">
                  <label className="new-label" htmlFor="outputType">Output Type</label>
                  <select
                    className="content-input"
                    id="outputType"
                    name="outputType"
                    onChange={this.onChange}
                    value={this.outputType}
                    required
                  >
                    <option value="" disabled defaultValue="selected">Select your option</option>
                    <option value=".nii.gz">File .nii.gz</option>
                    <option value="string">String</option>
                  </select>
                </div>
                <div className="content-slider">
                  <label className="new-label" htmlFor="privacy">Private</label>
                  <div className="toggle-slider">
                    <input
                      type="checkbox"
                      name="isPrivate"
                      id="isPrivate"
                      onChange={this.onChange}
                      checked={this.isPrivate}
                    />
                  </div>
                </div>


                <div className="buttons-form">
                  <div className="clear-button" onClick={this.clearHandler}>
                    CLEAR
                  </div>
                  <input className="confirm-button" type="submit" value="CREATE" />
                </div>
              </form>
            </div> */}

          </div>
        </div>
        </ThemeProvider>
      </>
    )
  }
}