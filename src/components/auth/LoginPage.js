import React, { useState } from "react";
import "../../css/LoginPage.css";
import PropTypes from "prop-types";
import { loginRequest } from "../../redux/actions/authenticationActions";
import { connect } from "react-redux";
import UserForm from "./UserForm";
import { toast } from "react-toastify";

function LoginPage({ loginRequest, history }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

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

    if (!username) errors.username = toast.warn("username is required");
    if (!password) errors.password = toast.warn("password is required");

    return Object.keys(errors).length === 0;
  }

  function submitForm(event) {
    event.preventDefault();
    if (!formIsValid()) return;

    loginRequest(user)
      .then(() => history.push("/"))
      .catch((e) => toast.error(e.message));
  }

  return (
    <div id="login-wrapper" className="content-wrapper">
      <div id="login-container" className="content-container">
        <UserForm
          user={user}
          handleSubmit={submitForm}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loginRequest: PropTypes.func,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  loginRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
