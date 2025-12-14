
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

export default function FormikForm() {
  return (
    <Formik
      initialValues={{ username:'', email:'', password:'' }}
      validationSchema={Yup.object({
        username: Yup.string().required('Required'),
        email: Yup.string().email().required('Required'),
        password: Yup.string().min(6).required('Required'),
      })}
      onSubmit={values => console.log(values)}
    >
      <Form>
        <Field name="username" />
        <ErrorMessage name="username" />
        <Field name="email" />
        <ErrorMessage name="email" />
        <Field name="password" type="password" />
        <ErrorMessage name="password" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}
