import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { FormHelperText, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Form, FormikProvider, useFormik } from "formik";
import React, { useCallback, useState } from "react";
import * as Yup from "yup";
import { getBlobImg } from "../../utils/function";

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

const productSchema = (isUpdateMode) =>
  Yup.object().shape({
    name: Yup.string().min(2, "Too Short!").max(140, "Too Long!").required("Required"),
    price: Yup.number().min(2000, "Too Short!").required("Required"),
    description: Yup.string().notRequired(),
    discount: Yup.number().max(100, "Too Long!").min(0, "Too short!").required(),
    isPopulate: Yup.bool(),
    categoryId: Yup.string().required("Required"),
    ...(isUpdateMode
      ? { imageFile: Yup.mixed().nullable() }
      : { imageFile: Yup.mixed().nullable().required("Image Required") }),
  });

function FormLogin({ initialValues, onSubmit, isUpdateMode, categories = [], defaultImage = "" }) {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: productSchema(isUpdateMode),
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    },
  });
  const [imageBlog, setImageBlog] = useState("");

  const { errors, touched, handleSubmit, getFieldProps, setFieldValue, values } = formik;

  const handleChangeImages = useCallback(async (event) => {
    const {
      target: { files },
    } = event;

    if (!files || !files?.length) return;

    setFieldValue("imageFile", files[0]);

    try {
      const { url } = await getBlobImg(files[0]);
      setImageBlog(url);
    } catch (error) {
      console.log("====================================");
      console.log(`error`, error);
      console.log("====================================");
    }
  }, []);

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <TextField
          label="Product Name"
          placeholder="VD: Enter Product Name"
          fullWidth
          {...getFieldProps("name")}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
          margin="normal"
        />

        <TextField
          multiline
          type="text"
          label="Description"
          rows={4}
          autoComplete="off"
          placeholder="VD: Enter Description"
          fullWidth
          {...getFieldProps("description")}
          error={touched.description && Boolean(errors.description)}
          helperText={touched.description && errors.description}
          margin="normal"
        />

        <TextField
          type="number"
          label="Price"
          placeholder="VD: Enter Price"
          fullWidth
          autoComplete="off"
          {...getFieldProps("price")}
          error={touched.price && Boolean(errors.price)}
          helperText={touched.price && errors.price}
          margin="normal"
        />

        <TextField
          type="number"
          label="Discount"
          autoComplete="off"
          placeholder="VD: Enter Discount"
          fullWidth
          {...getFieldProps("discount")}
          error={touched.discount && Boolean(errors.discount)}
          helperText={touched.discount && errors.discount}
          margin="normal"
        />

        <FormControl
          fullWidth
          margin="normal"
          error={touched.categoryId && Boolean(errors.categoryId)}
        >
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            {...getFieldProps("categoryId")}
          >
            {categories.length
              ? categories.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                ))
              : null}
          </Select>

          {touched.categoryId && errors.categoryId ? (
            <FormHelperText>{errors.categoryId}</FormHelperText>
          ) : null}
        </FormControl>

        <FormControl
          fullWidth
          margin="normal"
          error={touched.imageFile && Boolean(errors.imageFile)}
        >
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput onChange={handleChangeImages} type="file" />
          </Button>

          {touched.imageFile && errors.imageFile ? (
            <FormHelperText>{errors.imageFile}</FormHelperText>
          ) : null}
        </FormControl>

        {imageBlog || defaultImage ? (
          <FormControl fullWidth margin="normal">
            <Box
              component={"img"}
              src={imageBlog || defaultImage}
              sx={{ width: 100, height: 100 }}
            />
          </FormControl>
        ) : null}

        <FormControl fullWidth margin="normal">
          <FormControlLabel
            control={
              <Switch
                checked={values.isPopulate}
                {...getFieldProps("isPopulate")}
                onChange={(e) => setFieldValue("isPopulate", e.target.checked)}
                name="gilad"
              />
            }
            label="If this is a popular product, please check it out"
          />
        </FormControl>

        <Button type="submit" variant="contained" sx={{ mt: 3 }}>
          {isUpdateMode ? "Save Change" : "Create New"}
        </Button>
      </Form>
    </FormikProvider>
  );
}

export default FormLogin;
