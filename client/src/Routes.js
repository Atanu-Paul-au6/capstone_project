import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/landing/Home";
import Menu from "./components/landing/Menu";
import PrivateRoute from "./api_request/PrivateRoutes";
import Dashboard from "./components/user/UserDashboard";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
