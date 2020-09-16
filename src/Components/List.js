import {
  Card,
  CardContent,
  Fab,
  IconButton,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "./List.css";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddIcon from "@material-ui/icons/Add";
import Task from "./Task";
import Modal from "./Modal";

const List = ({ name, tasks, id}) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [isTask, setIsTask] = useState(false);

  useEffect(() => {
    filterHandler();
  }, [tasks]);

  const filterHandler = () => {
    setFilteredTasks(tasks.filter((task) => task.status === true));
  };

  const addTask = () => {
    setIsTask(true);
  };

  return (
    <>
      {isTask && (
        <div className="modal-hue">
          <Modal ListId = {id} tasks={tasks} setIsTask={setIsTask}/>
        </div>
      )}

      <Card className="list-card" variant="outlined">
        <CardContent>
          <div className="card-header">
            <p>{name}</p>
            <IconButton size="small">
              <MoreVertIcon />
            </IconButton>
          </div>

          <div className="card-body">
            <div className="card-addIcon">
              <Fab size="small" color="primary" aria-label="add">
                <AddIcon onClick={addTask} />
              </Fab>
              <label className="card-label">Add a task</label>
            </div>

            <div className="card-tasks">
              {tasks.map(
                (task) =>
                  task.status === false && (
                    <Task
                      heading={task.heading}
                      details={task.details}
                      status={task.status}
                      date={task.date}
                      key = {task.id}
                      TaskId = {task.id}
                      ListId = {id}
                    />
                  )
              )}

              {filteredTasks.length > 0 && (
                <div className="card-tasks completed">
                  <p className="completed-heading">
                    Completed ( {filteredTasks.length} )
                  </p>

                  {filteredTasks.map((task) => (
                    <Task
                      heading={task.heading}
                      details={task.details}
                      status={task.status}
                      date={task.date}
                      key = {task.id}
                      TaskId = {task.id}
                      ListId = {id}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default List;
