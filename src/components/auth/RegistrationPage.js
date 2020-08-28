import React, { useState } from "react";
import PropTypes from "prop-types";
import { registerRequest } from "../../redux/actions/authenticationActions";
import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { toast } from "react-toastify";

function RegistrationPage({
  registerRequest,
  authentication,
  history,
  ...props
}) {
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
    const { username, password, email } = user;
    const errors = {};

    if (!username) errors.username = "username is required";
    if (!password) errors.password = "password is required";
    if (!password) errors.email = "email is required";

    setErrors(errors);

    return Object.keys(errors).length === 0;
  }

  function submitForm(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    registerRequest(user)
      .then(() => {
        toast.success("Account successfully created, please login");
        history.push("/login");
      })
      .catch((e) => console.log(e));
  }

  return (
    <div id="login-wrapper" className="content-wrapper">
      <div id="login-container" className="content-container">
        <LoginForm
          user={user}
          handleSubmit={submitForm}
          onChange={handleOnChange}
          register
        />
      </div>
    </div>
  );
}

RegistrationPage.propTypes = {};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  registerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
