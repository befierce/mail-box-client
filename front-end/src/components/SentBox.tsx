import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SentBox.css";
const SentBox = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  const deleteMailHandler = async (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    const userSentboxData = emails[index];
    const id = userSentboxData._id;
    const userMail = userSentboxData.senderId;
    console.log("delete mail id", id);
    console.log("concern user mail", userMail);
    try {
      const response = await fetch(
        `http://localhost:3000/user/delete/mail/${userMail}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id }),
        }
      );
      if (response.ok) {
        console.log("i am here");
        setEmails((prev) => prev.filter((mail) => mail._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };
  const emailOpener = (index: number) => {
    console.log("email clicked");
    setSelectedEmail(emails[index]);
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3000/get/sentbox/emails", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setEmails(data);
    };

    fetchData();
  }, []);

  return (
    <>
      <header className="header">
        <Link to="/home">home</Link>
        <Link to="/inbox">inbox</Link>
        <Link to="/logout">logout</Link>
      </header>

      <div>
        <h2>Sent Emails</h2>
        <div className="box-outer">
          <div className="mail-box">
            <ul>
              {emails.map((mail, index) => (
                <li
                  key={index}
                  onClick={() => emailOpener(index)}
                  className={selectedEmail === emails[index] ? "selected" : ""}
                >
                  <strong>To:</strong> {mail.receiverId}
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

export default SentBox;
