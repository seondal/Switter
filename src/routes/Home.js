import { useEffect, useState } from "react";
import { addDoc, getDocs, onSnapshot, collection } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "components/Sweet";

const Home = ({ userObj }) => {
  console.log(userObj);
  const [sweet, setSweet] = useState("");
  const [sweets, setSweets] = useState([]);

  // const getSweets = async () => {
  //   const dbSweets = await getDocs(collection(dbService, "sweets"));
  //   dbSweets.forEach((document) => {
  //     const sweetObject = { ...document.data(), id: document.id };
  //     setSweets((prev) => [sweetObject, ...prev]);
  //   });
  // };

  useEffect(() => {
    // getSweets();
    onSnapshot(collection(dbService, "sweets"), (snapshot) => {
      const newArray = snapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
      }));
      setSweets(newArray);
    });
  }, []);

  // collection("nweets").onSnapshot((snpashot) => {
  //   const newArray = snapshot.docs.map((document) => ({
  //     id: document.id,
  //     ...document.data(),
  //   }));
  //   setSweets(newArray);
  // });

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
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
