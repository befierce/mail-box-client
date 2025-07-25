import { FormEvent, FormEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);
  const navigate = useNavigate();
  const formInputHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const enteredEmail = emailRef.current?.value;
    const enteredPassword = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (enteredPassword !== confirmPassword) {
      setPasswordMatch(false);
      window.alert("password dont match");
      return;
    }

    const enteredUserData = { enteredEmail, enteredPassword };
    try {
     
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(enteredUserData),
      });
      const data = await response.json();
      // const
      const token: string = data.token;
      // localStorage.setItem("token", token);
      navigate("./login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={formInputHandler}>
        <label>email</label>
        <input ref={emailRef}></input>
        <br />
        <label>password</label>
        <input ref={passwordRef}></input>
        <br />
        <label>confirm password</label>
        <input ref={confirmPasswordRef}></input>
        <br />
        <button>signup</button>
      </form>
    </>
  );
};

export default Signup;
