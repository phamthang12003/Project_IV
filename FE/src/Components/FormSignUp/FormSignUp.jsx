import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { PHONE_REGEX } from "../FormCheckout/FormCheckout";

const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Required"),
  address: Yup.string().min(2, "Too Short!").max(140, "Too Long!").required("Required"),
  displayName: Yup.string().min(2, "Too Short!").max(140, "Too Long!").required("Required"),
  password: Yup.string().min(6, "Too Short!").max(140, "Too Long!").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Password confirm don't match")
    .required("Required"),
  phoneNumber: Yup.string().matches(PHONE_REGEX, "Phone Number Invalid").required("Required"),
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
          <h1>Sign Up</h1>

          <TextField
            label="Display Name"
            placeholder="VD: Enter Display Name"
            fullWidth
            {...getFieldProps("displayName")}
            error={touched.displayName && Boolean(errors.displayName)}
            helperText={touched.displayName && errors.displayName}
            margin="normal"
          />

          <TextField
            type="text"
            label="Phone Number"
            autoComplete="off"
            placeholder="VD: Enter Phone Number"
            fullWidth
            {...getFieldProps("phoneNumber")}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            margin="normal"
          />

          <TextField
            label="Address"
            placeholder="VD: Enter Address"
            fullWidth
            autoComplete="off"
            {...getFieldProps("address")}
            error={touched.address && Boolean(errors.address)}
            helperText={touched.address && errors.address}
            margin="normal"
          />

          <TextField
            type="email"
            label="Email"
            autoComplete="off"
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

          <TextField
            type="password"
            label="Confirm Password"
            placeholder="VD: Enter Confirm Password"
            fullWidth
            {...getFieldProps("confirmPassword")}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            margin="normal"
          />

          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Continue
          </Button>

          <p className="loginsignup-login">
            Already have an account? <Link to={"/login"}>Login here</Link>
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
