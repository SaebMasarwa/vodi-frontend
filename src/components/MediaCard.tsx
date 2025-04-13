import { FunctionComponent } from "react";
import { MovieType } from "../interfaces/Movie";
import LikeButton from "./LikeButton";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MediaCardProps {
  movie: MovieType;
}

const MediaCard: FunctionComponent<MediaCardProps> = ({ movie }) => {
  return (
    <>
      <div
        key={movie._id}
        className="card col-md-4 p-0"
        style={{ width: "16rem" }}
      >
        {/* <Movie movie={movie} /> */}
        <img
          src={movie.poster}
          className="card-img-top"
          alt={movie.title}
          title={movie.title}
        />
        <div className="card-body">
          <h5 className="card-title">
            {movie.title} - {movie.releaseDate.toString().split("-")[0]}
          </h5>
          <div className="card-title">{movie.genre}</div>
          <p className="card-text">
            {movie._id && <LikeButton movieId={movie._id} />}{" "}
            <span className="badge text-bg-warning">
              {movie.rating}
              /10
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default MediaCard;
