import { useState } from "react";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import MailBox from "./components/MailBox.jsx";
import "./App.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path= "/mailbox" element ={<MailBox/>}/>
      </Routes>
    </>
  );
}

export default App;
