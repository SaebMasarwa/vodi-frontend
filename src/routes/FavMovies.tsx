import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MoviesAction, setMyFavMoviesAction } from "../redux/MoviesState";
import { getFavMovies } from "../services/moviesService";
import { reactToastifyError } from "../misc/reactToastify";
import { MovieType } from "../interfaces/Movie";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface FavMoviesProps {}

const FavMovies: FunctionComponent<FavMoviesProps> = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const myFavMovies = useSelector((state: any) => state.moviesState.movies);
  const dispatch = useDispatch<Dispatch<MoviesAction>>();

  useEffect(() => {
    getFavMovies()
      .then((res) => {
        dispatch(setMyFavMoviesAction(res as MovieType[]));
      })
      .catch((err) => {
        console.log(err);
        reactToastifyError("Failed to fetch favorite movies");
      });
  }, [dispatch]);
  return (
    <>
      <div className="display-3">My Favorite Movies</div>
      <div className="row mt-3 justify-content-center">
        {myFavMovies ? (
          myFavMovies.map((movie: MovieType) => (
            <div
              key={movie._id}
              className="card p-0 m-2"
              style={{ width: "14rem" }}
            >
              <img
                src={movie.poster}
                className="card-img-top position-relative"
                alt={movie.title}
                title={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">
                  {movie.title} - {movie.releaseDate.toString().split("-")[0]}
                </h5>
                <div className="card-title">{movie.genre}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <h5 className="display-4 my-2">Oops, no favorite movies found.</h5>
          </div>
        )}
      </div>
    </>
  );
};

export default FavMovies;
