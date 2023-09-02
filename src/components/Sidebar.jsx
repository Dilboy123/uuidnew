import React from "react";
import { Logo } from ".";
import { useSidebarContext } from "../context/sidebar_contex";
import { social, links } from "../utils/links";
import styled from "styled-components";
import { Routes, Route, Link, Outlet } from "react-router-dom";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useSidebarContext();
  console.log(isSidebarOpen);
  return (
    <SidebarContainer>
      <aside
        className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}
      >
        <ul className="links">
          {links.map((link) => {
            const { id, url, text, icon } = link;
            return (
              <li key={id}>
                <Link to={url}>
                  {icon}
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }

  .logo {
    justify-self: center;
    height: 60px;
  }

  .links a {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    background: #dde6ed;
    color: #0079ff;
  }
  .links a svg {
    font-size: 1.5rem;
    color: #2c74b3;
    margin-right: 1rem;
    transition: var(--transition);
  }
  .links a:hover svg {
    color: #30a2ff;
  }
  .social-icons {
    justify-self: center;
    display: flex;
    padding-bottom: 2rem;
  }
  .social-icons a {
    font-size: 1.5rem;
    margin: 0 0.5rem;
    color: var(--clr-primary-5);
    transition: var(--transition);
  }
  .social-icons a:hover {
    color: var(--clr-primary-1);
  }

  .sidebar {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: #dbdfea;
    display: grid;
    grid-template-rows: auto 1fr auto;
    row-gap: 1rem;
    box-shadow: var(--clr-red-dark);
    transition: var(--transition);
    transform: translate(-100%);
  }
  .show-sidebar {
    transform: translate(0);
  }
  @media screen and (min-width: 676px) {
    .sidebar {
      width: 200px;
    }
  }
`;

export default Sidebar;
