import { FunctionComponent, useEffect, useState } from "react";
import {
  movieLikeStatus,
  likeMovie,
  getMovieLikesCount,
} from "../services/moviesService";
import { NavLink } from "react-router-dom";

interface LikeButtonProps {
  movieId: string;
}

const LikeButton: FunctionComponent<LikeButtonProps> = ({ movieId }) => {
  const [showLike, setShowLike] = useState<boolean>();
  const [likesCountDisplay, setLikesCountDisplay] = useState<number>(0);

  const handleLike = (movieId: string) => {
    likeMovie(movieId);
  };

  useEffect(() => {
    movieLikeStatus(movieId).then((res: boolean) => setShowLike(res));
    getMovieLikesCount(movieId).then((res: number) => {
      setLikesCountDisplay(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showLike, likesCountDisplay]);

  return (
    <>
      {showLike ? (
        <NavLink
          to="
            "
          className="me-1"
          onClick={() => {
            handleLike(movieId);
            setShowLike(false);
          }}
        >
          <span className="badge text-bg-danger">
            <i className="bi bi-heart-fill"></i> {likesCountDisplay}
          </span>
        </NavLink>
      ) : (
        <NavLink
          to="
            "
          className="me-1"
          onClick={() => {
            handleLike(movieId);
            setShowLike(true);
          }}
        >
          <span className="badge text-bg-danger">
            <i className="bi bi-heart"></i> {likesCountDisplay}
          </span>
        </NavLink>
      )}
    </>
  );
};

export default LikeButton;
