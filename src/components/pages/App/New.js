import React, { Component } from "react"
import AppHeader from "../../AppHeader"
import Sidebar from "../../Sidebar"
import "./Main.css"
import "./New.css"
import baseUrl from "../../server/server"
import axios from "axios"
import StoreContext from "../../Store/Context"
import { Card, CardContent, MenuItem, Box, ThemeProvider, InputLabel } from "@material-ui/core"
import { Field, ErrorMessage } from "formik"
import { CheckboxWithLabel, TextField, Select } from "formik-material-ui"
import FormikStepper, { FormikStep } from "./formicStepper"
import * as yup from 'yup'
import theme from "../../theme/theme"
import { useDropzone } from "react-dropzone"

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
    super(props)
    this.state = {
      ...defaultState,
      id: "",
      modelFiles: [],
      pythonScript: "",
    }
  }

  handleOnDrop = (files, rejectedFiles) => {
    console.log(files)
  }

  clearPythonFile = () => {
    this.setState({
      pythonScript: ""
    },
      () => { console.log(this.state.pythonScript) }
    )
  }

  clearModelFiles = () => {
    this.setState({
      modelFiles: []
    },
      () => { console.log(this.state.modelFiles) }
    )
  }

  render() {
    const ModelFilesDropzone = () => {

      const { getRootProps, getInputProps } = useDropzone({
        disabled: false,
        onDropAccepted: acceptedFiles => {
          this.setState({
            modelFiles: acceptedFiles.map(file => Object.assign(file))
          }, () => { console.log(this.state.modelFiles) })
        }
      })

      const files = this.state.modelFiles.map((file => (
        <li className="file-list-errors" key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ))
      )

      return (
        <div>
          <div {...getRootProps()} className="content-box">
            <input {...getInputProps()} />
            <p>Drop Files Here</p>
            <p>- or -</p>
            <p>Click to Upload</p>
          </div>
          <div>
            <ul className="file-list-errors">{files}</ul>
          </div>
        </div>
      )
    }


    const PythonScriptDropzone = () => {

      const pythonValidator = file => {
        if (file.name.slice(-2) !== "py") {
          return {
            code: "wrong-file-extension",
            message: "This is not a python file."
          };
        }

        return null
      }



      const {
        acceptedFiles,
        fileRejections,
        getRootProps,
        getInputProps } = useDropzone({
          disabled: false,
          maxFiles: 1,
          validator: pythonValidator,
          onDropAccepted: acceptedFiles => {
            this.setState({
              pythonScript: acceptedFiles[0]
            },
              () => { console.log(this.state.pythonScript) }
            )

          }
        })

      /* console.log("acceptedFiles", acceptedFiles)
      
      if (acceptedFiles !== []) {
        setPythonScript(acceptedFiles[0])
      } */

      const acceptedFileItems = acceptedFiles.map(file => (
        <li className="python-script-accepted" key={file.path}>
          {file.path}{/*  - {file.size} bytes */}
        </li>
      ));

      const fileRejectionItems = fileRejections.map(({ file, errors }) => {
        return (
          <li className="file-list-item" key={file.path}>
            {file.path}{/*  - {file.size} bytes */}
            <ul className="file-list-errors">
              {errors.map(e => <li key={e.code}>{e.message}</li>)}
            </ul>

          </li>
        )
      })

      return (
        <div>
          <div {...getRootProps()} className="content-box">
            <input {...getInputProps()} />
            {this.state.pythonScript === "" ?
              <div className="center">
                <p>Drop File Here</p>
                <p>- or -</p>
                <p>Click to Upload</p>
                <div className="blank-line" />
                <p className="content-box-text-small">(you can only drop 1 file here)</p>
              </div>
              :
              <p className="fileName">{this.state.pythonScript.name}</p>
            }
          </div>
          <div className="file-messages">
            {/* {acceptedFileItems != "" &&
              <div>
                <h4>Accepted file</h4>
                <ul>{acceptedFileItems}</ul>
              </div>
            } */}
            {fileRejectionItems !== "" &&
              <div>
                <h4>Rejected files</h4>
                <ul>{fileRejectionItems}</ul>
              </div>
            }
          </div>
        </div>
      )
    }

    return (
      <>
        <ThemeProvider theme={theme}>
          <Sidebar />
          <div className="main">
            <AppHeader title="New Model" button="BACK" buttonIcon="" path="/my" />
            <div className="content">

              <div className="material-ui-card">
                <Card>
                  <CardContent>
                    <FormikStepper
                      initialValues={defaultState}
                      onSubmit={async (values) => {
                        await sleep(3000)
                        console.log('values', values)
                        console.log('pythonFiles', this.state.pythonScript)
                        console.log('modelFiles', this.state.modelFiles)
                      }}>

                      <FormikStep
                        label="Create Model"
                        validationSchema={yup.object().shape({
                          title: yup.string().required("Title is a required field"),
                          description: yup.string().required("Description is a required field"),
                          inputType: yup.string().required("Input Type is a required field"),
                          outputType: yup.string().required("Output Type is a required field"),
                          isPrivate: yup.boolean().required("Private is a required field"),
                        })}>
                        <Box paddingBottom={2}>
                          <Box paddingBottom={2}>
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
                              InputProps={{ multiline: true }}
                            />
                          </Box>
                          <Box paddingBottom={4}>
                            <InputLabel htmlFor="inputType">Input Type</InputLabel>
                            <Field fullWidth
                              component={Select}
                              type="text"
                              name="inputType"
                              inputProps={{
                                id: 'inputType',
                              }}
                            >
                              <MenuItem value={".nii.gz"}>.nii.gz</MenuItem>
                              <MenuItem value={"string"}>string</MenuItem>
                            </Field>
                            <ErrorMessage component="div" className="error-message" name="inputType" />
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
                            <ErrorMessage component="div" className="error-message" name="outputType" />
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
                          {/* <Field component={SimpleFileUpload} name="file" label="Simple File Upload" />
                        <MultipleFileUploadField name="files" /> */}
                          <div className="new-header">
                            <p>
                              2. Add Model Files
                            </p>
                          </div>

                          <div>
                            <label className="new-label" htmlFor="pythonScript">Python Script</label>
                            {/* <div className="content-box">
                <input type="file" name="pythonScript" onChange={onFileInputChange}/>
              </div> */}
                            <PythonScriptDropzone />
                            <div className="center-button">
                              <div className="clear-button" onClick={this.clearPythonFile}>
                                CLEAR
                              </div>
                              {/* <div className="confirm-button">
                                CONFIRM
                              </div> */}
                            </div>
                          </div>

                          <div>
                            <label className="new-label" htmlFor="modelFiles">Models</label>
                            <ModelFilesDropzone />
                            <div className="center-button">
                              <div className="clear-button" onClick={this.clearModelFiles}>
                                CLEAR
                              </div>
                              {/* <div className="confirm-button">
                                CONFIRM
                              </div> */}
                            </div>
                          </div>


                        </Box>
                      </FormikStep>
                      <FormikStep
                      label="Result">
                        done ye
                      </FormikStep>
                    </FormikStepper>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </ThemeProvider>
      </>
    )
  }
}