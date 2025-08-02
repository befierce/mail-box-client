import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
  const navigate = useNavigate();

  const loginNavigator = () => {
    navigate("/login");
  };

  const formInputHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (enteredPassword !== confirmPassword) {
      setPasswordMatch(false);
      window.alert("Passwords do not match");
      return;
    }

    const enteredUserData = { enteredEmail, enteredPassword };
    try {
      const response = await fetch("https://mail-box-client-bs8o.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(enteredUserData),
      });

      const data = await response.json();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={formInputHandler}>
        <h2>Sign Up</h2>
        <label>Email</label>
        <input type="email" ref={emailRef} required />

        <label>Password</label>
        <input type="password" ref={passwordRef} required />

        <label>Confirm Password</label>
        <input type="password" ref={confirmPasswordRef} required />

        <button type="submit">Sign Up</button>
      </form>

      <div className="switch-login">
        <p>Already have an account?</p>
        <button onClick={loginNavigator}>Login</button>
      </div>
    </div>
  );
};

export default Signup;
