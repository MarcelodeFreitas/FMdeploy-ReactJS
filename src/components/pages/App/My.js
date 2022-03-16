import { useState, useEffect, useContext } from "react"
import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import Projects from "../../Projects"
import AppHeader from "../../AppHeader"
import NoContentCard from "../../NoContentCard"
import StoreContext from '../../Store/Context'
import CustomizedSnackbar from "../../Alert"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormControl, MenuItem, Select } from "@material-ui/core"
import { Box } from "@mui/system"
import Cards from '../../Cards'
import axiosInstance from "../../axios/axiosInstance"

function My() {

  const { token } = useContext(StoreContext)

  const [projects, setProjects] = useState("")

  const [myProjectsError, setMyProjectsError] = useState("")

  const [noProjectsMessage, setNoProjectsMessage] = useState("")

  const [deleteMessage, setDeleteMessage] = useState({
    message: "",
    severity: "",
  })

  useEffect(() => {

    //get projects owned by current user
    const getMyProjects = async () => {
      try {
        const response = await axiosInstance.get(
          "/userproject/owned_list",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getMyProjects: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getMyProjects error: ", e.response)
        console.log("getMyProjects error detail: ", e.response.data.detail)
        setMyProjectsError(e.response.data.detail)
      }
    }

    const fetchMyProjects = async () => {
      const projectsFromServer = await getMyProjects()
      setProjects(projectsFromServer)
    }

    fetchMyProjects()

  }, [token])

  const handleDeleteMessage = (message, severity) => {
    setDeleteMessage({
      message: message,
      severity: severity
    })
    setTimeout(() => setDeleteMessage({
      message: "",
      severity: ""
    }), 6100)
  }

  // Delete project
  const deleteProject = async (id) => {

    //delete project from server
    try {
      const response = await axiosInstance.delete(
        `/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      console.log(await response)
      handleDeleteMessage(await response.data.detail, "success")
    } catch (e) {
      console.log(e)
      handleDeleteMessage(e.response.data.detail, "error")
    }

    //delete project from state
    setProjects(projects.filter((project) =>
      project.project_id !== id
    ))

    const filteredProjects = projects.filter((project) =>
      project.project_id !== id
    )

    console.log("Delete: ", projects)
    console.log("Delete length: ", projects.length)
    console.log("Delete filter: ", filteredProjects)
    console.log("Delete filter2: ", filteredProjects.length)

    if (filteredProjects.length === 0) {
      setNoProjectsMessage("No Projects found!")
    }
  }

  // publish non public project
  const projectPrivacy = async (projectId, privacy) => {
    try {
      const response = await axiosInstance.put(
        "/project",
        {
          project_id: projectId,
          is_private: privacy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      )
      // this.setState({ message: await response.data.detail, severity: "success" })
      console.log("projectPrivacy response: ", await response)
    } catch (e) {
      // this.setState({ message: await e.response.data.detail, severity: "error" })
      console.log("projectPrivacy error: ", e.response.data.detail)
    }

    //update project from state
    const updatedProjectList = projects.map((project) => {
      if (project.project_id === projectId) {
        return { ...project, is_private: !project.is_private }
      } else {
        return { ...project, is_private: project.is_private }
      }
    })

    setProjects(updatedProjectList)
  }

  const [searchById, setSearchById] = useState("")
  const [idResults, setIdResults] = useState([])
  const [searchByTitle, setSearchByTitle] = useState("")
  const [titleResults, setTitleResults] = useState([])
  const [searchByAuthor, setSearchByAuthor] = useState("")
  const [authorResults, setAuthorResults] = useState([])

  const [renderType, setRenderType] = useState("default")

  const [searchType, setSearchType] = useState("id")

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchType(event.target.value)
  }

  const RenderProjectList = ({ projectList, type, errorMessage }) => {
    if (projectList && projectList.length > 0) {
      if (type === "default") {
        return (
          <div className={"content-table"}>
            <Projects projects={projects} infoLevel="MyProjects" actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
          </div>
        )
      }
      if (type === "searchId") {
        return (
          <div className={"content-table"}>
            <Projects projects={idResults} infoLevel="MyProjects" actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
          </div>
        )
      }
      if (type === "searchTitle") {
        return (
          <div className={"content-table"}>
            <Projects projects={titleResults} infoLevel="MyProjects" actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
          </div>
        )
      }
      if (type === "searchAuthor") {
        return (
          <div className={"content-table"}>
            <Projects projects={authorResults} infoLevel="MyProjects" actionButtons="all" onDelete={deleteProject} handlePrivacy={projectPrivacy} />
          </div>
        )
      }
    } else {
      if (errorMessage !== "") {
        return (
          <NoContentCard text={errorMessage} />
        )
      } else {
        return (
          <>
          </>
        )
      }

    }

  }

  const handleSearch = (searchBy, search) => {
    if (search !== null) {
      if (searchBy === "id") {
        setIdResults(projects.filter((project) =>
          project.project_id.includes(search)
        ))
      }
      if (searchBy === "title") {
        setTitleResults(projects.filter((project) =>
          project.title.toLowerCase().includes(search.toLowerCase())
        ))
      }
      if (searchBy === "author") {
        setAuthorResults(projects.filter((project) =>
          project.name.toLowerCase().includes(search.toLowerCase())
        ))
      }
    }
  }

  return (
    <>
      <Sidebar />
      <div className="main">
        <AppHeader title="My Projects" button="NEW" buttonIcon="plus" path="/new" />

        {deleteMessage.message && <CustomizedSnackbar message={deleteMessage.message} severity={deleteMessage.severity} />}

        {(projects && projects.length > 0) &&
          <div className="searchbars">
            <div className="searchbar-field">
              {searchType === "id" &&
                <Autocomplete
                  id="searchByProjectId"
                  freeSolo
                  selectOnFocus
                  clearOnBlur
                  value={searchById}
                  sx={{ width: 350, marginLeft: "20px" }}
                  onChange={(event, newValue, reason) => {
                    handleSearch("id", newValue)
                    if (reason === "clear") {
                      setRenderType("default")
                    }
                  }}
                  onInputChange={(event, newValue) => {
                    setRenderType("searchId")
                    setSearchById(newValue)
                    handleSearch("id", newValue)
                  }}
                  onOpen={() => {
                    setRenderType("default")
                    setSearchById("")
                    setIdResults([])
                    setSearchByTitle("")
                    setTitleResults([])
                    setSearchByAuthor("")
                    setAuthorResults([])
                  }}
                  options={projects.map((option) => option.project_id)}
                  renderInput={(params) =>
                    <TextField {...params} label="Search by" color="primary" variant="standard" />}
                />
              }
              {searchType === "title" &&
                <Autocomplete
                  id="searchByTitle"
                  freeSolo
                  selectOnFocus
                  clearOnBlur
                  value={searchByTitle}
                  sx={{ width: 350, marginLeft: "20px" }}
                  onChange={(event, newValue, reason) => {
                    handleSearch("title", newValue)
                    if (reason === "clear") {
                      setRenderType("default")
                    }
                  }}
                  onInputChange={(event, newValue) => {
                    setRenderType("searchTitle")
                    setSearchByTitle(newValue)
                    handleSearch("title", newValue)
                  }}
                  onOpen={() => {
                    setRenderType("default")
                    setSearchById("")
                    setIdResults([])
                    setSearchByTitle("")
                    setTitleResults([])
                    setSearchByAuthor("")
                    setAuthorResults([])
                  }}
                  options={projects.map((option) => option.title)}
                  renderInput={(params) =>
                    <TextField {...params} label="Search by" color="primary" variant="standard" />
                  }
                />
              }
              {searchType === "author" &&
              <Autocomplete
                id="searchByAuthor"
                freeSolo
                selectOnFocus
                clearOnBlur
                value={searchByAuthor}
                sx={{ width: 350, marginLeft: "20px" }}
                onChange={(event, newValue, reason) => {
                  handleSearch("author", newValue)
                  if (reason === "clear") {
                    setRenderType("default")
                  }
                }}
                onInputChange={(event, newValue) => {
                  setRenderType("searchAuthor")
                  console.log(newValue)
                  setSearchByAuthor(newValue)
                  handleSearch("author", newValue)
                }}
                onOpen={() => {
                  setRenderType("default")
                  setSearchById("")
                  setIdResults([])
                  setSearchByTitle("")
                  setTitleResults([])
                  setSearchByAuthor("")
                  setAuthorResults([])
                }}
                options={projects.map((option) => option.author)}
                renderInput={(params) =>
                  <TextField {...params} label="Search by" color="primary" variant="standard" />
                }
              />
            }
            </div>
            <div className="searchbar-type">
              <Box sx={{ minWidth: 80, marginLeft: "20px", marginTop: "12px" }}>
                <FormControl fullWidth>
                  <Select
                    value={searchType}
                    label="Search By"
                    onChange={handleSearchChange}
                    autoWidth
                  >
                    <MenuItem value={"id"}>Id</MenuItem>
                    <MenuItem value={"title"}>Title</MenuItem>
                    <MenuItem value={"author"}>Author</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </div>
          </div>
        }

        <RenderProjectList projectList={projects} type={renderType} errorMessage={myProjectsError} />

        {noProjectsMessage && <NoContentCard text={noProjectsMessage} />}

      </div>
      <Cards />
    </>
  )
}

export default My
