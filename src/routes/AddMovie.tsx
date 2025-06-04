import { FunctionComponent } from "react";
import { Form, Formik, useFormik } from "formik";
import {
  movieInitialValuesObj,
  movieOnSubmit,
  movieValidationSchema,
} from "../misc/movieFunctions";
import InputField from "../components/InputField";
import { MovieType } from "../interfaces/Movie";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AddMovieProps {}

const AddMovie: FunctionComponent<AddMovieProps> = () => {
  const formik = useFormik({
    initialValues: movieInitialValuesObj,
    validationSchema: movieValidationSchema,
    onSubmit: (values: MovieType) => {
      movieOnSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <>
      <div className="display-3">Add Movie</div>
      <Formik
        initialValues={movieInitialValuesObj}
        validationSchema={movieValidationSchema}
        onSubmit={movieOnSubmit}
      >
        {({ handleReset, isValid, dirty }) => (
          <div className="container w-75 mt-3">
            <Form className="d-flex flex-row flex-wrap justify-content-center">
              <InputField label="Title" name="title" />
              <InputField label="Plot" name="plot" />
              <InputField label="Poster (Link to image)" name="poster" />
              <InputField
                label="Release Date (format YYYY-MM-DD)"
                name="releaseDate"
              />
              <InputField label="Genre" name="genre" />
              <InputField
                label="YouTube ID (e.g EGywQ3q0bdI after v=)"
                name="youtubeId"
              />
              <InputField label="Rating (e.g 7.8)" name="rating" />
              <div className="d-flex flex-row justify-content-center w-100">
                <button
                  className="btn btn-primary mt-3 col-5 me-2"
                  type="submit"
                  disabled={!dirty || !isValid}
                >
                  Submit
                </button>
                <button
                  className="btn btn-warning mt-3 col-5 me-2"
                  type="reset"
                  disabled={!dirty || !isValid}
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </>
  );
};

export default AddMovie;
