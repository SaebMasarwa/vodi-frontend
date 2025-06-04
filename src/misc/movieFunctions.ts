/* eslint-disable @typescript-eslint/no-unused-vars */
import * as yup from "yup";
import { createMovie } from "../services/moviesService";
import { reactToastifyError, reactToastifySuccess } from "./reactToastify";
export const movieInitialValuesObj = {
  title: "",
  plot: "",
  poster: "",
  releaseDate: "",
  genre: "",
  youtubeId: "",
  // likes: [],
  rating: 0,
  // userId: "",
  //   createdAt: new Date().toISOString(),
};

export const movieValidationSchema = yup.object({
  title: yup.string().required("Title is required"),
  plot: yup.string().required("Plot is required"),
  poster: yup
    .string()
    .url("Poster must be a valid URL")
    .required("Poster is required"),
  releaseDate: yup.date().required("Release date is required"),
  genre: yup.string().required("Genre is required"),
  youtubeId: yup.string().required("Youtube ID is required"),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const movieOnSubmit = async (values: any) => {
  console.log("values", values);
  createMovie(values)
    .then((res) => {
      reactToastifySuccess("Movie added successfully");
    })
    .catch((err) => {
      reactToastifyError("Error adding movie");
    });
};
