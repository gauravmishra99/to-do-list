import { Fab, IconButton, TextField } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import React, { useState, useContext } from "react";
import { ListsContext } from "./ListsContext";
import "./Modal.css";

const EditTask = ({
  setIsClicked,
  isClicked,
  headingValue,
  detailsValue,
  statusValue,
  dateValue,
  TaskId,
  ListId,
}) => {
  const [heading, setHeading] = useState(headingValue);
  const [details, setDetails] = useState(detailsValue);
  const [date, setDate] = useState(dateValue);
  const {listValue, userValue} = useContext(ListsContext)
  const [lists, setLists] = listValue;
  
  const closeHandler = () => {
    setIsClicked(false);
  };

  const deleteClicked = () => {
    const elementsIndex = lists.findIndex((element) => element.id === ListId);
    let newList = [...lists];

    let newTasks = newList[elementsIndex].tasks.filter(
      (task) => task.id !== TaskId
    );
    console.log(newTasks);
    console.log("hue>>>", newList[elementsIndex]);
    newList[elementsIndex] = { ...newList[elementsIndex], tasks: newTasks };
    console.log("new List >>>>", newList);
    setLists(newList);

    setIsClicked(false);
  };

  const addInTask = () => {
    const elementsIndex = lists.findIndex((element) => element.id === ListId);
    let newList = [...lists];
    let newTasks = newList[elementsIndex].tasks.filter(
      (task) => task.id !== TaskId
    );
    newTasks.push({
      heading: heading,
      details: details,
      date: date,
      status: statusValue,
      id: TaskId,
    });
    // let newTasks = [...newList[elementsIndex].tasks];
    newList[elementsIndex] = { ...newList[elementsIndex], tasks: newTasks };
    setLists(newList);
    setIsClicked(false);
  };

  return (
    <>
      <div className="modal">
        <div className="modal-header">
          <IconButton onClick={deleteClicked}>
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
            label="coming soon"
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
            defaultValue={dateValue}
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
    </>
  );
};

export default EditTask;
