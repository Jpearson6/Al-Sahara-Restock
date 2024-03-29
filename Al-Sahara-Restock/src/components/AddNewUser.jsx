import {
  Box,
  Button,
  Collapse,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore } from "../firebase/config";
import React from "react";
import PropTypes from "prop-types";

const CreateUser = () => {
  const [newUser, setNewUser] = React.useState({
    email: "",
    password: "",
    name: "",
    role: "employee",
  });
  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("");

  const isEmailValid = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleEmailChange = (event) => {
    let tempUser = newUser;
    setNewUser({ ...tempUser, email: event.target.value });
  };
  const handlePassswordChange = (event) => {
    let tempUser = newUser;
    setNewUser({ ...tempUser, password: event.target.value });
  };
  const handleNameChange = (event) => {
    let tempUser = newUser;
    setNewUser({ ...tempUser, name: event.target.value });
  };

  const handleNewUser = async () => {
    if (!open) {
      setOpen(true);
    } else {
      if (
        !isEmailValid(newUser.email) ||
        newUser.password.length < 6 ||
        !newUser.name
      ) {
        setError("Invalid New User");
        setTimeout(() => {
          setError("");
        }, 4000);
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            newUser.email,
            newUser.password
          );

          try {
            await setDoc(doc(firestore, "users", userCredential.user.uid), {
              email: newUser.email,
              name: newUser.name,
              role: newUser.role,
              // Add additional user data as needed
            });
            // User signed up successfully
            console.log("User signed up:", userCredential.user);
          } catch (docError) {
            console.error("Error setting document:", docError);
            // Delete the newly created user
            try {
              await deleteUser(auth, userCredential.user.uid);
              console.log("Deleted user due to error setting document");
            } catch (deleteError) {
              console.error("Error deleting user:", deleteError);
            }
          }
        } catch (authError) {
          setError(authError.message);
        }
        console.log(newUser);
        setOpen(false);
      }
    }
  };

  const handleRoleChange = (event) => {
    let tempUser = newUser;
    setNewUser({ ...tempUser, role: event.target.value });
  };

  const DisplayError = ({ error }) => (
    <Typography textAlign={"center"} color={"red"}>
      {error}
    </Typography>
  );

  DisplayError.propTypes = {
    error: PropTypes.string,
  };

  return (
    <Box display={"flex"} justifyContent={"center"} flexDirection={"column"}>
      <Button onClick={handleNewUser}>Add User</Button>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Grid
          direction={"column"}
          container
          spacing={3}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Grid item xs={12} width={"80%"}>
            <TextField
              id="email"
              fullWidth
              variant="standard"
              label={"Email"}
              value={newUser.email}
              onChange={handleEmailChange}
            />
          </Grid>
          <Grid item xs={12} width={"80%"}>
            <TextField
              id="password"
              fullWidth
              variant="standard"
              label={"Password"}
              value={newUser.password}
              onChange={handlePassswordChange}
            />
          </Grid>
          <Grid item xs={12} width={"80%"}>
            <TextField
              id="name"
              fullWidth
              variant="standard"
              label={"Name"}
              value={newUser.name}
              onChange={handleNameChange}
            />
          </Grid>
          <Grid item xs={12} width={"80%"}>
            <FormControl fullWidth>
              <Select
                variant="standard"
                labelId="role-select"
                id="role-select"
                value={newUser.role}
                label="role"
                onChange={handleRoleChange}
                sx={{ mb: 2 }}
              >
                <MenuItem value={"employee"}>Employee</MenuItem>
                <MenuItem value={"owner"}>Owner</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button onClick={() => setOpen(false)}>Close</Button>
          </Grid>
        </Grid>
        {error && <DisplayError error={error} />}
      </Collapse>
    </Box>
  );
};

export default CreateUser;
