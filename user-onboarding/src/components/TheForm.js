import React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function TheForm({ values, errors, touched, isSubmitting }) {
  console.log("users", values.users);
  return (
    <>
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
      <h1>Current Users</h1>
      {values.user && values.users.map(user => console.log("each user", user))}
    </>
  );
}

const FormikForm = withFormik({
  mapPropsToValues({ name, email, password, terms, users }) {
    return {
      name: "",
      email: "",
      password: "",
      terms: false,
      users: ["Example User"]
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
  handleSubmit(values, { resetForm }) {
    console.log(values);
    axios
      .post("https://reqres.in/api/users", {
        name: values.name,
        email: values.email,
        password: values.password,
        terms: values.terms
      })
      .then(response => {
        console.log(response);
        values.users = [...values.users, response.data];
        console.log(values.users);
      })
      .catch(function(error) {
        console.log(error);
      });
    resetForm();
  }
})(TheForm);

export default FormikForm;
