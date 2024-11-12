import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import setAuthToken from "./utils/setAuthToken";
import { useDispatch } from "react-redux";
import { loadUser } from "./redux/auth";
import RoutesCollection from "./components/routing/RoutesCollection";
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
      <>
        <Navbar />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='*' element={<RoutesCollection />} />
        </Routes>
      </>
    </Router>
  );
};
export default App;
