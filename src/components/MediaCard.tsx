import { FunctionComponent, useContext } from "react";
import { MovieType } from "../interfaces/Movie";
import LikeButton from "./LikeButton";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { User } from "../interfaces/User";
import { deleteMovie } from "../services/moviesService";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MediaCardProps {
  movie: MovieType;
}

const MediaCard: FunctionComponent<MediaCardProps> = ({ movie }) => {
  const { user } = useContext(UserContext);

  const handleDelete = (
    movieId: string,
    user: User | null,
    movieUserId: string
  ) => {
    if (!user) {
      reactToastifyError("You need to be logged in to delete this card");
      return;
    }
    if (user.isAdmin) {
      deleteMovie(movieId);
      reactToastifySuccess("Card deleted successfully");
    } else if (user._id === movieUserId) {
      deleteMovie(movieId);
      reactToastifySuccess("Card deleted successfully");
    } else {
      reactToastifyError("You are not authorized to delete this card");
    }
  };
  return (
    <>
      <div key={movie._id} className="card p-0 m-2" style={{ width: "14rem" }}>
        <NavLink to={`/movie/${movie._id}`} className="text-decoration-none">
          <img
            src={movie.poster}
            className="card-img-top position-relative"
            alt={movie.title}
            title={movie.title}
          />
        </NavLink>
        <div className="card-body">
          <h5 className="card-title">
            {movie.title} - {movie.releaseDate.toString().split("-")[0]}
          </h5>
          <div className="card-title">{movie.genre}</div>
          <p className="card-text">
            {movie._id && user && <LikeButton movieId={movie._id} />}{" "}
            <span className="badge text-bg-warning">
              {movie.rating}
              /10
            </span>
          </p>
        </div>
        {(user?.isAdmin === true || user?._id === movie.userId) && (
          <div className="card-footer d-flex flex-row justify-content-center">
            {/* {user?._id === movie.userId && ( */}
            <Link
              to={`/editmovie/${movie._id}`}
              className="btn btn-outline-warning me-3"
            >
              <i className="bi bi-pencil"></i>
            </Link>
            {/* )} */}
            {/* {(user?.isAdmin === true || user?._id === movie.userId) && ( */}
            <Link
              to=""
              className="btn btn-outline-danger me-3"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this movie?")
                ) {
                  handleDelete(
                    movie._id as string,
                    user,
                    movie.userId as string
                  );
                }
              }}
            >
              <i className="bi bi-trash"></i>
            </Link>
            {/* )} */}
          </div>
        )}
      </div>
    </>
  );
};

export default MediaCard;
