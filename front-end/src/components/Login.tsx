import { FormEvent } from "react";
import { useRef } from "react";
const Login = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const formSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const data = { email, password };
    console.log(data);
    localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const data1 = await response.json();
      localStorage.setItem("token", data1.token);
      console.log(data1);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <label>email</label>
        <input ref={emailRef}></input>
        <label>password</label>
        <input ref={passwordRef}></input>
        <button>login</button>
      </form>
    </>
  );
};

export default Login;
