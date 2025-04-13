/* eslint-disable @typescript-eslint/no-unused-vars */
import { FunctionComponent, useEffect, useState } from "react";
// import { UserContext } from "../context/userContext";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MoviesAction, setAllMoviesAction } from "../redux/MoviesState";
import { getAllMovies, likeMovie } from "../services/moviesService";
import { reactToastifyError } from "../misc/reactToastify";
import Movie from "../components/MovieDisplay";
import { MovieType } from "../interfaces/Movie";
import LikeButton from "../components/LikeButton";
import MediaCard from "../components/MediaCard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  // const { user } = useContext(UserContext);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const movies = useSelector((state: any) => state.moviesState.movies);
  const dispatch = useDispatch<Dispatch<MoviesAction>>();
  const [isLoading, setIsLoading] = useState(false);
  // const [likesCountDisplay, setLikesCountDisplay] = useState(false);

  const [showLike, setShowLike] = useState(false);
  const handleLike = (movieId: string) => {
    likeMovie(movieId);
    // setLikesCountDisplay(!likesCountDisplay);
  };

  useEffect(() => {
    getAllMovies()
      .then((res) => {
        dispatch(setAllMoviesAction(res as MovieType[]));
        setIsLoading(true);
      })
      .catch((err) => {
        console.log(err);
        reactToastifyError("Failed to fetch cards");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
      {/* <p className="mt-3"></p> */}
    </div>
  );
};

export default Home;
