import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { ListsContext } from "./ListsContext";
import "./Login.css";

const Login = ({ setIsClicked, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { listValue, userValue, userList } = useContext(ListsContext);
  const [currentUser, setCurrentUser] = userValue;
  const [users, setUsers] = userList;

  const handleClick = () => {
    setIsClicked(false);
  };

  const handleLoginClick = () => {
    users.map((user) => {
      if (user.email === email && user.password === password) {
        setIsLoggedIn(true);
        setCurrentUser(user.username);
        console.log("hue");
        setIsClicked(false);
      }
    });
  };

  return (
    <section className="login">
      <div className="login-container">
        <h1 className="heading-text">Log in !</h1>
        <form className="login-form">
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
          <div className="login-util">
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <Button variant="contained" color="primary" size="small">
              Forgot Password
            </Button>
          </div>

          <Button
            onClick={handleLoginClick}
            variant="contained"
            size="large"
            color="primary"
          >
            Log In
          </Button>
        </form>

        <a onClick={handleClick} className="btn-changetologin">
          SignUp?
        </a>
      </div>
    </section>
  );
};

export default Login;
