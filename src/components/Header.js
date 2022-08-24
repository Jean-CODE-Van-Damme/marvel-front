import logoUp from "../images/marvelred.png";
import logoDown from "../images/cinematic.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Header = ({
  name,
  setName,
  title,
  setTitle,
  page,
  setPage,
  limit,
  setLimit,
  tokenCookie,
  setTokenCookie,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
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
              <button>Heroes</button>
            </Link>

            <Link className="link-button" to="/comics">
              <button>Comics</button>
            </Link>
            <Link className="link-button" to="/favorites">
              <button>Favorites</button>
            </Link>

            {!tokenCookie ? (
              <>
                <Link to="/signup" className="link-button">
                  <button>Signup</button>
                </Link>
                <Link to="/login" className="link-button">
                  <button>Login</button>
                </Link>
              </>
            ) : (
              <div className="button-signout">
                <button
                  onClick={() => {
                    Cookies.remove("cookie");
                    setTokenCookie(null);
                    navigate("/login");
                  }}
                >
                  Signout
                </button>
              </div>
            )}
          </div>
          <div className="header-div-bottom"></div>

          {location.pathname === "/comics" ? (
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
                    Favorites Comics and Heroes
                  </label>
                ) : (
                  <label className="header-labels" htmlFor="limit">
                    Comics with your hero
                  </label>
                )}
              </div>
            </div>
          ) : location.pathname === "/" ? (
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

                {location.pathname === "/comics" ? (
                  <label className="header-labels" htmlFor="limit">
                    Comics
                  </label>
                ) : (
                  <label className="header-labels" htmlFor="limit">
                    Heroes
                  </label>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
