import {Component} from "react";
import Header from "../../widgets/header/header";
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home/home";
import ErrorPage from "../../pages/error-page/error-page";
import './layout.scss';
import UsersGrid from "../../pages/users-grid/users-grid";
import Form from "../../pages/form/form";
import User from "../../pages/user/user";
import OrdersGrid from "../../pages/orders-grid/orders-grid";
import ProductsGrid from "../../pages/products-grid/products-grid";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/usersGrid" element={<UsersGrid />} />
            <Route path="/productsGrid" element={<ProductsGrid />} />
            <Route path="/ordersGrid" element={<OrdersGrid />} />
            <Route path="/form" element={<Form />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </>
    )
  }
}