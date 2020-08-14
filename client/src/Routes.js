import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/landing/Home";
import Menu from "./components/landing/Menu";
import PrivateRoute from "./api_request/PrivateRoutes";
import AdminRoute from "./api_request/AdminRoute";
import Dashboard from "./components/user/UserDashboard";
import AdminDashboard from "./components/user/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
