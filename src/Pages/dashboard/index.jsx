import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Content, Sidebar, Header } from "../../components";
import styled from "styled-components";
import { Routes, Route, Link } from "react-router-dom";
import './style.scss'

function Dashboard() {
  return (
    <Wrapper>
      <Header />
      <div className="dashboard-page">
        <Sidebar />
        <div style={{ margin: 10 }}>
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .dashboard {
    display: flex;
  }
  .dashboard-page {
    display: flex;
    padding: 0;
  }
  @media (min-width: 992px) {
    .dashboard {
      grid-template-columns: auto 1fr;
    }
    .dashboard-page {
      width: 90%;
    }
  }
`;

export default Dashboard;
