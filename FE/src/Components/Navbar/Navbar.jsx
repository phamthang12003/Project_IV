import React, { useState } from "react";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authActions, useAuth } from "../../features/auth/authSlice";
import { useCart } from "../../features/cart/cartSlice";
import cart_icon from "../Assets/cart_icon.png";
import logo from "../Assets/logo.png";
import { fetchLogout } from "../../features/auth/authThunk";
import Button from "@mui/material/Button";
import { UserRole } from "../../utils/function";

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { data } = useCart();
  const { user, accessToken } = useAuth();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleLogout = () => {
    dispatch(authActions.reset());
    navigation("/login", { replace: true });
  };

  return (
    <div className="navbar">
      <Link to={"/"} className="nav-logo">
        <img src={logo} alt="" />
        <p>PHAM QUOC THANG</p>
      </Link>

      <ul className="nav-menu">
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/">
            Shop
          </Link>
          {menu === "shop" ? <hr /> : <></>}
        </li>
        <li
          onClick={() => {
            setMenu("product");
          }}
        >
          <Link style={{ textDecoration: "none" }} to="/product">
            Products
          </Link>
          {menu === "product" ? <hr /> : <></>}
        </li>
      </ul>

      <div className="nav-search">
        <input type="text" placeholder="Search...." />
      </div>

      <div className="nav-login-cart">
        {accessToken && user ? (
          <>
            <p>Xin chào, {user.displayName}</p>

            <Button component={Link} to="/order" variant="contained">
              Ordered
            </Button>

            {user.role.length && [...user.role].includes(UserRole.admin) ? (
              <Button component={Link} to="/admin/product" variant="contained" color="error">
                Admin
              </Button>
            ) : null}

            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <Link to="/login">
            <button>Login</button>
          </Link>
        )}

        <Link to="/cart">
          <img src={cart_icon} alt="" />
        </Link>
        <div className="nav-cart-count">{data?.length || 0}</div>
      </div>
    </div>
  );
};

export default Navbar;
