import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import women_banner from "./Components/Assets/banner_women.png";
import Admin from "./Components/Layout/Admin";
import Main from "./Components/Layout/Main";
import Loading from "./Components/Loading";
import ProtectRoute from "./Components/ProtectRoute";
import AddEditCategory from "./Pages/Admin/Category/AddEditCategory";
import CategoryPage from "./Pages/Admin/Category/CategoryPage";
import OrderPage from "./Pages/Admin/Order/OrderPage";
import AddEditProduct from "./Pages/Admin/Product/AddEditProduct";
import ProductPage from "./Pages/Admin/Product/ProductPage";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Login from "./Pages/Login";
import LoginSignup from "./Pages/LoginSignup";
import Order from "./Pages/Order";
import Product from "./Pages/Product";
import Shop from "./Pages/Shop";
import ShopCategory from "./Pages/ShopCategory";
import { useAuth } from "./features/auth/authSlice";
import { fetchGetCurrentUser } from "./features/auth/authThunk";
import { AdminRoute } from "./Components/ProtectRoute/ProtectRoute";

function App() {
  const dispatch = useDispatch();
  const { accessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchGetCurrentUser());
  }, [accessToken]);

  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />

      <Loading />

      <Routes>
        <Route element={<Main />}>
          <Route index path="/" element={<Shop />} />

          <Route path="/product/:productId" element={<Product />} />

          <Route
            path="/product"
            element={<ShopCategory banner={women_banner} category="women" />}
          />

          <Route path="/checkout" element={<Checkout />} />

          <Route
            path="/order"
            element={
              <ProtectRoute>
                <Order />
              </ProtectRoute>
            }
          />

          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<LoginSignup />} />

          <Route index path="*" element={<Navigate to={"/"} replace />} />
        </Route>

        <Route
          path="admin"
          element={
            <ProtectRoute>
              <AdminRoute>
                <Admin />
              </AdminRoute>
            </ProtectRoute>
          }
        >
          <Route path="product" element={<ProductPage />} />
          <Route path="product/add" element={<AddEditProduct />} />
          <Route path="product/update/:id" element={<AddEditProduct />} />

          <Route path="category" element={<CategoryPage />} />
          <Route path="category/add" element={<AddEditCategory />} />
          <Route path="category/update/:id" element={<AddEditCategory />} />

          <Route path="order" element={<OrderPage />} />

          <Route index path="*" element={<Navigate to={"/"} replace />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
