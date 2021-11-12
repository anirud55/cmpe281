import React from "react";
import { Link } from "react-router-dom";
import auth from "../services/authService";
import ListItemNavBar from "./common/listItemNavBar";
import "../styles/navbar.css";

const NavBar = () => {
  const user = auth.getCurrentUser();

  return (
    <nav
      className="navbar navbar-dark fixed-top flex-md-nowrap p-10 shadow navbar-expand-md bg-info"
      // style={{ backgroundColor: "#6930c3" }}
    >
      <Link className="navbar-brand col-sm-3 col-md-2 mr-0" to="/">
        AVCloud
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav px-3">
          {user && user.isadmin && (
            <ListItemNavBar
              iconClass="fa fa-bar-chart"
              label="Dashboard"
              path="/dashboard"
            ></ListItemNavBar>
          )}
          {user && !user.isadmin && (
            <React.Fragment>
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="Dashboard"
                path="/mystatus"
              ></ListItemNavBar>
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="My Plan"
                path="/myplan"
              ></ListItemNavBar>
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="View Rides History"
                path="/myRides"
              ></ListItemNavBar>
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="Schedule a Ride"
                path="/mySchedule"
              ></ListItemNavBar>
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="My Vehicles"
                path="/myVehicles"
              ></ListItemNavBar>
              <ListItemNavBar
                iconClass="fa fa-list-alt"
                label="Add a Vehicle"
                path="/myVehicles/addVehicle"
              ></ListItemNavBar>
            </React.Fragment>
          )}
        </ul>
        <ul className="navbar-nav px-3 ml-auto">
          {!user && (
            <React.Fragment>
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Login"
                path="/login"
              ></ListItemNavBar>
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Register"
                path="/register"
              ></ListItemNavBar>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <ListItemNavBar
                iconClass="fa fa-user-circle-o"
                label={"Welcome, " + user.name}
                path="/"
              ></ListItemNavBar>
              <ListItemNavBar
                iconClass="fa fa-sign-out"
                label="Log Out"
                path="/logout"
              ></ListItemNavBar>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
