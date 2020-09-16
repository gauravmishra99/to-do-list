import React, { useState, createContext } from "react";

export const ListsContext = createContext();

export const ListProvider = (props) => {
  const [lists, setLists] = useState([]);
  const [ currentUser,setCurrentUser ] = useState('')
  const [users, setUsers] = useState([]);
  return (
    <ListsContext.Provider value={{listValue: [lists, setLists],userValue:[currentUser,setCurrentUser],userList:[users,setUsers]}}>
      {props.children}
    </ListsContext.Provider>
  );
};
