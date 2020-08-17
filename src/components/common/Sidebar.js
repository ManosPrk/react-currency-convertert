import React from "react";
import "../../css/common/SideBar.css";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const activeStyle = { color: "#F15B2A" };

  return (
    <div className="side-bar shadow p-3">
      <ul className="nav flex-column">
        <li className="nav-item">
          <NavLink to="/" activeStyle={activeStyle} exact>
            Home
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/currencies" activeStyle={activeStyle} exact>
            Manage Currencies
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/rates" activeStyle={activeStyle} exact>
            Manage Rates
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
