import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

function TheForm({ values, errors, touched, isSubmitting, status, form }) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // status sometimes comes through as undefined
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);
  return (
    <>
      <Form>
        <label>
          Name
          {touched.name && errors.name && (
            <p className="errors">{errors.name}</p>
          )}
          <Field type="text" name="name" placeholder="Full Name" />
        </label>
        <label>
          Email
          {touched.email && errors.email && (
            <p className="errors">{errors.email}</p>
          )}
          <Field type="text" name="email" placeholder="Email" />
        </label>
        <label>
          Password
          {touched.password && errors.password && (
            <p className="errors">{errors.password}</p>
          )}
          <Field type="password" name="password" placeholder="Password" />
        </label>
        <label>
          Choose Role
          <Field component="select" name="role" className="selectOption">
            <option value="noob">Noob</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="pro">Pro</option>
          </Field>
        </label>
        <label>
          Terms of Service
          <Field type="checkbox" name="terms" checked={values.terms} />
        </label>
        <button type="submit">Submit</button>
      </Form>
      <h1>Current Users</h1>
      {users
        ? users.map(user => (
            <p key={user.id} className="users">
              Name : {user.name} Role : {user.role}
            </p>
          ))
        : null}
    </>
  );
}

const FormikForm = withFormik({
  //Here  remember to handle the inputs using the args you give to you mapPropsToValues

  enableReinitialize: true,
  mapPropsToValues: ({ name, email, password, terms, users, role }) => {
    return {
      name: "",
      email: "",
      password: "",
      terms: false,
      role: "noob",
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
  handleSubmit(values, { resetForm, setStatus }) {
    axios
      .post("https://reqres.in/api/users", {
        name: values.name,
        email: values.email,
        password: values.password,
        terms: values.terms,
        role: values.role
      })
      .then(response => {
        setStatus(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
    resetForm();
  }
})(TheForm);

export default FormikForm;
