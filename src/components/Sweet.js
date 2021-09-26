import { dbService } from "fbase";
import { doc, deleteDoc, updateDoc } from "@firebase/firestore";
import { useState } from "react";

const Sweet = ({ sweetObj, isOwner }) => {
  const [editing, setEditing] = useState(false);
  const [newSweet, setNewSweet] = useState(sweetObj.text);

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
    e.preventDefault();
    updateDoc(doc(dbService, "sweets", sweetObj.id), { text: newSweet });
    setEditing(false);
  };

  return (
    <div>
      {editing ? (
        <>
          <form onSubmit={onSubmit}>
            <input onChange={onChange} value={newSweet} required />
            <input type="submit" value="Update Sweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
        </>
      ) : (
        <>
          <h4>{sweetObj.text}</h4>
          {isOwner && (
            <>
              <button onClick={onDeleteClick}>Delete Sweet</button>
              <button onClick={toggleEditing}>Edit Sweet</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Sweet;
