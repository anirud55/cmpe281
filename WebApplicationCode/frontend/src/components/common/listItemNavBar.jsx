import React from "react";
import { NavLink } from "react-router-dom";

const ListItemNabBar = ({ iconClass, label, path }) => {
  iconClass = iconClass + " fa-navbar-icons";
  return (
    <li className="nav-item px-3 text-nowrap" style={{ padding: "5px 15px" }}>
      <i className={iconClass} aria-hidden="true"></i>

      <NavLink
        className="nav-link"
        style={{ float: "right", padding: "0px" }}
        to={path}
      >
        {label}
      </NavLink>
    </li>
  );
};

export default ListItemNabBar;
