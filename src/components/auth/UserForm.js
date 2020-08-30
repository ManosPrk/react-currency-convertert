import React from "react";
import PropTypes from "prop-types";
import "../../css/UserForm.css";

function UserForm({ user, handleSubmit, onChange, register }) {
  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        {register ? (
          <h3>
            Register Or{" "}
            <a className="login-form-link text-warning" href="/login">
              SignIn
            </a>
          </h3>
        ) : (
          <h3>
            Sign In Or{" "}
            <a className="login-form-link text-warning" href="/registration">
              Register
            </a>
          </h3>
        )}

        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            name="username"
            value={user.username}
            className="form-control"
            placeholder="Enter username"
            onChange={onChange}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            className="form-control"
            placeholder="Enter password"
            onChange={onChange}
          />
        </div>

        {register && (
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              className="form-control"
              placeholder="Enter email"
              onChange={onChange}
            />
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block">
          Submit
        </button>
      </form>
    </div>
  );
}

UserForm.propTypes = {
  handleSubmit: PropTypes.func,
  user: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  register: PropTypes.bool,
};

export default UserForm;
