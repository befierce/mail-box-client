import { FormEvent, useRef } from "react";

const MailBox = () => {
  const receiverRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null); // use correct type

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
  };

  return (
    <form onSubmit={sendMailHandler}>
      <label>To:</label>
      <input type="email" ref={receiverRef} required />
      <label>Subject:</label>
      <input type="text" ref={subjectRef} required />
      <label>Body:</label>
      <textarea ref={bodyRef} required />
      <button type="submit">Send</button>
    </form>
  );
};

export default MailBox;
