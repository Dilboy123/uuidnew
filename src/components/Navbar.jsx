import React, { useState } from "react";
import { useSidebarContext } from "../context/sidebar_contex";
import { useGlobalContext } from "../context/user_context";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import styled from "styled-components";
import { Sidebar } from ".";
import { Navigate } from "react-router-dom";

function Navbar() {
  const [showLogout, setShowLogout] = useState(false);
  const { openSidebar } = useSidebarContext();
  const { user, logout } = useGlobalContext();

  return (
    <>
      {!user && <Navigate to="/"></Navigate>}
      <Wrapper>
        <Sidebar />
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);

  .nav-center {
    display: flex;
    width: 50vw;
    align-items: center;
    justify-content: space-between;
  }

  .btn-container {
    position: relative;
    left: 35rem;
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
    .nav-center {
      width: 90%;
    }
    .logo-text {
      display: block;
    }
  }
`;

export default Navbar;
