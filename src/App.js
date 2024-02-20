// App.js

import React, {useState} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPage";
import MainPage from "./MainPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (value) => {
    setIsLoggedIn(value);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage isLoggedIn={isLoggedIn} handleLogin={handleLogin}/>}/>
        <Route path="/login" element={<LoginPage handleLogin={handleLogin}/>}/>
        <Route path="/signup" element={<SignupPage/>}/>
      </Routes>
    </Router>
  );
};

export const BACKEND_URL = "https://single-page-application-backend.onrender.com";

export default App;
