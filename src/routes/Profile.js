import { authService } from "fbase";
import { useState } from "react";
import { useHistory } from "react-router";
import { updateProfile } from "@firebase/auth";

const Profile = ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

  const onLogOutClick = () => {
    authService.signOut();
    history.push("/");
  };

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewDisplayName(value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userObj.displayName != newDisplayName) {
      updateProfile(userObj, { displayName: newDisplayName });
    }
    window.location.reload();
  };

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          border: "grey solid",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h3>{userObj.displayName}님 안녕하세요!</h3>
      </div>
      <form onSubmit={onSubmit} className="profileForm">
        <div style={{ color: "gray" }}>닉네임 변경하기</div>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          autoFocus
          className="formInput"
        />
        <input
          type="submit"
          value="결정"
          className="formBtn"
          style={{ margintTop: 10 }}
        />
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        로그아웃
      </span>
    </div>
  );
};

export default Profile;
