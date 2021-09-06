import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import "./Run.css"
import AppHeader from "../../AppHeader"
import { useDropzone } from "react-dropzone"
import { useState } from "react"

const Run = (props) => {
  console.log(props.location.state)

  

  const InputFilesDropzone = () => {

    const [files, setFiles] = useState([])

    const clearFiles = () => {
      setFiles([])
    }

    const getFiles = () => {
      console.log(files)
    }

    const { getRootProps, getInputProps } = useDropzone({
      disabled: false,
      /* validator: modelFilesValidator, */
      onDropAccepted: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file)))
        console.log(files)
      }
    })

    const fileList = files.map((file => (
      <li className="file-list-errors" key={file.name}>
        {file.name} - {file.size} bytes
      </li>
    ))
    )

    return (
      <div className="run-box">
        <div {...getRootProps()} className="run-dropzone">
          <input {...getInputProps()} />
          <p>Drop Files Here</p>
          <p>- or -</p>
          <p>Click to Upload</p>
        </div>
        <div>
          <ul className="file-list-errors">{fileList}</ul>
        </div>
        <div className="run-buttons">
          <div className="clear-button-fat" onClick={clearFiles}>
            CLEAR
          </div>
          <div className="submit-button" onClick={getFiles}>
            SUBMIT
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title={props.location.state.title} button="BACK" buttonIcon="" path="/my"/>
        <div className="run-container">
          <div className="description">
            {props.location.state.description} askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh  askdjhf alksdjh laskdjh laskdj halksjdh lkasjd hlaskjh 
          </div>
          <div className="run-boxes">
            <InputFilesDropzone/>
            <InputFilesDropzone/>
          </div>
        </div>
        
        
      </div>
    </>
  )
}

export default Run