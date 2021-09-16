import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { useDropzone } from "react-dropzone"
import { useState, useContext } from "react"
import axios from "axios"
import baseUrl from "../../server/server"
import StoreContext from '../../Store/Context'
import { CircularProgress, Button, Container } from '@material-ui/core'

const Run = (props) => {

  const date = new Date(props.location.state.created_in)

  const formatedDate = new Intl.DateTimeFormat().format(date)

  const { token } = useContext(StoreContext)

  /* const [inputFileId, setInputFileID] = useState("") */

  /* const [outputFile, setOutputFile] = useState("") */

  const [outputFileName, setOutputFileName] = useState("")

  const [downloadLink, setDownloadLink] = useState("")

  const [isRunning, setIsRunning] = useState(false)

  console.log(props.location.state)

  //upload input file to the server and get the id
  const uploadInputFile = async (token, inputFile) => {
    try {
      const formData = new FormData()
      formData.append('input_file', inputFile)
      const response = await axios.post(`${baseUrl}/files/inputfile`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      })
      console.log(await response)
      console.log(await response.data)
      /* setInputFileID(await response.data.input_file_id) */
      return await response.data.input_file_id
    } catch (e) {
      console.log(e)
      console.log("uploadInputFile error: ", e.response)
    }
  }

  //run model providing input file id and ai id
  const runAi = async (token, aiId, fileId) => {
    console.log(aiId, fileId)
    try {
      const response = await axios.post(`${baseUrl}/ai/run`, {
        ai_id: aiId,
        input_file_id: fileId,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        responseType: 'arraybuffer', //prevents the file from corrupting
      })
      console.log(await response)

      const filename = await response.headers['content-disposition'].split('filename=')[1].split(';')[0]

      setOutputFileName(await filename)

      const url = window.URL.createObjectURL(
        new Blob([await response.data], {
          type: await response.headers['content-type']
        })
      )

      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      setDownloadLink(link)

    } catch (e) {
      console.log(e)
      console.log("runAi error: ", e.response)
    }
  }

  const handleRun = async (token, inputFile, aiId) => {
    if (inputFile) {
      console.log(inputFile)
      setIsRunning(true)
      const fileId = await uploadInputFile(token, inputFile)
      await runAi(token, aiId, await fileId)
      setIsRunning(false)
    } else {
      console.log(inputFile)
    }

  }

  const InputFilesDropzone = () => {

    const [files, setFiles] = useState([])

    const inputValidator = file => {
      if (file.name.includes(props.location.state.input_type)) {
        console.log("file extension correct")
        return null
      } else {
        /* setValidatorError(`This is not a ${props.location.state.input_type} file.`) */
        console.log("file extension wrong")
        return {
          code: "wrong-file-extension",
          message: `This is not a ${props.location.state.input_type} file.`
        }
      }
    }

    const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
      disabled: false,
      maxFiles: 1,
      validator: inputValidator,
      /* onDrop: () => {setOutputFileName("")}, */
      onDropAccepted: acceptedFiles => {
        /* setOutputFileName("") */
        setFiles(acceptedFiles[0])
        console.log("files: ", files)
      }
    })

    const clearFiles = () => {
      setFiles([])
      acceptedFiles.splice([], 1)
      /* setInputFileID("") */
      setOutputFileName("")
    }

    const fileRejectionItems = fileRejections.map(({ file, errors }) => {
      return (
        <li className="file-list-item" key={file.path}>
          {file.path} - {file.size} bytes
          <ul className="file-list-errors">
            {errors.map(e => <li key={e.code}>{e.message}</li>)}
          </ul>

        </li>
      )
    })

    return (
      <div className="run-box">
        <h1 className="run-labels">1. INPUT</h1>
        <div {...getRootProps()} className="run-dropzone">
          <input {...getInputProps()} />
          {acceptedFiles.length === 0 ?
            <div className="center">
              <p>Drop File Here</p>
              <p>- or -</p>
              <p>Click to Upload</p>
              <div className="blank-line" />
              <p className="content-box-text-small">(you can only drop 1 file here)</p>
            </div>
            :
            <p className="fileName">{acceptedFiles[0].name}</p>
          }
        </div>
        <div className="file-messages">
          {fileRejectionItems.length > 0 &&
            <div>
              <h4>Rejected files</h4>
              <ul>{fileRejectionItems}</ul>
            </div>
          }
        </div>
        <div className="run-buttons">
          <div className="clear-button-fat" onClick={clearFiles}>
            CLEAR
          </div>
          <Button
            style={{ width: '48%', fontSize: "15px", fontWeight: "bold", borderRadius: "10px" }}
            startIcon={isRunning ? <CircularProgress size="1rem" /> : null}
            disabled={isRunning}
            variant="contained"
            color="primary"
            type="submit"
            onClick={() => handleRun(token, acceptedFiles[0], props.location.state.ai_id)}
          >
            Submit
          </Button>

        </div>
      </div>
    )
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title={`RUN: ${props.location.state.title}`} button="BACK" buttonIcon="" path={props.location.state.path} />
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
                  <p className="run-top-label">DATE:</p> {formatedDate}
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
                  <p className="run-top-label">PRIVATE:</p> {props.location.state.is_private.toString()}
                </div>
              </div>
            </div>
          </Container>

          <Container className="run-white-container">
            <p className="run-top-label">DESCRIPTION:</p>
            <br></br>
            {props.location.state.description}
          </Container>
          <div className="run-boxes">
            <InputFilesDropzone />
            <div className="run-box">
              <h1 className="run-labels">2. OUTPUT</h1>
              <div className="run-dropzone">
                <div className="center">
                  {outputFileName && <p className="run-fileName" onClick={() => downloadLink.click()}>{outputFileName}</p>}
                </div>
              </div>
              {outputFileName &&
                <div className="run-buttons">
                  <div className="clear-button-fat" onClick={() => { }}>
                    SHARE
                  </div>
                  <div className="submit-button" onClick={() => downloadLink.click()}>
                    DOWNLOAD
                  </div>
                </div>
              }
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default Run