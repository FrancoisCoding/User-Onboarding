import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const TheForm = ({ values, errors, touched, isSubmitting }) => (
  <Form>
    <label>
      Name
      {touched.name && errors.name && <p>{errors.name}</p>}
      <Field type="text" name="name" placeholder="Full Name" />
    </label>
    <label>
      Email
      {touched.email && errors.email && <p>{errors.email}</p>}
      <Field type="text" name="email" placeholder="Email" />
    </label>
    <label>
      Password
      {touched.password && errors.password && <p>{errors.password}</p>}
      <Field type="password" name="password" placeholder="Password" />
    </label>
    <label>
      Terms of Service
      <Field type="checkbox" name="terms" checked={values.terms} />
    </label>
    <button>Submit</button>
  </Form>
);

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, terms }) {
    return {
      name: "",
      email: "",
      password: "",
      terms: false
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string()
      .min(6, "Please Provide Your First and Last Name")
      .required("Please Provide Your Name"),
    email: Yup.string()
      .email()
      .required("Please Provide Your Email"),
    password: Yup.string()
      .min(9, "Password must be at least 9 characters")
      .required("Please Provide Your Password")
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(TheForm);

export default FormikForm;
