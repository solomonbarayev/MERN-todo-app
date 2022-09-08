import React, { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';

function Form(props) {
  const { user } = useAuth();
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
    <>
      <form
        onSubmit={handleSubmit}
        className="form"
        style={{
          opacity: user ? 1 : 0.8,
        }}
      >
        <div className="controlled-input">
          <input
            type="text"
            placeholder="Task"
            value={props.task}
            onChange={(e) => props.setTask(e.target.value)}
            ref={inputRef}
            disabled={!user}
          />
        </div>
        <button type="submit" disabled={!user}>
          {props.isEditing ? 'Update' : 'Enter'}
        </button>
      </form>
      {!user && <p class="error-message">Must be logged in to add tasks</p>}
    </>
  );
}

export default Form;
