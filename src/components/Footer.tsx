import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

export default function Footer() {
  const { user } = useContext(UserContext);

  return (
    <>
      <div className="mt-5">
        <figure className="figure">
          <i className="bi bi-info-circle"></i>
          <figcaption className="figure-caption">
            <NavLink
              className="text-decoration-none"
              aria-current="page"
              to="/about"
            >
              About
            </NavLink>
          </figcaption>
        </figure>
        {user !== null && (
          <>
            <figure className="figure ms-3">
              <i className="bi bi-heart-fill"></i>
              <figcaption className="figure-caption">
                <NavLink
                  className="text-decoration-none"
                  aria-current="page"
                  to="/favmovies"
                >
                  Favorite Movies
                </NavLink>
              </figcaption>
            </figure>
            <figure className="figure ms-3">
              <i className="bi bi-film"></i>
              <figcaption className="figure-caption">
                <NavLink
                  className="text-decoration-none"
                  aria-current="page"
                  to="/movies"
                >
                  All Movies
                </NavLink>
              </figcaption>
            </figure>
          </>
        )}
      </div>
      <div>v1.0.1</div>
    </>
  );
}
