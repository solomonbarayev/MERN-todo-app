import React from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import styled from 'styled-components';

function Task(props) {
  const { onCompleteTask } = props;

  return (
    <TaskItem
      className="task"
      onDoubleClick={() => onCompleteTask(props.task._id)}
      isComplete={props.task.isComplete}
    >
      <div>
        <Checkbox
          type="checkbox"
          checked={props.task.isComplete}
          onChange={() => onCompleteTask(props.task._id)}
        />
        <TaskText className="task-text" isComplete={props.task.isComplete}>
          {props.task.text}
        </TaskText>
      </div>
      <div className="button-container">
        <button
          onClick={() => {
            props.onDeleteTask(props.task._id);
          }}
        >
          <FiTrash2 className="task-icon" />
        </button>
        <button onClick={() => props.onEditTask(props.task._id)}>
          <FiEdit className="task-icon" />
        </button>
      </div>
    </TaskItem>
  );
}

export default Task;

// Styled Components
const TaskItem = styled.li`
  cursor: pointer;
  background-color: ${(props) => props.isComplete && '#303030'};
  border-radius: 5px;
  border: ${(props) => props.isComplete && 'none'};
  border-left: ${(props) => props.isComplete && '5px solid orange'};
  opacity: ${(props) => props.isComplete && '0.7'};
`;

const TaskText = styled.p`
  text-decoration: ${({ isComplete }) =>
    isComplete ? 'line-through' : 'none'};
`;

const Checkbox = styled.input`
  cursor: pointer;
`;
