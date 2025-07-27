import { Link } from "react-router-dom";
import { useEffect } from "react";
const SentBox = () => {
    
  useEffect(() => {
    const fetchdata = async ()=>{
        const token = localStorage.getItem("token")
        const data = await fetch("http://localhost:3000/get/sentbox/emails",{
            method:"GET",
            headers:{
                "Content-type": "application/json",
                Authorization:`Bearer ${token}`
            }
        })

        console.log("data email", await data.json())
    }
    fetchdata();
  }, []);

  return (
    <>
      <header className="header">
        <Link to="/home">home</Link>
        <Link to="/inbox">inbox</Link>
      </header>
    </>
  );
};

export default SentBox;
