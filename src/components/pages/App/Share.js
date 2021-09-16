import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import { Form, Formik } from "formik"
import * as yup from 'yup'
import { Field } from "formik"
import { TextField } from "formik-material-ui"
import CustomizedSnackbar from "../../Alert"
import { Button, Container, Box } from '@material-ui/core'
import { withStyles, makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

const Share = (props) => {

  const { token } = useContext(StoreContext)
  console.log(token)

  console.log(props.location.state)

  const [beneficiariesList, setBeneficiariesList] = useState([])

  const [beneficiariesErrorMessage, setBeneficiariesErrorMessage] = useState("")

  const [shareAiMessage, setShareAiMessage] = useState("")
  const [shareAiMessageSeverity, setShareAiMessageSeverity] = useState("")

  const shareAiModel = async (email, aiId) => {
    try {
      const response = await axios.post(
        `${baseUrl}/userai/share`,
        {
          beneficiary_email: email,
          ai_id: aiId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log("shareAiModel: ", await response.data)
      await handleMessage(await response.data, "success")
    } catch (e) {
      console.log("shareAiModel error: ", e.response)
      console.log("shareAiModel error message: ", e.response.data.detail)
      await handleMessage(e.response.data.detail, "error")
    }
  }

  const handleMessage = async (message, severity) => {
    setShareAiMessage(message)
    setShareAiMessageSeverity(severity)
    setTimeout(() => { setShareAiMessage(""); setShareAiMessageSeverity("severity") }, 6100)
  }

  const clearMessage = async () => {
    setBeneficiariesErrorMessage("")
    setShareAiMessage("")
    setShareAiMessageSeverity("")
  }

  //get list of beneficiaries from the ai id
  const getBeneficiaries2 = async (aiId) => {
    try {
      const response = await axios.get(
        `${baseUrl}/userai/beneficiaries/${aiId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log("getBeneficiaries: ", await response.data)
      setBeneficiariesList(await response.data)
    } catch (e) {
      console.log("getBeneficiaries error: ", e.response)
      console.log("getBeneficiaries error message: ", e.response.data.detail)
      setBeneficiariesErrorMessage(e.response.data.detail)
    }
  }

  useEffect(() => {

    //get list of beneficiaries from the ai id
    const getBeneficiaries = async (aiId) => {
      try {
        const response = await axios.get(
          `${baseUrl}/userai/beneficiaries/${aiId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getBeneficiaries: ", await response.data)
        setBeneficiariesList(await response.data)
      } catch (e) {
        console.log("getBeneficiaries error: ", e.response)
        console.log("getBeneficiaries error message: ", e.response.data.detail)
        setBeneficiariesErrorMessage(e.response.data.detail)
      }
    }

    getBeneficiaries(props.location.state.ai_id)

  }, [token, props.location.state.ai_id])


  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: "#E76300",
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell)

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow)

  const useStyles = makeStyles({
    table: {
      minWidth: 600,
    },
    container: {
      maxHeight: 220,
    },
  })

  const classes = useStyles()

  return (
    <>
      <Sidebar />
      {shareAiMessage && <CustomizedSnackbar message={shareAiMessage} severity={shareAiMessageSeverity} />}
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
            {beneficiariesErrorMessage && beneficiariesErrorMessage}
            {beneficiariesList.length > 0 &&
              <TableContainer component={Paper} className={classes.container}>
                <Table className={classes.table} stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Name</StyledTableCell>
                      <StyledTableCell>Email</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {beneficiariesList.map((beneficiary) => (
                      <StyledTableRow key={beneficiary.name}>
                        <StyledTableCell>{beneficiary.name}</StyledTableCell>
                        <StyledTableCell>{beneficiary.email}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            }
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
                await clearMessage()
                await shareAiModel(await values.email, props.location.state.ai_id)
                await getBeneficiaries2(props.location.state.ai_id)
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
    </>
  )
}

export default Share