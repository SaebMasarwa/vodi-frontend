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

      {/* <Link className="btn btn-info me-2 " to={"/movie/genre/كوميدي"}>
        كوميدي
      </Link>
      <Link className="btn btn-info me-2 " to={"/movie/genre/دراما"}>
        دراما
      </Link>
      <Link className="btn btn-info me-2 " to={"/movie/genre/حركة"}>
        حركة
      </Link> */}
    </>
  );
};

export default MoviesNavbar;
