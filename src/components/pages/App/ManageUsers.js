import { useState, useEffect, useContext } from "react";
import Sidebar from "../../Sidebar";
import "../../Sidebar.css";
import "./Main.css";
import AppHeader from "../../AppHeader";
import StoreContext from "../../Store/Context";
import CustomizedSnackbar from "../../Alert";
import Cards from "../../Cards";
import axiosInstance from "../../axios/axiosInstance";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useFormik } from "formik";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  Grid,
} from "@material-ui/core";
import * as Yup from "yup";

function ManageUsers() {
  const { token } = useContext(StoreContext);

  //handle messages
  const [message, setMessage] = useState({
    message: "",
    severity: "",
  });
  //handle messages for the child components
  const handleMessage = (message, severity) => {
    setMessage({ message: "", severity: "" });
    setMessage({ message: message, severity: severity });
  };

  /* useEffect(() => {}, [token]); */

  // create user with any role
  const createUser = async (values) => {
    console.log("createUser values: ", values, token);
    try {
      const response = await axiosInstance.post("/user/admin", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("createUser response: ", response.data);
      handleMessage("User created with success!", "success");
    } catch (e) {
      console.log("createUser error: ", e.response);
      if (e.response && e.response.data) {
        console.log("createUser error detail: ", e.response.data.detail);
        handleMessage(e.response.data.detail, "error");
      } else {
        handleMessage("An error occurred while creating the user.", "error");
      }
    }
  };

  //form validation
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        "Password must contain 8 Characters, One Uppercase, One Lowercase, and One Number"
      )
      .required("Required"),
    role: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validationSchema,
    onSubmit: (values) => {
      createUser(values); // Send the form data to the API endpoint here
    },
  });

  return (
    <>
      <Sidebar />
      {message && (
        <CustomizedSnackbar
          message={message.message}
          severity={message.severity}
        />
      )}
      <div className="main">
        <AppHeader title="User management" />
        <Box sx={{ width: "100%", marginTop: "4vh" }}>
          <Stack spacing={2}>
            <Paper sx={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <Typography variant="h6">Add user</Typography>
                <Typography variant="subtitle1">
                  Fill out the form below to add a new user.
                </Typography>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="name"
                      name="name"
                      label="Name"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.name && formik.errors.name}
                      helperText={formik.touched.name && formik.errors.name}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="email"
                      name="email"
                      label="Email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && formik.errors.email}
                      helperText={formik.touched.email && formik.errors.email}
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.password && formik.errors.password}
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      fullWidth
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl
                      error={formik.touched.role && formik.errors.role}
                      fullWidth
                      required
                    >
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        id="role"
                        name="role"
                        labelId="role-label"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="guest">Guest</MenuItem>
                      </Select>
                      {formik.touched.role && formik.errors.role && (
                        <FormHelperText>{formik.errors.role}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                </Grid>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={!formik.isValid || !formik.dirty}
                  style={{ marginTop: "15px" }}
                >
                  Create User
                </Button>
              </form>
            </Paper>
            <Paper sx={{ padding: "10px" }}>
              <div style={{ marginBottom: "15px" }}>
                <Typography variant="h6">Manage Users</Typography>
                <Typography variant="subtitle1">
                  Searchbar: search for users by name or email.
                </Typography>
              </div>
            </Paper>
          </Stack>
        </Box>
      </div>
      <Cards />
    </>
  );
}

export default ManageUsers;
