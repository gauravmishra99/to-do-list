import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import React, { useState, useContext, useEffect } from "react";
import Header from "./Header";
import List from "./List";
import Modal from "./Modal";
import "./ToDoList.css";
import { ListsContext } from "./ListsContext";

const ToDoList = ({ setIsLoggedIn, isLoggedIn }) => {
  const { listValue, userValue, userList } = useContext(ListsContext);
  const [lists, setLists] = listValue;
  const [users, setUsers] = userList;
  const [currentUser, setCurrentUser] = userValue;
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    saveLocalCurrentUser()
    saveLocalList();
  }, []);

  useEffect(() => {
    getLocalList();
  }, [lists])

  useEffect(() => {
    setCurrentUser('')
  }, [isLoggedIn]);

  useEffect(()=>{
    getLocalCurrentUser();
  },[currentUser])

  const saveLocalCurrentUser = () => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  };

  const getLocalCurrentUser = () => {
    let localCurrentUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(localCurrentUser);
  };

  const saveLocalList = () => {
    localStorage.setItem("lists", JSON.stringify(lists));
  };

  const getLocalList = () => {
    let localList = JSON.parse(localStorage.getItem("lists"));
    setCurrentUser(localList);
  };

  const ClickHandler = () => {
    setIsClicked(true);
  };

  return (
    <div>
      {isClicked ? (
        <div className="modal-hue">
          <Modal
            userName={currentUser}
            setIsClicked={setIsClicked}
            isClicked={isClicked}
          />
        </div>
      ) : (
        <div></div>
      )}

      <Header setIsLoggedIn={setIsLoggedIn} />

      <div className="todolist-body">
        {lists.map((list) => {
          if (list.userName === currentUser) {
            return (
              <List
                name={list.listName}
                key={list.id}
                tasks={list.tasks}
                id={list.id}
              />
            );
          }
        })}
        {/* {lists.map((list) => (
          <List name={list.listName} key={list.id} tasks={list.tasks} />
        ))} */}
      </div>

      <div className="todolist-icon">
        <Fab onClick={ClickHandler} color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </div>
    </div>
  );
};

export default ToDoList;
