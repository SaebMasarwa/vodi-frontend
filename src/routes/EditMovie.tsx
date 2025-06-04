import { FunctionComponent, useEffect, useState } from "react";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import {
  movieInitialValuesObj,
  movieValidationSchema,
} from "../misc/movieFunctions";
import { getMovieById, updateMovie } from "../services/moviesService";
import {
  reactToastifyError,
  reactToastifySuccess,
} from "../misc/reactToastify";
import { Form, Formik, useFormik } from "formik";
import { MovieType } from "../interfaces/Movie";
import InputField from "../components/InputField";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface EditMovieProps {}

const EditMovie: FunctionComponent<EditMovieProps> = () => {
  const navigate: NavigateFunction = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [editedMovie, setEditedMovie] = useState(movieInitialValuesObj);

  useEffect(() => {
    getMovieById(id as string)
      .then((res) => {
        if (res === null) {
          reactToastifyError("Movie not found redirecting to previous page");
          navigate(-1);
        } else {
          setEditedMovie(res);
          console.log(res);
        }
      })
      .catch((err) => {
        reactToastifyError("Movie not found redirecting to previous page");
        navigate(-1);
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    formik.setValues(editedMovie);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editedMovie]);

  const formik = useFormik({
    initialValues: editedMovie,
    enableReinitialize: true,
    validationSchema: movieValidationSchema,
    onSubmit: (values: MovieType) => {
      updateMovie(id as string, {
        title: values.title,
        plot: values.plot,
        poster: values.poster,
        releaseDate: values.releaseDate,
        genre: values.genre,
        youtubeId: values.youtubeId,
        rating: values.rating,
      })
        .then((res) => {
          if (res === null) {
            reactToastifyError("Movie not found redirecting to previous page");
            navigate(-1);
          } else {
            reactToastifyError("Movie updated successfully");
            navigate(-1);
          }
        })
        .catch((err) => {
          reactToastifyError("Movie not found redirecting to previous page");
          navigate(-1);
          console.log(err);
        });
      console.log(values);
    },
  });
  return (
    <>
      <div className="display-3">Edit Movie</div>

      <Formik
        initialValues={editedMovie}
        validationSchema={movieValidationSchema}
        enableReinitialize={true}
        onSubmit={(values: MovieType) => {
          updateMovie(id as string, {
            title: values.title,
            plot: values.plot,
            poster: values.poster,
            releaseDate: values.releaseDate,
            genre: values.genre,
            youtubeId: values.youtubeId,
            rating: values.rating,
          })
            .then(() => {
              reactToastifySuccess("Movie updated successfully");
              navigate(-1);
            })
            .catch((err) => {
              reactToastifyError("Movie update failed");
              console.error(err);
            });
        }}
      >
        {({ handleReset, isValid, dirty }) => (
          <div className="container w-75">
            <Form className="d-flex flex-row flex-wrap justify-content-center">
              <InputField label="Title" name="title" />
              <InputField label="Plot" name="plot" />
              <InputField label="Poster" name="poster" />
              <InputField label="Release Date" name="releaseDate" />
              <InputField label="Genre" name="genre" />
              <InputField label="YouTube ID" name="youtubeId" />
              <InputField label="Rating" name="rating" />
              <button
                className="btn btn-primary mt-3 col-10"
                type="submit"
                disabled={!isValid || !dirty}
              >
                Update
              </button>
              <button
                className="btn btn-warning mt-3 col-5 mx-auto me-2"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
              <button
                className="btn btn-danger mt-3 col-5 mx-auto"
                type="reset"
                onClick={handleReset}
              >
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default EditMovie;
