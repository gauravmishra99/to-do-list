import { Fab } from "@material-ui/core";
import React, { useState, useContext } from "react";
import DoneIcon from "@material-ui/icons/Done";
import "./Task.css";
import EditTask from "./EditTask";
import { ListsContext } from "./ListsContext";

const Task = ({ heading, details, status, date, TaskId, ListId }) => {
  const [isClicked, setIsClicked] = useState(false);
  const {listValue, userValue} = useContext(ListsContext)
  const [lists, setLists] = listValue

  const clickHandler = () => {
    setIsClicked(true);
  };

  if (status) {
    var button = <DoneIcon className="done-icon" />;
  }

  const invertStatus = () => {
    const newStatus = !status;
    const elementsIndex = lists.findIndex((element) => element.id === ListId);
    let newList = [...lists];
    let newTasks = newList[elementsIndex].tasks.filter(
      (task) => task.id !== TaskId
    );
    console.log(newTasks)
    newTasks.push({
      heading: heading,
      details: details,
      date: date,
      status: newStatus,
      id: TaskId,
    });
    // let newTasks = [...newList[elementsIndex].tasks];
    newList[elementsIndex] = { ...newList[elementsIndex], tasks: newTasks };
    setLists(newList);
  };
  return (
    <>
      {isClicked && (
        <div className="modal-hue">
          <EditTask
            headingValue={heading}
            detailsValue={details}
            statusValue={status}
            dateValue={date}
            TaskId={TaskId}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
            ListId={ListId}
          />
        </div>
      )}

      <div className="task">
        <div>
          <Fab
            onClick={invertStatus}
            size="small"
            className={`addtaskbutton ${button && "completed-btn"}`}
          >
            {button}
          </Fab>
        </div>

        <div className="task-body">
          <div className={`${button && "task-heading"}`}>
            <p style={{ cursor: "pointer" }} onClick={clickHandler}>
              {heading}
            </p>
          </div>

          {!button && <div className="task-details">{details}</div>}
        </div>
      </div>
    </>
  );
};

export default Task;
