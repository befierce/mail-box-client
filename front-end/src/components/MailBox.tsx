import { FormEvent, useRef } from "react";
import { Link } from "react-router-dom";
import "./MailBox.css";

const MailBox = () => {
  const receiverRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  const sendMailHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const recieverEmail = receiverRef.current?.value;
    const subject = subjectRef.current?.value;
    const body = bodyRef.current?.value;
    const data = { subject, body, recieverEmail };
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:3000/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log(resData);

    if (response.ok) {
      if (receiverRef.current) receiverRef.current.value = "";
      if (subjectRef.current) subjectRef.current.value = "";
      if (bodyRef.current) bodyRef.current.value = "";

      console.log("Cleared values:");
      console.log("Receiver:", receiverRef.current?.value);
      console.log("Subject:", subjectRef.current?.value);
      console.log("Body:", bodyRef.current?.value);
    }
  };

  return (
    <>
      <header className="header">
        <Link to="/home">home</Link>
        <Link to="/inbox">Inbox</Link>
        <Link to="/sent">Sent</Link>  
        <Link to="/logout">logout</Link>
      </header>

      <form className="mail-form" onSubmit={sendMailHandler}>
        <label>To:</label>
        <input type="email" ref={receiverRef} required />

        <label>Subject:</label>
        <input type="text" ref={subjectRef} required />

        <label>Body:</label>
        <textarea ref={bodyRef} required />

        <button type="submit">Send</button>
      </form>
    </>
  );
};

export default MailBox;
