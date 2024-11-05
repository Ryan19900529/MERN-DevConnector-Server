import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./redux/auth";
// Redux
import { useDispatch } from "react-redux";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
        <section className='container'>
          <Alert />
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
          </Routes>
        </section>
      </Fragment>
    </Router>
  );
};
export default App;
