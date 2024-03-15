import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import p36_img from "../Components/Assets/product_36.png";
import FormCheckout from "../Components/FormCheckout";
import { cartActions, useCart } from "../features/cart/cartSlice";
import { formatPrice } from "../utils/formatNumber";
import orderApi from "../api/orderAPI";
import { toast } from "sonner";
import { sleep } from "./../utils/sleep";
import { appActions } from "../features/app/appSlice";
import { useAuth } from "../features/auth/authSlice";

const Checkout = () => {
  const { data } = useCart();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const { user } = useAuth();

  const handleRemoveOne = (payload) => {
    dispatch(cartActions.minusOne(payload));
  };

  const getTotalCartAmount = useMemo(() => {
    if (!data.length) return 0;

    return [...data].reduce((t, v) => {
      if (v.discount) {
        return (t += (v.price - v.price * (v.discount / 100)) * v.quantity);
      }

      return (t += v.price * v.quantity);
    }, 0);
  }, [data]);

  const handleOrderConfirm = async (values) => {
    // Nếu có user thì thêm userId vô không thì khách vẫn đặt hàng được
    const payload = {
      ...values,
      userId: user?.id ?? null,
      productOrders: data.map((t) => ({
        productId: t.id,
        quantity: t.quantity,
        price: t.price,
        discount: t.discount,
      })),
    };

    try {
      dispatch(appActions.setLoading(true));

      await sleep();

      const response = await orderApi.post(payload);

      if (response.success) {
        toast.success(response?.message);
        navigation(user?.id ? "/order" : "/", { replace: true });
        dispatch(cartActions.removeAll());
      }
    } catch (error) {
    } finally {
      dispatch(appActions.setLoading(false));
    }
  };

  const initialValues = useMemo(() => {
    return {
      receiver: user?.displayName || "",
      receiverAddress: user?.address || "",
      phoneNumber: user?.phoneNumber || "",
    };
  }, [user]);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
      </div>

      <hr />

      {data.length ? (
        data.map((e) => {
          return (
            <div key={e.id}>
              <div className="cartitems-format cartitems-format-main">
                <img src={e?.image || p36_img} alt="" className="carticon-product-icon" />

                <p>{e.name}</p>

                {e.discount ? (
                  <p>{formatPrice(e.price - e.price * (e.discount / 100))}</p>
                ) : (
                  <p>{formatPrice(e.price)}</p>
                )}

                <button className="cartitems-quantity">{e.quantity}</button>

                {e.discount ? (
                  <p>{formatPrice((e.price - e.price * (e.discount / 100)) * e.quantity)}</p>
                ) : (
                  <p>{formatPrice(e.price * e.quantity)}</p>
                )}
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <h1>Chưa có sản phẩm trong giỏ</h1>
      )}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{formatPrice(getTotalCartAmount)}</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Free</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{formatPrice(getTotalCartAmount)}</h3>
            </div>
          </div>
        </div>

        <FormCheckout initialValues={initialValues} onSubmit={handleOrderConfirm} />
      </div>
    </div>
  );
};

export default Checkout;
