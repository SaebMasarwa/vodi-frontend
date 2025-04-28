import { FunctionComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { MoviesAction, setAllMoviesAction } from "../redux/MoviesState";
import { getAllMovies, searchMovies } from "../services/moviesService";
import { reactToastifyError } from "../misc/reactToastify";
import { MovieType } from "../interfaces/Movie";
import MediaCard from "../components/MediaCard";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [searchResults, setSearchResults] = useState<MovieType[]>([]);
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

  const handleSearch = (searchQuery: string) => {
    searchMovies(searchQuery)
      .then((res) => {
        if (res) {
          setSearchResults(res);
        }
      })
      .catch((err: string) => {
        console.log(err);
        reactToastifyError(err);
      });
  };

  return (
    <div className="container-md mx-auto">
      <h5 className="display-5 my-2">Latest Movies Added</h5>
      {/* Search input */}
      <input
        className="form-control w-50 mx-auto my-3"
        type="text"
        placeholder="Start typing to search by title, genre, year or rating"
        aria-label="Search"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      {/* Search results display */}
      {searchResults?.length ? (
        <>
          <div className="display-3">Search Results Page</div>
          <div className="container-fluid">
            <div className="d-flex flex-wrap">
              {searchResults.map((movie: MovieType) => {
                return (
                  <div className="mx-auto d-flex flex-wrap">
                    <MediaCard movie={movie} key={movie._id} />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        // This to show nothing while no search results
        <></>
      )}
      <div className="row mt-3 justify-content-center">
        {movies.length && searchResults.length === 0 ? (
          movies
            .slice(0, 5)
            .map((movie: MovieType) => (
              <MediaCard movie={movie} key={movie._id} />
            ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Home;
