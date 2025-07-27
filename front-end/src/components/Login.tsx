import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; 

const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const data = { email, password };
    console.log(data);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data1 = await response.json();
        console.log("token aya ki nhi", data1);
        localStorage.setItem("token", data1.token);
        navigate("/home");
      } else {
        window.alert("Invalid credentials");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="login-form" onSubmit={formSubmitHandler}>
      <h2>Login</h2>
      <label>Email</label>
      <input type="email" ref={emailRef} required />

      <label>Password</label>
      <input type="password" ref={passwordRef} required />

      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
