import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const categorySchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(140, "Too Long!").required("Required"),
});

function FormAddEditCategory({ initialValues, onSubmit, isUpdateMode }) {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <TextField
          label="Category Name"
          placeholder="VD: Enter Category Name"
          fullWidth
          {...getFieldProps("name")}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          margin="normal"
        />

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          {isUpdateMode ? "Save Change" : "Create New"}
        </Button>
      </Form>
    </FormikProvider>
  );
}

export default FormAddEditCategory;
