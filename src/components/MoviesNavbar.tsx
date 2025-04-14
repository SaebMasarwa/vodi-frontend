import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MoviesNavbarProps {}

const MoviesNavbar: FunctionComponent<MoviesNavbarProps> = () => {
  return (
    <>
      <Link to={"/movie/genre/كوميدي"}>كوميدي</Link>
    </>
  );
};

export default MoviesNavbar;
