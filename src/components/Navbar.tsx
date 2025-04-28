import { FunctionComponent, useContext } from "react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/themeContext";
import { UserContext } from "../context/userContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface NavbarProps {}

const Navbar: FunctionComponent<NavbarProps> = () => {
  const { toggleDarkMode } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
        crossOrigin="anonymous"
      ></script>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <NavLink className="navbar-brand text-info" to="/">
            <img src="/vodi.svg" alt="Vodi Logo" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <div className="d-flex justify-content-between w-100">
              <div>
                <ul className="navbar-nav  mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/about"
                    >
                      About
                    </NavLink>
                  </li>

                  {user && (
                    <li className="nav-item">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/favmovies"
                      >
                        Favorite Movies
                      </NavLink>
                    </li>
                  )}

                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      to="/movies"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Movies
                    </NavLink>
                    <ul className="dropdown-menu">
                      <li>
                        <NavLink className="dropdown-item " to={"/movies"}>
                          All
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={"/movie/genre/كوميدي"}
                        >
                          كوميدي
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={"/movie/genre/دراما"}
                        >
                          دراما
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={"/movie/genre/حركة"}
                        >
                          حركة
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={"/movie/genre/رعب"}
                        >
                          رعب
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={"/movie/genre/عائلي"}
                        >
                          عائلي
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={"/movie/genre/اطفال"}
                        >
                          اطفال
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          className="dropdown-item "
                          to={"/movie/genre/مسرحيات"}
                        >
                          مسرحيات
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                  {user?.isAdmin && (
                    <>
                      <li className="nav-item">
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to="/dashboard"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
              <div className="d-flex mb-2 mb-lg-0 flex-sm-column flex-lg-row">
                {localStorage.getItem("darkMode") === "true" ? (
                  <i
                    className="bi bi-moon-fill nav-link m-2"
                    onClick={() => toggleDarkMode(false)}
                    title="Dark Mode"
                  ></i>
                ) : (
                  <i
                    className="bi bi-moon nav-link m-2"
                    onClick={() => toggleDarkMode(true)}
                    title="Light Mode"
                  ></i>
                )}
                {user ? (
                  <>
                    <NavLink className="nav-link m-2" to="/profile">
                      <i className="bi bi-person-circle"></i>
                    </NavLink>
                    <NavLink
                      to={"/login"}
                      className="nav-link m-2"
                      type="submit"
                      onClick={() => {
                        localStorage.removeItem("token");
                        setUser(null);
                      }}
                    >
                      Logout
                    </NavLink>
                  </>
                ) : (
                  <>
                    <NavLink
                      className="nav-link m-2"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                    <NavLink
                      className="nav-link m-2"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
