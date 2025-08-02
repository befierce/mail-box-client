import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SentBox.css";
import { useNavigate } from "react-router-dom";
const SentBox = () => {
  const [emails, setEmails] = useState<any[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<any>(null);
  // const [highlightEmail, highlightSelectedEmail] = useState<any>(null);
  const navigate = useNavigate();
  const logOutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        `https://mail-box-client-bs8o.onrender.com/user/sent/delete/mail/${userMail}`,
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
  const emailOpener = async (index: number) => {
    console.log("email clicked");
    const id = emails[index]._id;
    const emailOfSender = emails[index].senderId;
    console.log(".../", emailOfSender);
    setSelectedEmail(emails[index]);
    const token = localStorage.getItem("token");
    const response = await fetch(
      `https://mail-box-client-bs8o.onrender.com/user/selected/email/sender/${emailOfSender}`,
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
        i === index ? { ...email, isReadBySender: true } : email
      )
    );
  };
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.alert("please login first");
        navigate("/");
      }
      const res = await fetch("https://mail-box-client-bs8o.onrender.com/get/sentbox/emails", {
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



  }, []);

  return (
    <>
      <header className="header">
        <Link to="/home">home</Link>
        <Link to="/inbox">inbox</Link>
        <Link to="/" onClick={logOutHandler}>
          logout
        </Link>
      </header>

      <div>
        <h2>Sent Emails</h2>
        <div className="box-outer">
          <div className="mail-box">
            <ul>
              {emails.map((mail, index) => (
                <li
                  key={mail._id}
                  onClick={() => emailOpener(index)}
                  className={mail.isReadBySender ? "selected" : ""}
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
