import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTractor } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import anony from "../anony.png";

const Sweet = ({ sweetObj, isOwner, creatorId }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

  // const tlrks = (ts) => {
  //   var date = new Date(ts);
  //   return date;
  // };

  const onDeleteClick = () => {
    const ok = window.confirm("삭제할거임?");
    console.log(ok);
    if (ok) {
      console.log(sweetObj.id);
      deleteDoc(doc(dbService, "sweets", sweetObj.id));
    }
  };

  const toggleEditing = () => setEditing((prev) => !prev);

  const onChange = (e) => {
    const {
      target: { value },
    } = e;
    setNewSweet(value);
  };

  const onSubmit = (e) => {
    console.log("eho");
    e.preventDefault();
    // if ((sweet = "")) {
    //   return;
    // }
    updateDoc(doc(dbService, "sweets", sweetObj.id), { text: newSweet });
    setEditing(false);
  };

  return (
    <div className="nweet">
      {editing ? (
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginBottom: "20px",
              justifyContent: "space-between",
            }}
          >
            <button onClick={toggleEditing} className="formBtn cancelBtn">
              x
            </button>
            <input
              type="submit"
              value="완료"
              className="factoryInput__arrow"
              onClick={onSubmit}
            />
          </div>
          <form onSubmit={onSubmit} className="container nweetEdit">
            <input
              onChange={onChange}
              value={newSweet}
              required
              placeholder="수정하던가"
              autoFocus
              className="forInput"
            />
          </form>
        </div>
      ) : (
        <div className="didi">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "15px",
            }}
          >
            <div className="profile"></div>
            익명
          </div>
          <h4>{sweetObj.text}</h4>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "20px",
            }}
          >
            <span style={{ color: "grey", fontSize: "0.8em" }}>
              {creatorId}
            </span>
            {isOwner && (
              <div className="nweet__actions">
                <span onClick={onDeleteClick}>
                  <FontAwesomeIcon icon={faTrash} color="#c92718" />
                </span>
                <span onClick={toggleEditing}>
                  <FontAwesomeIcon icon={faPencilAlt} color="#05AAFF" />
                </span>
              </div>
            )}
          </div>
        </div>
      )}
      <hr align="center" width="100%" size="100%" color="whitesmoke" />
    </div>
  );
};

export default Sweet;
