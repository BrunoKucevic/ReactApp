import React, { useState } from "react";
import "../CSS/inputContainer.css";
import "../CSS/listsContainer.css";
import TodoItem from "./TodoItem";
const FirstComponent = () => {
  const [lists, setLists] = useState({
    todoList: [],
    doingList: [],
    doneList: [],
  });
  const [draggedItem, setDraggedItem] = useState(null);
  const [inputValue, setinputValue] = useState("");

  const handleClick = () => {
    setLists((prevLists) => {
      const newLists = { ...prevLists };
      newLists.todoList = [...prevLists.todoList, inputValue];
      return newLists;
    });
    setinputValue("");
  };

  const handleClose = (index, listId) => {
    setLists((prevLists) => {
      const newLists = { ...prevLists };
      newLists[listId].splice(index, 1);
      return newLists;
    });
  };

  const handleDragStart = (item, listId) => {
    setDraggedItem({ item, from: listId });
  };

  const handleDrop = (listId) => {
    if (draggedItem && draggedItem.from !== listId) {
      setLists((prevLists) => {
        const newLists = { ...prevLists };
        newLists[draggedItem.from] = newLists[draggedItem.from].filter(
          (i) => i !== draggedItem.item
        );
        newLists[listId] = [...newLists[listId], draggedItem.item];
        return newLists;
      });
    }
    setDraggedItem(null);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="inputContainer">
      <input
        className="center"
        type="text"
        onChange={(e) => setinputValue(e.target.value)}
        value={inputValue}
      />
      <div>
        <button
          className="center"
          style={{ width: "55px", height: "25px" }}
          disabled={inputValue.trim() == "" ? true : false}
          onClick={handleClick}
        >
          Add
        </button>
      </div>
      <div className="listsContainer">
        {Object.keys(lists).map((listId) => (
          <div
            className="listContainer"
            key={listId}
            onDrop={() => handleDrop(listId)}
            onDragOver={handleDragOver}
          >
            {lists[listId].map((item, index) => (
              <TodoItem
                title={`Todo: ${listId}`}
                item={item}
                listId={listId}
                index={index}
                handleClose={handleClose}
                handleDragStart={handleDragStart}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FirstComponent;
