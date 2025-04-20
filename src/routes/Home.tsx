/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MoviesAction, setAllMoviesAction } from "../redux/MoviesState";
import { getAllMovies } from "../services/moviesService";
import { reactToastifyError } from "../misc/reactToastify";
import { MovieType } from "../interfaces/Movie";
import MediaCard from "../components/MediaCard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
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
    <div className="container-md mx-auto">
      <h5 className="display-5 my-2">Latest Movies Added</h5>
      <div className="row mt-3 justify-content-center">
        {movies.length ? (
          movies
            .slice(0, 5)
            .map((movie: MovieType) => (
              <MediaCard movie={movie} key={movie._id} />
            ))
        ) : (
          <div className="col-12 text-center">
            <h5 className="display-4 my-2">Oops, no movies found.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
