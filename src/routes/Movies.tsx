import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { getAllMovies } from "../services/moviesService";
import { MoviesAction, setAllMoviesAction } from "../redux/MoviesState";
import { reactToastifyError } from "../misc/reactToastify";
import { MovieType } from "../interfaces/Movie";
import MediaCard from "../components/MediaCard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MoviesProps {}

const Movies: FunctionComponent<MoviesProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.moviesState.movies);
  const dispatch = useDispatch<Dispatch<MoviesAction>>();
  useEffect(() => {
    getAllMovies()
      .then((res) => {
        dispatch(setAllMoviesAction(res as MovieType[]));
      })
      .catch((err) => {
        console.log(err);
        reactToastifyError("Failed to fetch cards");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container-md w-50">
        <h5 className="display-5 my-2">Movies</h5>
        <div className="row mt-3">
          {movies.length ? (
            movies.map((movie: MovieType) => (
              <MediaCard movie={movie} key={movie._id} />
            ))
          ) : (
            <div className="col-12 text-center">
              <h5 className="display-4 my-2">No Movies Found</h5>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Movies;
