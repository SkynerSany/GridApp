import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from "react-router";
import Layout from "./app/layout/Layout";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Layout/>
      </BrowserRouter>
  </React.StrictMode>
);
