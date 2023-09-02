import main from "../assets/images/main.png";
import styled from "styled-components";
import { Logo } from "../components";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context/user_context";
import { Navigate } from "react-router-dom";

const Landing = () => {

  const { user } = useGlobalContext();
  return (
    <>
    {user && <Navigate to="/dashboard" />} <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/* info */}
        <div className="info">
          <h1>
            Access <span>Control</span> Mechanisam
          </h1>
          <p>
            UUID-based access control is a method of controlling access to
            resources or systems based on Universally Unique Identifiers
            (UUIDs).
          </p>
          <Link to="/login" className="btn btn-hero">
            Login
          </Link>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper></>
  );
};

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`;

export default Landing;
