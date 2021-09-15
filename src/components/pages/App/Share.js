import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { useState, useContext } from "react"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import theme from "../../theme/theme"
import { Form, Formik } from "formik"
import * as yup from 'yup'
import { Field, ErrorMessage } from "formik"
import { CheckboxWithLabel, TextField, Select } from "formik-material-ui"
import CustomizedSnackbar from "../../Alert"
import { CircularProgress, Button, ThemeProvider, Container, Box, InputLabel, MenuItem } from '@material-ui/core'

const Share = (props) => {

  const { token } = useContext(StoreContext)

  console.log(props.location.state)

  return (
    <>
      <ThemeProvider theme={theme}>
        <Sidebar />
        <div className="main">
          <AppHeader title={`SHARE: ${props.location.state.title}`} button="BACK" buttonIcon="" path="/my" />
          <Container>
            <Container className="run-white-container">
              <div className="run-data-line"><p className="run-top-label">AI ID:</p> {props.location.state.ai_id}</div>
              <br></br>
              <div className="run-row">
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">AUTHOR:</p> {props.location.state.name}
                  </div>
                </div>
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">DATE:</p> {new Date(props.location.state.created_in).toLocaleString()}
                  </div>
                </div>
              </div>
              <br></br>
              <div className="run-row">
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">INPUT FILE TYPE:</p> {props.location.state.input_type}
                  </div>
                </div>
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">PRIVATE:</p>{props.location.state.is_private.toString()}
                  </div>
                </div>
              </div>
            </Container>

            <Container className="run-white-container">
              <p className="run-top-label">SHARED WITH:</p>
              <br></br>
              DONE
            </Container>

            <Container className="run-white-container">
              <p className="run-top-label">SHARE:</p>
              <Formik
                initialValues={{
                  email: ""
                }}
                validationSchema={yup.object().shape({
                  email: yup.string().email("Email must be valid").required("Email is a required field"),
                })}
                onSubmit={async (values) => {
                  console.log(values.email)
                }}
              >
                <Form>
                  <Box paddingBottom={2} paddingTop={2}>
                    <Field fullWidth
                      component={TextField}
                      name="email"
                      type="email"
                      label="Email"
                    />
                  </Box>

                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Share
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

export default Share