import React, { useState } from "react";
import styled from "styled-components";
import { useSidebarContext } from "../context/sidebar_contex";
import { useGlobalContext } from "../context/user_context";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Content() {
  const [showLogout, setShowLogout] = useState(false);
  const { openSidebar } = useSidebarContext();
  const { user, logout } = useGlobalContext();

  return (
    <Wrapper1>
      <div className="section-center full-page">
        <div className="container page">
          {/* info */}
          <div>
            <h1>
              <b>Welcome To NoEntry Access Control Portal</b>
            </h1>
            <p className="coffee-info">
              Authorization is the process of determining what actions a user
              can perform on a web app, based on their identity and role. It
              usually involves defining some rules or policies that specify
              which resources and operations are allowed or forbidden for
              different users or groups. For example, a web app may have
              different roles, such as admin, editor, and viewer, and each role
              may have different permissions, such as create, update, delete, or
              read data. Authorization can be implemented in different ways,
              such as using access control lists (ACLs), role-based access
              control (RBAC), or attribute-based access control (ABAC).
            </p>
            <br />
            <Link to="/dashboard/users" className="btn btn-hero">
              Manage Credentials
            </Link>
          </div>
        </div>
      </div>
    </Wrapper1>
  );
}

const Wrapper1 = styled.section`
  width: -60vw;
  .header h2 {
    margin-bottom: 2rem;
  }
  padding: 5rem 0;
  background: var(--clr-white);
  .sub-title {
    padding: 3rem 0;
    color: var(--clr-grey-4);
  }
  
  .background-blur {
    filter: blur(3px);
  }
  .disabledCursor {
    cursor: default;
  }
  h3,
  h4 {
    color: var(--clr-grey-2);
  }
  padding: 5rem 0;

  background: var(--clr-grey-10);

  .header h3 {
    margin-bottom: 2rem;
  }
  p {
    margin-bottom: 0;
    line-height: 1.8;
    color: var(--clr-grey-7);
  }
  @media (min-width: 700px) {
    .header {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 576px) {
    .services-center {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
  @media (min-width: 700px) {
    padding: 0;
    .section-center {
      transform: translateY(5rem);
    }
  }
`;

export default Content;
