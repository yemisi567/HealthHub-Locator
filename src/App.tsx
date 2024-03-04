import * as React from "react";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HopsitalList from "./components/HopitalList/Hospital";
import { Home } from "./components/landing-page/home";
import SiginUpPage from "./components/auth/SignUp";
import LoginPage from "./components/auth/Login";
import { RequireAuth } from "./components/utils/RequireAuth";

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SiginUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/hospital"
          element={
            <RequireAuth>
              <HopsitalList />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
