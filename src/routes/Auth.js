import { authService, firebaseInstance } from "fbase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faGoogle,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import logo from "../clock.jpg";

const Auth = (userObj) => {
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
      // provider = new firebaseInstance.auth.GithubAuthProvider();
      // setEmail("anonymous");
      // setPassword("anonymous");
      window.alert("마감시간이 촉박해서 구현을 못했다 흑흑");
      window.location.reload();
    }
    // const data = await signInWithPopup(authService, provider);
    const data = await signInWithPopup(authService, provider);

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
        updateProfile(userObj, { displayName: "익명" });
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
    <div className="authContainer">
      <img src={logo} style={{ marginBottom: 30, width: "8%" }} />
      <form onSubmit={onSubmit} className="container">
        <input
          name="email"
          type="email"
          placeholder="이메일"
          required
          value={email}
          onChange={onChange}
          className="authInput"
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          value={password}
          onChange={onChange}
          className="authInput"
        />
        <input
          type="submit"
          value={newAccount ? "회원가입" : "로그인"}
          className="authInput authSubmit"
        />
        {error && <span className="authError">{error}</span>}
      </form>
      <button onClick={toggleAccount} className="authSwitch">
        {newAccount
          ? "이미 비밀번호가 있으신가요? 로그인"
          : "에브리선달이 처음이신가요? 회원가입"}
      </button>
      <div className="authBtns">
        <button onClick={onSocialClick} name="google" className="authBtn">
          Google로 로그인 <FontAwesomeIcon icon={faGoogle} />
        </button>
        <button onClick={onSocialClick} name="anonymous" className="authBtn">
          익명으로 시작하기
        </button>
      </div>
    </div>
  );
};

export default Auth;
