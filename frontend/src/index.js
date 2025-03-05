/* eslint-disable react/jsx-no-undef */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import LandingPage from "./pages/landing";
import Authentication from "./pages/Authentication";
import VideoMeetComponent from "./pages/VideoMeet";
import HomeComponent from "./pages/Home";
import History from "./pages/History";
import { AuthProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
   <AuthProvider>
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/auth" element={<Authentication />} />

      <Route path="/home" s element={<HomeComponent />} />
      <Route path="/history" element={<History />} />
      <Route path="/:url" element={<VideoMeetComponent />} />
    </Routes>
    </AuthProvider>
  </BrowserRouter>
);
