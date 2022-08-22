import logoUp from "../images/marvelred.png";
import logoDown from "../images/cinematic.png";
import marvelBackground from "../images/marvel.jpg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="container">
        <div className="header-div">
          <div className="header-div-top">
            <Link className="link-logo" to="/">
              <div className="header-logo">
                <img className="logo-top" src={logoUp} alt="Logo Marvel" />
                <img
                  className="logo-bottom"
                  src={logoDown}
                  alt="Cinematique universelle"
                />
              </div>
            </Link>

            <input type="search" placeholder="🔍" />

            <Link className="link-button" to="/">
              <button>Personnages</button>
            </Link>

            <Link className="link-button" to="/comics">
              <button>Comics</button>
            </Link>
            <Link className="link-button" to="/favorites">
              <button>Favoris</button>
            </Link>
          </div>
          <div className="header-div-bottom"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
