import { useEffect, useState } from "react";
import { addDoc, getDocs, collection } from "firebase/firestore";
import { dbService } from "fbase";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);

  const getSweets = async () => {
    const dbSweets = await getDocs(collection(dbService, "sweets"));
    dbSweets.forEach((document) => {
      const sweetObject = { ...document.data(), id: document.id };
      setSweets((prev) => [sweetObject, ...prev]);
    });
  };

  useEffect(() => {
    getSweets();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDoc(collection(dbService, "sweets"), {
      text: sweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
    });
    setSweet("");
  };

  const onChange = (event) => {
    event.preventDefault();
    const {
      target: { value },
    } = event;
    setSweet(value);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          value={sweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="Sweet" />
      </form>
      <div>
        {sweets.map((sweet) => (
          <div key={sweet.id}>
            <h4>{sweet.text}</h4>
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
