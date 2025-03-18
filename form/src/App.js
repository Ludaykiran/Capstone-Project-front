import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import ViewTrends from "./ViewTrends";
import LogWorkout from "./LogWorkout";
import Signup from "./SignUp";
import ProtectedRoute from "./ProtectedRoute";
import { Provider } from "react-redux";
import { store } from "./Store/store";
import TrackCalories from "./TrackCalories";
import Tutorials from "./Tutorials";
import Dashboard from "./Dashboard";
const App = () => {
  
  const [isAuthenticated, setAuthentication] = useState(
    localStorage.getItem("authToken") ? true : false
  );

  const userLogin = () => {
    localStorage.setItem("authToken", "your-jwt-token"); 
    setAuthentication(true);
  };

  const userLogout = () => {
    localStorage.removeItem("authToken"); 
    setAuthentication(false);
  };

  return (
    <Router>
      <Main isAuthenticated={isAuthenticated} userLogin={userLogin} userLogout={userLogout} />
    </Router>
  );
};

const Main = ({ isAuthenticated, userLogin, userLogout }) => {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"]; // Hide navbar on these pages

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar userLogout={userLogout} />}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login login={userLogin} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/ViewTrends" element={<ViewTrends />} />

        {/* 🔹 Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/LogWorkout" element={<LogWorkout />} />
          <Route path="/TrackCalories" element={<TrackCalories />} />
          <Route path="/Tutorials" element={<Tutorials/>}/>
          <Route path="/Dashboard" element={<Dashboard/>}/>
        </Route>
      </Routes>
    </>
  );
};

export default App;
