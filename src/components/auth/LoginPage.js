import React, { useState } from "react";
import "../../css/LoginPage.css";
import PropTypes from "prop-types";
import { loginRequest } from "../../redux/actions/authenticationActions";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";

function LoginPage({ loginRequest, authentication, history, ...props }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  function handleOnChange(event) {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  }

  function formIsValid() {
    const { username, password } = user;
    const errors = {};

    if (!username) errors.username = "username is required";
    if (!password) errors.password = "password is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function submitForm(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    loginRequest(user)
      .then(() => history.push("/"))
      .catch((e) => console.log(e));
  }

  return (
    <div id="login-wrapper" className="content-wrapper">
      <div id="login-container" className="content-container">
        <LoginForm
          user={user}
          handleSubmit={submitForm}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

LoginPage.propTypes = {};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
