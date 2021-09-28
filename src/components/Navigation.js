import { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faClock } from "@fortawesome/free-regular-svg-icons";
import logo from "../clock.jpg";
import { stringify } from "@firebase/util";

const Navigation = ({ userObj }) => {
  const [page, setPage] = useState("");

  return (
    <nav>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          marginTop: 50,
        }}
      >
        <img src={logo} style={{ marginBottom: 0, width: "5%" }} />
        {page === "home" ? (
          <Link
            to="/profile"
            style={{ position: "relative", top: "10px", right: "-100px" }}
            onClick={() => setPage((prev) => "profile")}
          >
            <FontAwesomeIcon icon={faUser} color={"var(--main)"} size="2x" />
          </Link>
        ) : (
          <Link
            to="/"
            style={{ position: "relative", top: "10px", right: "-100px" }}
            onClick={() => setPage((prev) => "home")}
          >
            <FontAwesomeIcon icon={faClock} color={"var(--main)"} size="2x" />
          </Link>
        )}

        {/* <li>
          <Link to="/" style={{ marginRight: 0 }}>
            <FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />{" "}
          </Link>
        </li> */}
        {/* <li>
          <Link
            to="/profile"
            style={{
              margintLeft: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize: 12,
            }}
          >
            <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
            <span style={{ marginTop: 10 }}>
              {userObj.displayName
                ? `${userObj.displayName}의 Profile`
                : "profile"}
            </span>
          </Link>
        </li> */}
      </ul>
    </nav>
  );
};

export default Navigation;
