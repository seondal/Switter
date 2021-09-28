import { useEffect, useState } from "react";
import { addDoc, getDocs, onSnapshot, collection } from "firebase/firestore";
import { dbService } from "fbase";
import Sweet from "components/Sweet";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faLeaf } from "@fortawesome/free-solid-svg-icons";

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
    if (sweet === "") {
      window.alert("내용을 입력하세요!");
      return;
    }
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
    <div className="container">
      <div
      // style={{ display: "flex", position: "sticky", top: "0" }}
      >
        <form className="factoryInput__container" onSubmit={onSubmit}>
          <div>
            <input
              value={sweet}
              onChange={onChange}
              type="text"
              placeholder="내용을 입력하세요"
            />
          </div>
          <div>
            <input type="submit" value="완료" className="factoryInput__arrow" />
          </div>
        </form>
      </div>

      <div style={{ marginTop: 10 }}>
        {sweets.map((sweet) => (
          <Sweet
            key={sweet.id}
            sweetObj={sweet}
            isOwner={sweet.creatorId === userObj.uid}
            creatorId={sweet.createdAt}
            userObj={userObj}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
