import {Route, Routes} from "react-router-dom";
import App from "../App";
import { Component } from "react";

export default class AllRoutes extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<App />} />
      </Routes>

    )
  }
}