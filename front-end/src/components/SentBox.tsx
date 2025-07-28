import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SentBox.css";
const SentBox = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
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
