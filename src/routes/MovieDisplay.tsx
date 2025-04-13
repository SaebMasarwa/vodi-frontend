import { FunctionComponent, useContext, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { MovieType } from "../interfaces/Movie";
import { getMovieById } from "../services/moviesService";
import { reactToastifyError } from "../misc/reactToastify";
import LikeButton from "../components/LikeButton";
import { UserContext } from "../context/userContext";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MovieDisplayProps {
  // movie: MovieType;
}

const MovieDisplay: FunctionComponent<MovieDisplayProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { user } = useContext(UserContext);
  const { id } = useParams<{ id: string }>();
  const [movieDisplay, setMovieDisplay] = useState<MovieType | null>(null);

  const fetchMovie = async () => {
    await getMovieById(id as string)
      .then((res) => {
        if (res) {
          setMovieDisplay(res);
        } else {
          reactToastifyError("Error loading movie, redirecting to home page");

          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
      })
      .catch((err) => {
        reactToastifyError("Movie not found, redirecting to home page");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        console.log(err);
      });
  };

  useEffect(() => {
    fetchMovie();
  }, []);
  return (
    <>
      {movieDisplay != null && (
        <>
          <iframe
            width="900"
            height="500"
            src={`https://www.youtube.com/embed/${movieDisplay.youtubeId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <h5 className="card-title">
            {movieDisplay.title} -{" "}
            {movieDisplay.releaseDate.toString().split("-")[0]}
          </h5>
          <p className="card-text mt-3">
            {movieDisplay._id && user && (
              <LikeButton movieId={movieDisplay._id} />
            )}{" "}
            <span className="badge text-bg-warning">
              {movieDisplay.rating}
              /10
            </span>
            <p className="card-text my-3 mx-auto items-center w-50">
              {movieDisplay.plot}
            </p>
          </p>
        </>
      )}
    </>
  );
};

export default MovieDisplay;
