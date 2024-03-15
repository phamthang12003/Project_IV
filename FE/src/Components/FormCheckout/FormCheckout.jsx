import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { Form, FormikProvider, useFormik } from "formik";
import React from "react";
import * as Yup from "yup";

export const PHONE_REGEX = /((0[1|2|3|4|5|6|7|8|9])+([0-9]{8})\b)/g;

const checkOutSchema = Yup.object().shape({
  receiver: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  receiverAddress: Yup.string().min(2, "Too Short!").max(140, "Too Long!").required("Required"),
  phoneNumber: Yup.string().matches(PHONE_REGEX, "Phone Number Invalid").required("Required"),
});

function FormCheckout({ initialValues, onSubmit }) {
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: checkOutSchema,
    onSubmit: (values) => {
      if (!onSubmit) return;
      onSubmit(values);
    },
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="none" noValidate onSubmit={handleSubmit}>
        <div className="cartitems-promocode">
          <p>Enter All Information Delivery</p>

          <TextField
            label="Receiver"
            placeholder="VD: Enter Receiver"
            fullWidth
            {...getFieldProps("receiver")}
            error={touched.receiver && Boolean(errors.receiver)}
            helperText={touched.receiver && errors.receiver}
            margin="normal"
          />
          <TextField
            label="Receiver Address"
            placeholder="VD: Enter Receiver Address"
            fullWidth
            {...getFieldProps("receiverAddress")}
            error={touched.receiverAddress && Boolean(errors.receiverAddress)}
            helperText={touched.receiverAddress && errors.receiverAddress}
            margin="normal"
          />
          <TextField
            autoComplete="none"
            label="Phone Number"
            placeholder="VD:  Enter Phone Number"
            fullWidth
            {...getFieldProps("phoneNumber")}
            error={touched.phoneNumber && Boolean(errors.phoneNumber)}
            helperText={touched.phoneNumber && errors.phoneNumber}
            margin="normal"
          />

          <Button type="submit" variant="contained" sx={{ mt: 3 }}>
            Order confirm
          </Button>
        </div>
      </Form>
    </FormikProvider>
  );
}

export default FormCheckout;
