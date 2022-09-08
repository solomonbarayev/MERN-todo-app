import React from 'react';
import styled from 'styled-components';
import { useLogout } from '../hooks/useLogout.js';
import { useAuth } from '../contexts/AuthContext.js';

const Nav = ({ handleShow, handleRegisterShow }) => {
  const { user } = useAuth();
  const { logout } = useLogout();
  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar>
      <NavContainer>
        {user && <>{user.email}</>}
        {!user && (
          <>
            <button
              type="button"
              // onMouseOver={openModal}
              className="nav-button_login"
              // onMouseLeave={() => {
              //   if (showModal) {
              //     console.log('modal is open');
              //     closeModal();
              //   }
              // }}
              onClick={handleShow}
            >
              Login
            </button>
            <button type="button" onClick={handleRegisterShow}>
              Register
            </button>
          </>
        )}
        {user && (
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        )}
      </NavContainer>
    </Navbar>
  );
};

export default Nav;

// Styled Components
const Navbar = styled.nav`
  /* width: 100%; */
  color: #fff;
  padding: 1rem 5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  top: 0;
  right: 0;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;

  button {
    background-color: transparent;
    color: #fff;
    border: 1px solid #fff;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
`;
