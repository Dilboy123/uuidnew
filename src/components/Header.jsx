import React, { useState } from "react";
import styled from "styled-components";
import { useGlobalContext } from "../context/user_context";
import { Logo } from ".";
import { Navigate } from "react-router-dom";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";

function Header() {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logout } = useGlobalContext();

  return (
    <header className="header">
      {!user && <Navigate to="/"></Navigate>}
      <Wrapper>
        <div className="logo-container">
          <Logo />
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              setShowLogout(!showLogout);
            }}
          >
            <FaUserCircle />
            {user}
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button type="button" className="dropdown-btn" onClick={logout}>
              logout
            </button>
          </div>
        </div>
      </Wrapper>
    </header>
  );
}

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);

  .nav-center {
    display: flex;
    width: 50vw;
    align-items: center;
    justify-content: space-between;
  }

  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;
    
    .logo-text {
      display: block;
    }
  }
`;
export default Header;
