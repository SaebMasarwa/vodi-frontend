import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MoviesNavbarProps {}

const MoviesNavbar: FunctionComponent<MoviesNavbarProps> = () => {
  return (
    <>
      <Link className="btn btn-info me-2 " to={"/movie/genre/كوميدي"}>
        كوميدي
      </Link>
      <Link className="btn btn-info me-2 " to={"/movie/genre/دراما"}>
        دراما
      </Link>
      <Link className="btn btn-info me-2 " to={"/movie/genre/حركة"}>
        حركة
      </Link>
    </>
  );
};

export default MoviesNavbar;
