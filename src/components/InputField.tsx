import { useField } from "formik";
import { FunctionComponent } from "react";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value?: string | number;
}

const InputField: FunctionComponent<InputFieldProps> = ({
  name,
  label,
  ...props
}) => {
  const [field, meta] = useField({ ...props, name: name });
  return (
    <div className="form-floating mb-3 col-5 me-2">
      <input className="form-control" {...field} {...props} />
      <label>{label}</label>
      {meta.touched && meta.error ? (
        <div className="text-danger">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default InputField;
