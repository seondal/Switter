import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import logo from "../clock.jpg";

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul style={{ display: "flex", justifyContent: "center", marginTop: 50 }}>
        <img src={logo} style={{ marginBottom: 0, width: "8%" }} />

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
