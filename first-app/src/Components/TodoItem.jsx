import React from "react";
import "../CSS/buttons.css";

const TodoItem = ({
  title,
  item,
  listId,
  index,
  handleClose,
  handleDragStart,
}) => {
  return (
    <div
      draggable
      onDragStart={() => handleDragStart(item, listId)}
      className="todoItemContainer"
    >
      <div className="todoItemHeader">
        <h3 key={title}>{title}</h3>
        <button
          onClick={() => handleClose(index, listId)}
          className="closeButton"
        >
          X
        </button>
      </div>
      <div className="todoItemFooter">
        <h5 key={index}>{item}</h5>
      </div>
    </div>
  );
};

export default TodoItem;
