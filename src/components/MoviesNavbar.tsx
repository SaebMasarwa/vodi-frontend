import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MoviesNavbarProps {}

const MoviesNavbar: FunctionComponent<MoviesNavbarProps> = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && (
        <Link className="btn btn-success me-2 " to={"/addmovie"}>
          Add Movie
        </Link>
      )}
    </>
  );
};

export default MoviesNavbar;
