import {Component} from "react";
import Header from "../../widgets/Header";
import {Route, Routes} from "react-router-dom";
import Home from "../../pages/home/home";
import ErrorPage from "../../pages/error-page/error-page";
import './layout.scss';
import Grid from "../../pages/grid/grid";
import Form from "../../pages/form/form";
import User from "../../pages/user/user";

export default class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/grid" element={<Grid />} />
            <Route path="/form" element={<Form />} />
            <Route path="/user" element={<User />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </main>
      </>
    )
  }
}