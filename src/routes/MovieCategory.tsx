import { FunctionComponent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
// import { UserContext } from "../context/userContext";
import { getMoviesByGenre } from "../services/moviesService";
import { reactToastifyError } from "../misc/reactToastify";
import MediaCard from "../components/MediaCard";
import { MovieType } from "../interfaces/Movie";
import MoviesNavbar from "../components/MoviesNavbar";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MovieCategoryProps {}

const MovieCategory: FunctionComponent<MovieCategoryProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { genre } = useParams<{ genre: string }>();
  const [movieCategory, setMovieCategory] = useState<MovieType[] | null>(null);

  const fetchMoviesByGenre = async () => {
    await getMoviesByGenre(genre as string)
      .then((res) => {
        if (res) {
          setMovieCategory(res);
        } else {
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        reactToastifyError(
          "No movies found in category, redirecting to home page"
        );
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMoviesByGenre();
  }, []);
  return (
    <>
      <div className="container-md">
        <h5 className="display-5 my-2">Movies in {genre}</h5>
        <MoviesNavbar />
        <div className="row mt-3">
          {movieCategory && movieCategory.length ? (
            movieCategory.map((movie: MovieType) => (
              <MediaCard movie={movie} key={movie._id} />
            ))
          ) : (
            <div className="col-12 text-center">
              <h5 className="display-4 my-2">No movies found in {genre}</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MovieCategory;
