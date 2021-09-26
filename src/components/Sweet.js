import { dbService } from "fbase";
import { doc, deleteDoc } from "@firebase/firestore";

const Sweet = ({ sweetObj, isOwner }) => {
  const onDeleteClick = () => {
    const ok = window.confirm("삭제할거임?");
    console.log(ok);
    if (ok) {
      console.log(sweetObj.id);
      deleteDoc(doc(dbService, "sweets", sweetObj.id));
      //   console.log(data);
    }
  };

  return (
    <div>
      <h4>{sweetObj.text}</h4>
      {isOwner && (
        <>
          <button onClick={onDeleteClick}>Delete Sweet</button>
          <button>Edit Sweet</button>
        </>
      )}
    </div>
  );
};

export default Sweet;
