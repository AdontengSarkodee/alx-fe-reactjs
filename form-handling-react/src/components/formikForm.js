import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function FormikForm() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be 6 characters or more")
      .required("Password is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Formik submitted:", values);
    alert("User registered successfully! (Formik)");
    resetForm();
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-lg border">
      <h2 className="text-xl font-bold mb-4">Register (Formik Form)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          {/* Username */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="username">
              Username
            </label>
            <Field
              id="username"
              name="username"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="username"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="email">
              Email
            </label>
            <Field
              id="email"
              name="email"
              type="email"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block mb-1" htmlFor="password">
              Password
            </label>
            <Field
              id="password"
              name="password"
              type="password"
              className="border p-2 w-full rounded"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="text-red-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
}
