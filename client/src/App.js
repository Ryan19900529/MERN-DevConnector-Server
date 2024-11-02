import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Fragment } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

const App = () => (
  <Router>
    <Fragment>
      <Navbar />
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
      <section className='container'>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </section>
    </Fragment>
  </Router>
);
export default App;
