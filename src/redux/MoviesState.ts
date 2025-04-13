import { MovieType } from "../interfaces/Movie";

// Movies state
export class MoviesState {
  public movies: MovieType[] = [];
}

// Action type
export enum MoviesActionType {
  AddMovie = "AddMovie",
  UpdateMovie = "UpdateMovie",
  DeleteMovie = "DeleteMovie",
  SetAllMovies = "SetAllMovies",
  SetMyFavMovies = "SetMyFavMovies",
  SetMyMovies = "SetMyMovies",
}

// action = type + payload
export interface MoviesAction {
  type: MoviesActionType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload: any;
}

// actions creators
// components will use those functions in order to create an action and change the state
export function addMovieAction(movie: MovieType): MoviesAction {
  return { type: MoviesActionType.AddMovie, payload: movie };
}

export function updateMovieAction(movie: MovieType): MoviesAction {
  return { type: MoviesActionType.UpdateMovie, payload: movie };
}

export function deleteMovieAction(id: number): MoviesAction {
  return { type: MoviesActionType.DeleteMovie, payload: id };
}

export function setAllMoviesAction(movies: MovieType[]): MoviesAction {
  return { type: MoviesActionType.SetAllMovies, payload: movies };
}
export function setMyFavMoviesAction(movies: MovieType[]): MoviesAction {
  return { type: MoviesActionType.SetMyFavMovies, payload: movies };
}
export function setMyMoviesAction(movies: MovieType[]): MoviesAction {
  return { type: MoviesActionType.SetMyMovies, payload: movies };
}

// reducer
export function moviesReducer(
  currentState: MoviesState = new MoviesState(),
  action: MoviesAction
): MoviesState {
  // create a deep copy of currentState
  const newState: MoviesState = {
    ...currentState,
    movies: [...currentState.movies],
  };
  switch (action.type) {
    case MoviesActionType.AddMovie:
      newState.movies.push(action.payload);
      break;
    case MoviesActionType.UpdateMovie: {
      const indexToUpdate = newState.movies.findIndex(
        (movie: MovieType) => movie._id === action.payload._id
      );
      newState.movies[indexToUpdate] = action.payload;
      break;
    }
    case MoviesActionType.DeleteMovie: {
      const indexToDelete = newState.movies.findIndex(
        (movie: MovieType) => movie._id === action.payload
      );
      newState.movies.splice(indexToDelete, 1);
      break;
    }
    case MoviesActionType.SetAllMovies:
      newState.movies = action.payload;
      break;
    case MoviesActionType.SetMyFavMovies:
      newState.movies = action.payload;
      break;
    case MoviesActionType.SetMyMovies:
      newState.movies = action.payload;
  }
  return newState;
}
