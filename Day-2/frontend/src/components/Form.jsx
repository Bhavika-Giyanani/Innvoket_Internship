import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PropTypes from "prop-types";
import "../App.css";

const Form = ({ onSubmit, fields }) => {
  const validationSchema = yup.object().shape(
    fields.reduce((acc, field) => {
      if (field.type === "text" || field.type === "email") {
        acc[field.name] = yup
          .string()
          .required(`${field.label} is required`)
          .when("type", {
            is: "email",
            then: (schema) => schema.email("Invalid email format"),
          });
      }
      if (field.type === "dropdown") {
        acc[field.name] = yup
          .string()
          .required(`Please select a ${field.label}`);
      }
      if (field.type === "textarea") {
        acc[field.name] = yup
          .string()
          .min(3, "Minimum 3 characters required")
          .required(`${field.label} is required`);
      }
      return acc;
    }, {})
  );

  const defaultValues = fields.reduce((acc, field) => {
    if (field.type === "dropdown" && field.options.length > 0) {
      acc[field.name] = field.options[0].value;
    } else {
      acc[field.name] = "";
    }
    return acc;
  }, {});

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      {fields.map((field) => (
        <div key={field.name}>
          <label>{field.label}</label>
          <Controller
            name={field.name}
            control={control}
            render={({ field: inputProps }) => {
              if (field.type === "text" || field.type === "email") {
                return <input {...inputProps} type={field.type} />;
              }
              if (field.type === "textarea") {
                return <textarea {...inputProps}></textarea>;
              }
              if (field.type === "dropdown") {
                return (
                  <select {...inputProps}>
                    <option value="">Select</option>
                    {field.options.map((option, index) => (
                      <option
                        key={`${option.value}-${index}`}
                        value={option.value}
                        className="parkinsans-font"
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                );
              }
              return null;
            }}
          />
          {errors[field.name] && (
            <p style={{ color: "red" }}>{errors[field.name].message}</p>
          )}
        </div>
      ))}
      <button type="submit" className="parkinsans-font">
        Submit
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["text", "email", "dropdown", "textarea"])
        .isRequired,
      options: PropTypes.array,
    })
  ).isRequired,
};

export default Form;
