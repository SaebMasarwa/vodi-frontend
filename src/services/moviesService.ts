import axios from "axios";
import { MovieType } from "../interfaces/Movie";
import { jwtDecode } from "jwt-decode";
import { UserToken } from "../interfaces/User";

const api: string = `${import.meta.env.VITE_APP_API}/movies`;

// Get all movies from the API
export async function getAllMovies(): Promise<MovieType[]> {
  const response = await axios.get<MovieType[]>(api);
  return response.data;
}

// Get a movie by ID from the API
export async function getMovieById(id: string): Promise<MovieType> {
  const response = await axios.get<MovieType>(`${api}/${id}`);
  return response.data;
}

// Create a new movie in the API
export async function createMovie(movie: MovieType) {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(api, movie, {
      headers: { Authorization: token },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating movie:", error);
    // return undefined;
  }
}

// Update a movie in the API
export async function updateMovie(id: string, movie: MovieType) {
  try {
    const token = localStorage.getItem("token");
    return await axios.put(`${api}/${id}`, movie, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error("Error updating movie:", error);
  }
}

// Delete a movie from the API
export async function deleteMovie(id: string): Promise<void> {
  await axios.delete(`${api}/${id}`);
}

// Like a movie in the API
export async function likeMovie(id: string): Promise<void> {
  try {
    const token = localStorage.getItem("token");
    await axios.patch(`${api}/${id}`, null, {
      headers: { Authorization: token },
    });
  } catch (error) {
    console.error("Error liking the movie:", error);
  }
}

// Get like status of a movie
export async function movieLikeStatus(movieId: string) {
  try {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode<UserToken>(token as string);
    const userId = decoded._id;
    const res = await axios.get(`${api}/${movieId}`, {
      headers: {
        Authorization: token,
      },
    });

    const isLiked = await res.data.likes.includes(userId);
    return isLiked;
  } catch (error) {
    console.log(error);
  }
}

// Get the count of likes for a movie
export async function getMovieLikesCount(movieId: string) {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${api}/${movieId}`, {
      headers: {
        Authorization: token,
      },
    });
    return res.data.likes.length;
  } catch (error) {
    console.log(error);
  }
}

// Get movies by genre from the API
export async function getMoviesByGenre(genre: string) {
  try {
    const response = await axios.get<MovieType[]>(`${api}/genre/${genre}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by category:", error);
  }
}

// Get my favorite cards
export async function getFavMovies() {
  const token = localStorage.getItem("token");
  const decoded = jwtDecode<UserToken>(token as string);
  const userId = decoded._id;
  try {
    const resAllMovies = await getAllMovies();
    // const allMovies = resAllMovies;
    const favMovies = resAllMovies.filter(
      (movie) => movie.likes && movie.likes.includes(userId)
    );
    console.log("Fav movies by logged in user" + favMovies);

    return favMovies;
  } catch (error) {
    console.log(error);
  }
}

// Search movies
export async function searchMovies(query: string) {
  try {
    const movies = await getAllMovies();
    const newMovies = movies.filter(
      (movie: MovieType) =>
        movie.title.includes(query) ||
        movie.rating.toString().includes(query) ||
        movie.releaseDate.includes(query) ||
        movie.genre.includes(query)
    );
    return newMovies;
  } catch (error) {
    console.log(error);
  }
}
