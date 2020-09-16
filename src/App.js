import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import ToDoList from "./Components/ToDoList";
import { ListProvider } from "./Components/ListsContext";

function App() {
  const [isClicked, setIsClicked] = useState(false);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  useEffect(()=>{
    getLocalIsLoggedIn()
  },[])

  useEffect(()=>{
    saveLocalIsLoggedIn()
  },[isLoggedIn])

  const saveLocalIsLoggedIn = () => {
    localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
  };

  const getLocalIsLoggedIn = () => {
    if (localStorage.getItem("isLoggedIn") === null) {
      // localStorage.setItem("userDetails", JSON.stringify([]));
    } else {
      let localIsLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
      setIsLoggedIn(localIsLoggedIn)
    }
  };
  
  return (
    <div className="App">
      <ListProvider>
        {!isLoggedIn && !isClicked && <Signup setIsClicked={setIsClicked} />}
        {isClicked && <Login setIsClicked={setIsClicked} setIsLoggedIn = {setIsLoggedIn}/>}
        {isLoggedIn && <ToDoList setIsLoggedIn = {setIsLoggedIn} isLoggedIn={isLoggedIn} />}
      </ListProvider>
    </div>
  );
}

export default App;
