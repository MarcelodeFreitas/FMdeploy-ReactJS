import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { Component } from "react"
import StoreContext from '../../Store/Context'
import { CircularProgress, Button, Container, Box, Modal } from '@material-ui/core'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { Field } from "formik"
import { TextField } from "formik-material-ui"
import CustomizedSnackbar from "../../Alert"
import axiosInstance from "../../axios/axiosInstance"
import { withRouter } from 'react-router-dom'

const defaultState = {
  message: "",
  severity: "",
}

class UserSettings extends Component {

  static contextType = StoreContext

  constructor(props) {
    super(props)
    this.state = {
      ...defaultState,
      isSubmitting: false,
      responseData: "",
      name: "",
      email: "",
      password: "",
      open: false,
    }
  }

  componentDidMount() {
    console.log(this.context.token)
    console.log("HISTORY: ", this.props.history)
    this.getCurrentUser(this.context.token)
  }

  updateAlert = (message, severity) => {
    this.setState({ message: message, severity: severity })
  }

  updateUser = async (token, values) => {
    console.log("updateUser: ", values)
    try {
      const response = await axiosInstance.put(
        "/user",
        {
          new_name: values.name,
          new_email: values.email,
          new_password: values.password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      this.updateAlert("User data updated successfuly!", "success")
      console.log(await response)
    } catch (e) {
      console.log("updateUser error: ", e.response.data.detail)
      this.updateAlert(e.response.data.detail, "error")
    }
  }

  getCurrentUser = async (token) => {
    try {
      const response = await axiosInstance.get(
        "/user",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log("getCurrentUser: ", await response.data)
      this.setState({ responseData: await response.data })
    } catch (e) {
      console.log("getCurrentUser error: ", e.response)
      this.setState({ message: e.response.data.detail, severity: "error" })
    }
  }

  deleteAccount = async (token) => {
    try {
      const response = await axiosInstance.delete(
        "/user/account",
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log("deleteAccount: ", await response.data)
      this.setState({ responseData: await response.data })
      this.context.setToken('')
    } catch (e) {
      console.log("deleteAccount error: ", e.response)
      console.log("deleteAccount error detail: ", e.response.data.detail)
      this.setState({ open: false, message: e.response.data.detail, severity: "error" })
    }
  }


  render() {

    return (
      <>
        <Sidebar />
        {this.state.message && <CustomizedSnackbar message={this.state.message} severity={this.state.severity} />}
        <div className="main">
          <AppHeader title="USER SETTINGS" button="BACK" buttonIcon="" path="/my" />
          <Container>
            <Container className="run-white-container">
              <div className="run-row">
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">NAME: </p>{this.state.responseData.name}
                  </div>
                </div>
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">EMAIL: </p>{this.state.responseData.email}
                  </div>
                </div>
              </div>
            </Container>

            {this.state.responseData &&
              <Container className="run-white-container">
                <p className="run-top-label">EDIT DATA:</p>
                <Formik
                  initialValues={{
                    name: this.state.responseData.name,
                    email: this.state.responseData.email,
                    password: "",
                  }}
                  validationSchema={yup.object().shape({
                    name: yup.string(),
                    email: yup.string().email(),
                    password: yup.string().matches(
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                      "Must Contain 8 Characters, One Uppercase, One Lowercase, and One Number"
                    )
                  })}
                  onSubmit={async (values) => {
                    console.log("UserSettings: ", await values)
                    await this.updateUser(this.context.token, await values)
                    await this.getCurrentUser(this.context.token)
                    this.updateAlert(this.state.message, this.state.severity)
                    if (values.email || values.password) {
                      console.log("UserSettings HISTORY2: ", this.props.history)
                      this.props.history.push({
                        pathname: `/auth-redirect`,
                        state: { location: { pathname: 'user-settings' }, message: this.state.message, severity: this.state.severity }
                      })
                    }
                    
                  }}
                >
                  <Form>
                    <Box paddingBottom={2}>
                      <Box paddingBottom={2} paddingTop={4}>
                        <Field fullWidth
                          component={TextField}
                          name="name"
                          type="text"
                          label="New Name"
                        />
                      </Box>
                      <Box paddingBottom={2}>
                        <Field fullWidth
                          component={TextField}
                          name="email"
                          type="text"
                          label="New Email"
                        />
                      </Box>
                      <Box paddingBottom={4}>
                        <Field fullWidth
                          component={TextField}
                          name="password"
                          type="password"
                          label="New Password"
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
            }

            <Container className="run-white-container">
              <div className="run-row">
                <div className="run-column">
                  <div className="run-data-line">
                    <p className="run-top-label">DELETE ACCOUNT: </p>
                    <div style={{ padding: 10 }}>
                      This option will delete all account details and all projects. Note that shared projects will no longer be available to the people you shared them with.
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ paddingTop: 10 }}>
                <Button
                  startIcon={this.state.isSubmitting ? <CircularProgress size="1rem" /> : null}
                  disabled={this.state.isSubmitting}
                  variant="contained"
                  color="secondary"
                  onClick={() => this.setState({ open: true })}
                >
                  {this.state.isSubmitting ? 'Deleting' : 'Delete'}
                </Button>
              </div>
            </Container>
            <Modal
              open={this.state.open}
              onClose={() => this.setState({ open: false })}
              aria-labelledby="simple-modal-title"
              aria-describedby="simple-modal-description"
              style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
              <div style={{ backgroundColor: "white", padding: 20, display: "flex", alignItems: "center", justifyContent: "center", width: "60%", maxWidth: "700px", borderRadius: 5, flexDirection: "column" }}>
                <p className="run-top-label">Do you really want to delete your account?</p>
                <div style={{ padding: 10 }}>
                  This option will delete all account details and all projects. Note that shared projects will no longer be available to the people you shared them with.
                </div>
                <div style={{ paddingTop: 40 }}>
                  <Button
                    startIcon={this.state.isSubmitting ? <CircularProgress size="1rem" /> : null}
                    disabled={this.state.isSubmitting}
                    variant="contained"
                    color="secondary"
                    onClick={() => this.deleteAccount(this.context.token)}
                  >
                    {this.state.isSubmitting ? 'Deleting' : 'Delete'}
                  </Button>
                </div>
              </div>
            </Modal>
          </Container>
        </div>
      </>
    )
  }
}

export default withRouter(UserSettings)