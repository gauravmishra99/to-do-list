import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "./Signup.css";
import { ListsContext } from "./ListsContext";

const Signup = ({setIsClicked}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {listValue, userValue,userList} = useContext(ListsContext)
  const [currentUser,setCurrentUser] = userValue
  const [users, setUsers] = userList;


  useEffect(() => {
    console.log(users)
    saveLocalCurrentUser();
    getLocalUserDetails();
    console.log("Hue")
  }, []);

  useEffect(()=>{
    saveLocalUserDetails();
    console.log("siubdksjb")
  },[users])

  const saveLocalCurrentUser = () => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  const submitHandler = () => {
    setUsers((prevUsers) => [
      ...prevUsers,
      { username: username, email: email, password: password },
    ]);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleClick = () => {
    setIsClicked(true)
  }

  //Saving details of users to LocalStorage

  const saveLocalUserDetails = () => {
    localStorage.setItem("userDetails", JSON.stringify(users));
  };

  const getLocalUserDetails = () => {
    if (localStorage.getItem("userDetails") === null) {
      // localStorage.setItem("userDetails", JSON.stringify([]));
    } else {
      let localUsers = JSON.parse(localStorage.getItem("userDetails"));
      setUsers(localUsers)
    }
  };

  return (
    <section className="signup">
      <div className="signup-container">
        <h1 className="heading-text">Sign Up</h1>
        <form className="signup-form">
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="signup-text"
            variant="outlined"
            label="Username"
          />
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="signup-text"
            variant="outlined"
            label="Email Address"
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="signup-text"
            type="password"
            variant="outlined"
            label="Password"
          />
          <FormControlLabel
            control={<Checkbox color="primary" />}
            label="I accept the terms & conditions"
          />

          <Button
            onClick={submitHandler}
            variant="contained"
            size="large"
            color="primary"
          >
            Sign Up
          </Button>
        </form>
        
        <a onClick={handleClick} className="btn-changetologin">Login?</a>
      </div>
    </section>
  );
};

export default Signup;
