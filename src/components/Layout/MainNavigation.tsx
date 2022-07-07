import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation: React.FC = () => {
  return (
    <header className={`navbar navbar-expand-md ${classes.navbar}`}>
      <nav className="container">
        <h3>
          <Link to="/" className="navbar-brand logo-icon">
            <i className="fa-brands fa-github"></i>
            &nbsp; Github Search
          </Link>
        </h3>
      </nav>
    </header>
  );
};

export default MainNavigation;
