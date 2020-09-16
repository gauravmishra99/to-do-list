import React, { useEffect, useState } from "react";
import "./Header.css";
import { Button } from "@material-ui/core";
import profile from "../gaurav.jpeg";

const Header = ({ setIsLoggedIn }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const num = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/id/${num}/info`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.download_url);
        setUrl(data.download_url);
      });
  }, []);

  const submitHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="header">
      <nav className="header-navbar">
        <label className="logo">TaskBoard</label>
        {console.log(url)}

        <div className="header-button">
          <img src={url} alt="profile-pic" className="header-image" />
          <Button
            onClick={submitHandler}
            variant="contained"
            size="small"
            color="primary"
          >
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
