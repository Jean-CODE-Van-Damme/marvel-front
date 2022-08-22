import logoUp from "../images/marvelred.png";
import logoDown from "../images/cinematic.png";
import { Link, useLocation } from "react-router-dom";

const Header = ({
  name,
  setName,
  title,
  setTitle,
  page,
  setPage,
  limit,
  setLimit,
}) => {
  const location = useLocation();
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

            {location.pathname === "/" ? (
              <input
                type="search"
                placeholder="🔍"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
              />
            ) : null}

            {location.pathname === "/comics" ? (
              <input
                type="search"
                placeholder="🔍"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            ) : null}

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

          <div className="header-pagination">
            <div className="pagination">
              <input
                className="header-filters"
                type="number"
                min="0"
                id="page"
                value={page}
                onChange={(event) => {
                  setPage(Number(event.target.value));
                }}
              />
              <label className="header-labels" htmlFor="page">
                Page
              </label>
            </div>

            <div className="pagination">
              <input
                className="header-filters"
                type="number"
                min="0"
                id="page"
                value={limit}
                onChange={(event) => {
                  setLimit(Number(event.target.value));
                }}
              />
              {/* ternaire dans une ternaire  */}
              {location.pathname === "/comics" ? (
                <label className="header-labels" htmlFor="limit">
                  Comics
                </label>
              ) : location.pathname === "/" ? (
                <label className="header-labels" htmlFor="limit">
                  Heroes
                </label>
              ) : location.pathname === "/favorites" ? (
                <label className="header-labels" htmlFor="limit">
                  Favorite Comics and Heroes
                </label>
              ) : (
                <label className="header-labels" htmlFor="limit">
                  Comics with your hero
                </label>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
