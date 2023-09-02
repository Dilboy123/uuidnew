import { useState, useEffect } from "react";
import styled from "styled-components";
import { Navigate } from "react-router-dom";
import { useGlobalContext } from "../context/user_context";
import { Logo } from "../components";
import FormRow from "../components/FormRow";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate=useNavigate()
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    isMember: false,
  });

  const { user, register, login, isLoading, showAlert } = useGlobalContext();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if (isMember) {
      login({ email, password });
    } else {
      register({ name, email, password });
    }
  };

  return (
    <>
      {user && <Navigate to="/dashboard" />}
      <Wrapper className="page full-page">
        <div className="container">
          {showAlert && (
            <div className="alert alert-danger">Invalide Login Credentials</div>
          )}
          <form className="form" onSubmit={onSubmit}>
            <Logo />
            <div className="title">
              <h4>Login</h4>
            </div>
            {/* name field */}
            {!values.isMember && (
              <FormRow
                type="name"
                name="name"
                value={values.name}
                handleChange={handleChange}
              />
            )}

            {/* single form row */}
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            {/* single form row */}
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />
            {/* end of single form row */}
            <button
              type="submit"
              className="btn btn-block"
              disabled={isLoading}
            >
              {isLoading ? "Fetching User..." : "Sign up"}
            </button>

            <button
              className="btn btn-block"
              disabled={isLoading}
              onClick={()=>{
                navigate('/login'); 
              }}
            >
             Already have account? Login here
            </button>
          </form>
        </div>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 2rem;
  }
  .form {
    max-width: 500px;
    border-top: 6px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
`;
export default Register;
