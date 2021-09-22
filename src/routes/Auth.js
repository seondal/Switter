import { authService, firebaseInstance } from "fbase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");
  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === "google") {
      provider = new GoogleAuthProvider();
    } else if (name === "anonymous") {
      provider = new firebaseInstance.auth.GithubAuthProvider();
    }
    // const data = await signInWithPopup(authService, provider);
    const data = await authService.signInWithPopup(provider);

    console.log(data);
  };

  const onChange = (event) => {
    const {
      target: { name, value },
    } = event;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault(); //새로고침 방지
    try {
      let data;
      if (newAccount) {
        //create newAccount
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        //log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "Sign In" : "Create Account"}
      </button>
      <button onClick={onSocialClick} name="google">
        Google로 시작하기
      </button>
      <button onClick={onSocialClick} name="anonymous">
        익명으로 시작하기
      </button>
    </div>
  );
};

export default Auth;
