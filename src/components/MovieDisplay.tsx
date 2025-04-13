import { FunctionComponent } from "react";
import type { MovieType } from "../interfaces/Movie";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MovieDisplayProps {
  movie: MovieType;
}

const MovieDisplay: FunctionComponent<MovieDisplayProps> = ({ movie }) => {
  return (
    <>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${movie.youtubeId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </>
  );
};

export default MovieDisplay;
