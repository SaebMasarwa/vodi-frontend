import { FunctionComponent, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MoviesAction, setAllMoviesAction } from "../redux/MoviesState";
import { getAllMovies } from "../services/moviesService";
import { reactToastifyError } from "../misc/reactToastify";
import { MovieType } from "../interfaces/Movie";
import { UserContext } from "../context/userContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface StatsProps {}

const Stats: FunctionComponent<StatsProps> = () => {
  const { user } = useContext(UserContext);
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
      <div className="container-md">
        <h5 className="display-5 my-2">Movies</h5>
        {user?.isAdmin && movies.length ? (
          <table className="table table-striped table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Rating</th>
                <th scope="col">Release Date</th>
                <th scope="col">Total Likes</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((movie: MovieType) => (
                <tr key={movie._id}>
                  <th scope="row">{movie.title}</th>
                  <td>{movie.rating}</td>
                  <td>{new Date(movie.releaseDate).toLocaleDateString()}</td>
                  <td>{movie.likes?.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="col-12 text-center">
            <h5 className="display-4 my-2">
              Unauhorized, No stats can be displayed,{" "}
              <span className="display-4 text-danger">Admins Only</span>
            </h5>
          </div>
        )}
      </div>
    </>
  );
};

export default Stats;
