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
    <>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Display name"
          value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
