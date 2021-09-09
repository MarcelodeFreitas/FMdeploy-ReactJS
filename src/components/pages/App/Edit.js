import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { useState, useContext, Component } from "react"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import { CircularProgress, Button, ThemeProvider, Container } from '@material-ui/core'
import theme from "../../theme/theme"
import { Form, Formik, FormikConfig, FormikValues } from 'formik'



export default class New extends Component {

  static contextType = StoreContext

  date = new Date(this.props.location.state.created_in)

  formatedDate = new Intl.DateTimeFormat().format(this.date)

  defaultState = {
    title: this.props.location.state.title,
    description: this.props.location.state.description,
    inputType: this.props.location.state.input_type,
    outputType: this.props.location.state.output_type,
    isPrivate: this.props.location.state.is_private,
  }

  constructor(props) {
    super(props)
    this.state = {
      ...this.defaultState,
    }
  }

  

  render() {
    console.log(this.props.location.state)
    console.log(this.defaultState)

    return (
      <>
        <ThemeProvider theme={theme}>
          <Sidebar />
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
            </Container>
          </div>
        </ThemeProvider>
      </>
    )
  }
}