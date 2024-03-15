import React from "react";
import "./CSS/LoginSignup.css";
import FormSignUp from "../Components/FormSignUp";
import { useDispatch } from "react-redux";
import { fetchSignUp } from "../features/auth/authThunk";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSubmit = (values) => {
    dispatch(fetchSignUp(values)).then((t) => {
      if (t?.payload?.success) {
        navigation("/login");
      }
    });
  };

  return (
    <div className="loginsignup">
      <FormSignUp
        initialValues={{
          address: "",
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phoneNumber: "",
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default LoginSignup;
