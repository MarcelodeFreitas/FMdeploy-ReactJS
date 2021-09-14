import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { useState, useContext, Component } from "react"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import { CircularProgress, Button, ThemeProvider, Container, Box, InputLabel, MenuItem } from '@material-ui/core'
import theme from "../../theme/theme"
import { Form, Formik, FormikConfig, FormikValues } from 'formik'
import * as yup from 'yup'
import { Field, ErrorMessage } from "formik"
import { CheckboxWithLabel, TextField, Select } from "formik-material-ui"
import CustomizedSnackbar from "../../Alert"


export default class New extends Component {

  static contextType = StoreContext

  date = new Date(this.props.location.state.created_in)

  formatedDate = new Intl.DateTimeFormat().format(this.date)

  defaultState = {
    message: "",
    severity: "error",
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.defaultState,
      isSubmitting: false,
    }
  }

  //update ai model in the server
  updateAiModel = async (token, aiId, values) => {
    console.log(token, aiId, values)

    try {
      const response = await axios.put(
        `${baseUrl}/ai`,
        {
          ai_id: aiId,
          title: values.title,
          description: values.description,
          input_type: values.outputType,
          output_type: values.outputType,
          is_private: values.isPrivate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log(await response)
    } catch (e) {
      console.log("updateAiModel error: ", e.response)
    }

  }


  render() {
    console.log(this.props.location.state)

    return (
      <>
        <ThemeProvider theme={theme}>
          <Sidebar />
          {this.state.message && <CustomizedSnackbar message={this.state.message} severity="error"/>}
          <div className="main">
            <AppHeader title={`EDIT: ${this.props.location.state.title}`} button="BACK" buttonIcon="" path="/my" />
            <Container>
              <Container className="run-white-container">
                <div className="run-data-line"><p className="run-top-label">AI ID:</p> {this.props.location.state.ai_id}</div>
                <br></br>
                <div className="run-row">
                  <div className="run-column">
                    <div className="run-data-line">
                      <p className="run-top-label">AUTHOR:</p> {this.props.location.state.name}
                    </div>
                  </div>
                  <div className="run-column">
                    <div className="run-data-line">
                      <p className="run-top-label">DATE:</p> {this.formatedDate}
                    </div>
                  </div>
                </div>
              </Container>

              <Container className="run-white-container">
                <p className="run-top-label">DESCRIPTION:</p>
                <br></br>
                {this.props.location.state.description}
              </Container>

              <Container className="run-white-container">
                <p className="run-top-label">EDIT DATA:</p>
                <Formik
                  initialValues={{
                    title: this.props.location.state.title,
                    description: this.props.location.state.description,
                    inputType: this.props.location.state.input_type,
                    outputType: this.props.location.state.output_type,
                    isPrivate: this.props.location.state.is_private,
                  }}
                  validationSchema={yup.object().shape({
                    title: yup.string().max(60).required("Title is a required field"),
                    description: yup.string().required("Description is a required field"),
                    inputType: yup.string().required("Input Type is a required field"),
                    outputType: yup.string().required("Output Type is a required field"),
                    isPrivate: yup.boolean().required("Private is a required field"),
                  })}
                  onSubmit={async (values) => {
                    await this.updateAiModel(this.context.token, this.props.location.state.ai_id, await values)
                  }}
                >
                  <Form>
                    <Box paddingBottom={2}>
                      <Box paddingBottom={2} paddingTop={4}>
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

                    <Button
                      startIcon={this.state.isSubmitting ? <CircularProgress size="1rem" /> : null}
                      disabled={this.state.isSubmitting}
                      variant="contained"
                      color="primary"
                      type="submit"
                    >
                      {this.state.isSubmitting ? 'Submitting' : 'Submit'}
                    </Button>

                  </Form>
                </Formik>
              </Container>

            </Container>
          </div>
        </ThemeProvider>
      </>
    )
  }
}