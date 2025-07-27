import { useState } from "react";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import MailBox from "./components/MailBox.jsx";
import SentBox from "./components/SentBox.jsx";
import Inbox from "./components/Inbox.jsx"
import "./App.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MailBox />} />
        <Route path="/sent" element={<SentBox />}></Route>
        <Route path="/inbox" element={<Inbox />}></Route>
      </Routes>
    </>
  );
}

export default App;
