import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const TheForm = ({ values, handleChange }) => (
  <Form>
    <label>
      Name
      <Field type="text" name="name" placeholder="Full Name" />
    </label>
    <label>
      Email
      <Field type="text" name="email" placeholder="Email" />
    </label>
    <label>
      Password
      <Field type="text" name="password" placeholder="Password" />
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
      .min(6)
      .required(),
    email: Yup.string()
      .email()
      .required(),
    password: Yup.string()
      .min(9)
      .required()
  }),
  handleSubmit(values) {
    console.log(values);
  }
})(TheForm);

export default FormikForm;
