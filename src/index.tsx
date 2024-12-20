import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {BrowserRouter} from "react-router";
import Layout from "./app/layout/Layout";
import {Provider} from "react-redux";
import store from "./app/redux/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>

    <BrowserRouter>
      <Provider store={store}>
        <Layout/>
      </Provider>
    </BrowserRouter>

  </React.StrictMode>
);
