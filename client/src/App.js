import './App.css';

import { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import confetti from './assets/confetti.json';
import Form from './components/Form';
import Task from './components/Task';
import styled from 'styled-components';
import Nav from './components/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { user } = useAuth();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [totallyDone, setTotallyDone] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const getAllTasks = async () => {
    try {
      const response = await fetch('/tasks', {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        setTasks(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    user && getAllTasks();
    !user && setTasks([]);
  }, [user]);

  useEffect(() => {
    tasks.every((task) => task.isComplete === true)
      ? setTotallyDone(true)
      : setTotallyDone(false);
  }, [tasks]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!user) {
      const error = new Error('You must be logged in to add a task');
      throw error;
    }
    return fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ text: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        getAllTasks();
        setTask('');
      });
  };

  const onDeleteTask = (id) => {
    // setTasks([...tasks.filter((task) => task.id !== id)]);
    if (!user) {
      const error = new Error('You must be logged in to delete a task');
      throw error;
    }
    return (
      fetch(`/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
        // .then(() => {
        //   // setTasks([...tasks.filter((task) => task.id !== id)]);
        //   getTasks();
        // })
        .then(() => {
          getAllTasks();
        })
    );
  };

  const onEditTask = (id) => {
    setEditing(true);
    tasks.map((task) => {
      if (task._id === id) {
        setTask(task.text);
        setEditId(task._id);
      }
    });
  };

  const submitUpdate = (e) => {
    if (!user) {
      const error = new Error('You must be logged in to edit a task');
      throw error;
    }
    e.preventDefault();
    return fetch(`/tasks/${editId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ text: task }),
    })
      .then((response) => response.json())
      .then(() => {
        getAllTasks();
        setTask('');
        setEditing(false);
      });
  };

  const onCompleteTask = (id) => {
    if (!user) {
      const error = new Error('You must be logged in to complete a task');
      throw error;
    }
    let isCurrentlyComplete = tasks.filter((task) => task._id === id)[0]
      .isComplete;
    return fetch(`/tasks/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ isComplete: !isCurrentlyComplete }),
    })
      .then((response) => response.json())
      .then(() => {
        getAllTasks();
      });
  };

  const onDeleteAllTasks = () => {
    if (!user) {
      const error = new Error('You must be logged in to delete all tasks');
      throw error;
    }
    return fetch('/tasks', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
      .then(() => {
        getAllTasks();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleClose = () => setShowLogin(false);
  const handleShow = () => setShowLogin(true);
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);

  return (
    <section className="container">
      <Nav handleShow={handleShow} handleRegisterShow={handleShowRegister} />
      <h1>What are we doing today?</h1>
      {editing ? (
        <Form
          task={task}
          tasks={tasks}
          setTask={setTask}
          onSubmit={submitUpdate}
          isEditing={editing}
        />
      ) : (
        <Form
          task={task}
          setTask={setTask}
          onSubmit={onSubmit}
          isEditing={editing}
        />
      )}
      {tasks.length !== 0 ? (
        <ul className="tasks">
          {tasks.map((task) => {
            return (
              <Task
                task={task}
                key={task._id}
                onDeleteTask={onDeleteTask}
                onEditTask={onEditTask}
                onCompleteTask={onCompleteTask}
              />
            );
          })}
        </ul>
      ) : (
        <h2 className="waiting">Waiting on your tasks...</h2>
      )}
      {tasks.length > 0 && (
        <button
          type="button"
          className="reset-button"
          onClick={onDeleteAllTasks}
        >
          Reset Todos
        </button>
      )}
      {totallyDone && tasks.length > 0 && (
        <Congratz>
          <h4>Woohoo! You've finished!</h4>
          <Lottie animationData={confetti} loop={true} />
        </Congratz>
      )}

      <Modal show={showLogin} onHide={handleClose} class="modal">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showRegister} onHide={handleCloseRegister} class="modal">
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseRegister}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </section>
  );
}

export default App;

const Congratz = styled.div`
  svg {
    max-width: 50%;
    margin-top: -30px;
  }
`;

// const Modal = styled.div`
//   position: absolute;
//   top: 50px;
//   right: 50px;
//   width: 300px;
//   height: 300px;
//   background-color: white;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   z-index: 100;
//   display: none;
// `;
