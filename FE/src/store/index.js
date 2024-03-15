import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import appReducer from "../features/app/appSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import categoryReducer from "../features/category/categorySlice";
import orderReducer from "../features/order/orderSlice";
import productReducer from "../features/products/productSlice";

const persistConfig = {
  key: "cart",
  storage,
  timeout: 0,
};

const cartPersist = persistReducer(persistConfig, cartReducer);

const authPersist = persistReducer({ ...persistConfig, key: "auth" }, authReducer);

const store = configureStore({
  reducer: {
    product: productReducer,
    category: categoryReducer,
    cart: cartPersist,
    app: appReducer,
    auth: authPersist,
    order: orderReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
