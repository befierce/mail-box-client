import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Inbox.css";
const Inbox = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("token");
    window.alert("logout success");
  };

  const pollNewEmails = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("https://mail-box-client-bs8o.onrender.com/user/mails/new", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `bearer ${token}`,
      },
    });

    const newEmails = await response.json();

    setEmails((prevEmails) => [...newEmails, ...prevEmails]);
  };

  const emailOpener = async (index: number) => {
    console.log("email clicked");
    const id = emails[index]._id;
    const emailOfReciever = emails[index].receiverId;
    console.log(".../", emailOfReciever);
    setSelectedEmail(emails[index]);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://mail-box-client-bs8o.onrender.com/user/selected/email/reciever/${emailOfReciever}`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    setEmails((prev) =>
      prev.map((email, i) =>
        i === index ? { ...email, isReadByReciever: true } : email
      )
    );
  };
  const deleteMailHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    const email = emails[index].receiverId;
    const id = emails[index]._id;
    console.log("emeail   ...", email);
    console.log("_id   ...", id);
    try {
      const response = await fetch(
        `https://mail-box-client-bs8o.onrender.com/user/reciever/delete/mail/${email}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );
      if (response.ok) {
        setEmails((prev) => prev.filter((mail) => mail._id != id));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.alert("please login first");
        navigate("/");
      }
      const res = await fetch("https://mail-box-client-bs8o.onrender.com/get/inbox/emails", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEmails(data.reverse());
    };

    fetchData();

    if (token) {
      const intervalId = setInterval(pollNewEmails, 2000);

      return () => clearInterval(intervalId);
    }
  }, []);
  return (
    <>
      <header className="header">
        <Link to="/home">home</Link>
        <Link to="/sent">sentbox</Link>
        <Link to="/" onClick={logOutHandler}>
          logout
        </Link>
      </header>
      <div>
        <h2>inbox</h2>
        <div className="box-outer">
          <div className="mail-box">
            <ul>
              {emails.map((mail, index) => (
                <li
                  key={mail._id}
                  onClick={() => emailOpener(index)}
                  className={mail.isReadByReciever ? "selected" : ""}
                >
                  <strong>from:</strong> {mail.senderId}
                  <br />
                  <strong>Subject:</strong> {mail.subject}
                  <br />
                  <strong>Body:</strong> {mail.body}
                  <button
                    className="delete-mail"
                    onClick={(e) => {
                      deleteMailHandler(e, index);
                    }}
                  >
                    delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="complete-email">
            {selectedEmail ? (
              <div>
                <p>
                  <strong>To:</strong> {selectedEmail.receiverId}
                </p>
                <p>
                  <strong>Subject:</strong> {selectedEmail.subject}
                </p>
                <p>
                  <strong>Body:</strong> {selectedEmail.body}
                </p>
                <p>
                  <strong>Sent At:</strong>{" "}
                  {new Date(selectedEmail.sentAt).toLocaleString()}
                </p>
              </div>
            ) : (
              <p>Click on an email to view its content</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inbox;
