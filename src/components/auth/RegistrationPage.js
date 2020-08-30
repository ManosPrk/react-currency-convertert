import React, { useState } from "react";
import PropTypes from "prop-types";
import { registerRequest } from "../../redux/actions/authenticationActions";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import UserForm from "./UserForm";

function RegistrationPage({ registerRequest, history }) {
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
    const { username, password, email } = user;
    const errors = {};

    if (!username) errors.username = toast.warn("username is required");
    if (!password) errors.password = toast.warn("password is required");
    if (!email) errors.password = toast.warn("email is required");

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
        <UserForm
          user={user}
          handleSubmit={submitForm}
          onChange={handleOnChange}
          register
        />
      </div>
    </div>
  );
}

RegistrationPage.propTypes = {
  registerRequest: PropTypes.func,
  history: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    authentication: state.authentication,
  };
}

const mapDispatchToProps = {
  registerRequest,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationPage);
