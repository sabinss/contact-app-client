import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Route, Routes } from "react-router-dom";

import { Login, Dashboard } from "./pages";
import { Fragment } from "react";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { AddContact } from "./pages/AddContact";
import { EditContact } from "./pages/EditContact";

function App() {
  return (
    <Provider store={store}>
      <Fragment>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/add-contact" element={<AddContact />} />
          <Route exact path="/edit-contact/:id" element={<EditContact />} />
        </Routes>
      </Fragment>
    </Provider>
  );
}

export default App;
