import React, { useMemo } from "react";
import { useDispatch } from "react-redux";
import { cartActions, useCart } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatNumber";
import remove_icon from "../Assets/cart_cross_icon.png";
import p36_img from "../Assets/product_36.png";
import "./CartItems.css";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const { data } = useCart();
  const dispatch = useDispatch();
  const navigation = useNavigate();

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

  const handleCheckout = () => {
    // redirect to Checkout
    navigation("/checkout", { replace: true });
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove 1 </p>
      </div>

      <hr />

      {data.length ? (
        data.map((e) => {
          return (
            <div>
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

                <img
                  className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => handleRemoveOne(e)}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        })
      ) : (
        <h1>Cart Is Empty</h1>
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
          <button onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
        </div>

        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
