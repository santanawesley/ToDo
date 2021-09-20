import React from "react";
import ReactDOM from "react-dom";
import Routes from './main/routes';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { Store } from './store';
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <Routes />
      <ToastContainer />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
