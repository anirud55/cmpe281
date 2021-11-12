import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "../../services/authService";

const AdminRoute = ({ path, component: Component, render, ...rest }) => {
  const user = auth.getCurrentUser();

  return (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        if (user && user.isadmin)
          return Component ? <Component {...props}></Component> : render(props);
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          ></Redirect>
        );
      }}
    ></Route>
  );
};

export default AdminRoute;
