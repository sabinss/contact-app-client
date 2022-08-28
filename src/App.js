import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Login, Dashboard } from "./pages";
import { Fragment } from "react";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { AddContact } from "./pages/AddContact";
import { EditContact } from "./pages/EditContact";
import Signup from "./pages/Signup";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { getLoggedInUser } from "./helper/strings";

function App() {
  const user = getLoggedInUser() ?? null;
  return (
    <Provider store={store}>
      <ToastContainer />
      <Fragment>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute user={user}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route exact path="/add-contact" element={<AddContact />} />
          <Route exact path="/edit-contact/:id" element={<EditContact />} />
        </Routes>
      </Fragment>
    </Provider>
  );
}

export default App;
