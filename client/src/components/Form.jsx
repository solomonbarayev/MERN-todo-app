import React, { useEffect, useRef } from "react";

function Form(props) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  function handleSubmit(e) {
    if (props.isEditing) {
      props.onSubmit(e, props.task);
    } else {
      props.onSubmit(e);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="controlled-input">
        <input
          type="text"
          placeholder="Task"
          value={props.task}
          onChange={(e) => props.setTask(e.target.value)}
          ref={inputRef}
        />
      </div>
      <button type="submit">{props.isEditing ? "Update" : "Enter"}</button>
    </form>
  );
}

export default Form;
