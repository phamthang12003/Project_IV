import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  password: Yup.string().min(2, "Too Short!").max(140, "Too Long!").required("Required"),
});

function FormLogin({ initialValues, onSubmit }) {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <div className="loginsignup-container">
          <h1>Login</h1>

          <TextField
            type="email"
            label="Email"
            autoComplete="none"
            placeholder="VD: Enter Email"
            fullWidth
            {...getFieldProps("email")}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            margin="normal"
          />
          <TextField
            type="password"
            label="Password"
            placeholder="VD: Enter Password"
            fullWidth
            {...getFieldProps("password")}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            margin="normal"
          />

          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Continue
          </Button>

          <p className="loginsignup-login">
            Don't account? <Link to={"/sign-up"}>Sign up here</Link>
          </p>

          <div className="loginsignup-agree">
            <input type="checkbox" name="" id="" />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        </div>
      </Form>
    </FormikProvider>
  );
}

export default FormLogin;
