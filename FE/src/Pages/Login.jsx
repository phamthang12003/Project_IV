import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormLogin from "../Components/FormLogin";
import { fetchLogin } from "../features/auth/authThunk";
import "./CSS/LoginSignup.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogin = (values) => {
    dispatch(fetchLogin(values)).then((t) => {
      if (t?.payload?.success) {
        navigation("/");
      }
    });
  };

  return (
    <div className="loginsignup">
      <FormLogin initialValues={{ email: "", password: "" }} onSubmit={handleLogin} />
    </div>
  );
};

export default Login;
