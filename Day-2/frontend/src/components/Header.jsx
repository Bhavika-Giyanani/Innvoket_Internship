import { Link } from "react-router-dom";
import "../styles/header.css";
import "../App.css";
const Header = () => {
  return (
    <div
      style={{
        padding: "1rem 2rem",
        background: "black",
        color: "white",
        width: "100vw",
        height: "15vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <div className="logo">
        <img
          src="https://tech.innvoket.com/static/logo-6bc4b4926f328b2b4a32a17d97eeb900.png"
          width={"160px"}
          height={"80px"}
          alt="logo"
        />
      </div>
      <nav className="parkinsans-font">
        <Link to="/users">
          <p>Users</p>
        </Link>
        <Link to="/tasks">
          <p>Tasks</p>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
