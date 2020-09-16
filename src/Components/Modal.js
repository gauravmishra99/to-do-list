import { Fab, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import React, { useState, useContext } from "react";
import { ListsContext } from "./ListsContext";
import "./Modal.css";

const Modal = ({
  setIsClicked,
  isClicked,
  setIsTask,
  tasks,
  ListId,
}) => {
  const [heading, setHeading] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [listName, setListName] = useState("");
  const {listValue, userValue} = useContext(ListsContext)
  const [lists, setLists] = listValue
  const [currentUser,setCurrentUser] = userValue

  const closeHandler = () => {
    setIsTask(false);
  };

  const addInList = () => {
    var id = Math.floor(Math.random() * 101);
    setLists((prevlist) => [
      ...prevlist,
      { userName: currentUser, listName: listName, id: id, tasks: [] },
    ]);
    setListName("");

    setIsClicked(false)
  };

  const addInTask = () => {
    const num = Math.floor(Math.random() * 1000);
    const elementsIndex = lists.findIndex((element) => element.id === ListId);
    console.log("INDEX =>>>>>", elementsIndex);
    let newList = [...lists];
    let newTasks = [...newList[elementsIndex].tasks];
    newTasks.push({
      heading: heading,
      details: details,
      date: date,
      id: num,
      status: false,
    });

    newList[elementsIndex] = { ...newList[elementsIndex], tasks: newTasks };

    setLists(newList);

    setIsTask(false);
  };

  return (
    <>
      {isClicked ? (
        <div className="modal-list">
          <div>
            <TextField
              size="small"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              variant="outlined"
              label="Enter List Title"
              className="modal-inputs"
            />
          </div>

          <div>
            <Fab onClick={addInList} color="primary" aria-label="add">
              <AddIcon />
            </Fab>
          </div>
        </div>
      ) : (
        <div className="modal">
          <div className="modal-header">
            <IconButton>
              <DeleteIcon />
            </IconButton>

            <IconButton onClick={closeHandler}>
              <CloseIcon />
            </IconButton>
          </div>

          <div className="modal-body">
            <TextField
              size="small"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              variant="outlined"
              label="Add Task Heading"
              className="modal-inputs"
            />
            <TextField
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              size="small"
              variant="outlined"
              label="Add Details"
              multiline
              className="modal-inputs detail"
            />
            <TextField
              size="small"
              id="date"
              label="Add Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="modal-inputs"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <Fab
            className="modal-addtask"
            size="small"
            onClick={addInTask}
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>
        </div>
      )}
    </>
  );
};

export default Modal;
