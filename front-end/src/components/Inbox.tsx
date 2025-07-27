
import { Link } from "react-router-dom";

const Inbox = () => {
  return (
    <>
      <header className="header">
        <Link to="/home">home</Link>
        <Link to="/sent">sentbox</Link>
      </header>
      dummy email
    </>
  );
};

export default Inbox;
