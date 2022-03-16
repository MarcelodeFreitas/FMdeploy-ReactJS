import Sidebar from "../../Sidebar"
import "../../Sidebar.css"
import "./Main.css"
import AppHeader from "../../AppHeader"
import { useContext, useEffect, useState } from "react"
import StoreContext from "../../Store/Context"
import Projects from "../../Projects"
import NoContentCard from "../../NoContentCard"
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { FormControl, MenuItem, Select } from "@material-ui/core"
import { Box } from "@mui/system"
import Cards from '../../Cards'
import axiosInstance from "../../axios/axiosInstance"

const Shared = () => {

  const { token } = useContext(StoreContext)

  const [projects, setProjects] = useState("")

  const [sharedProjectsError, setsharedProjectsError] = useState("")

  useEffect(() => {

    //get projects owned by current user
    const getSharedProjects = async () => {
      try {
        const response = await axiosInstance.get(
          "/userproject/shared_list",
          {
            headers: {
              Authorization: `Bearer ${token}`
            },
          }
        )
        console.log("getSharedProjects: ", await response.data)
        return await response.data.reverse()
      } catch (e) {
        console.log("getSharedProjects error: ", e.response)
        setsharedProjectsError(e.response.data.detail)
      }
    }

    const getProjects = async () => {
      const projectsFromServer = await getSharedProjects()
      setProjects(projectsFromServer)
    }

    getProjects()

  }, [token])

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
            <Projects projects={projects} infoLevel="Public" actionButtons="run" />
          </div>
        )
      }
      if (type === "searchId") {
        return (
          <div className={"content-table"}>
            <Projects projects={idResults} infoLevel="Public" actionButtons="run" />
          </div>
        )
      }
      if (type === "searchTitle") {
        return (
          <div className={"content-table"}>
            <Projects projects={titleResults} infoLevel="Public" actionButtons="run" />
          </div>
        )
      }
      if (type === "searchAuthor") {
        return (
          <div className={"content-table"}>
            <Projects projects={authorResults} infoLevel="Public" actionButtons="run" />
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
        <AppHeader title="Shared Projects" />

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

        <RenderProjectList projectList={projects} type={renderType} errorMessage={sharedProjectsError} />

      </div>
      <Cards />
    </>
  )
}

export default Shared