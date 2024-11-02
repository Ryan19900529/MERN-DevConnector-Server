import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
// Redux
import { Provider } from "react-redux";
import store from "./redux/store";

import "./App.css";

const App = () => (
  <Provider store={store}>
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
  </Provider>
);
export default App;
