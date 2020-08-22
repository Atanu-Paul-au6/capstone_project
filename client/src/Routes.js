import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./components/user/Register";
import Login from "./components/user/Login";
import Home from "./components/landing/Home";
import Menu from "./components/landing/Menu";
import PrivateRoute from "./api_request/PrivateRoutes";
import AdminRoute from "./api_request/AdminRoute";
import Dashboard from "./components/user/UserDashboard";
import Profile from "./components/user/Profile";
import AdminDashboard from "./components/user/AdminDashboard";
import AddCategory from "./components/admin/AddCategory";
import AddProduct from "./components/admin/AddProduct";
import ShowAllOrders from "./components/admin/ShowAllOrders";
import Shop from "./components/landing/ShopPage";
import ProductDetails from "./components/product/ProductDetails";
import Cart from "./components/landing/Cart";

const Routes = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/register" exact component={Register} />
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <PrivateRoute path="/profile/update/:userId" exact component={Profile} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <AdminRoute path="/order/list" exact component={ShowAllOrders} />
        <Route path="/product/:productId" exact component={ProductDetails} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
