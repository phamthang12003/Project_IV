import React from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../features/cart/cartSlice";
import { formatPrice } from "../../utils/formatNumber";
import p36_img from "../Assets/product_36.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import star_icon from "../Assets/star_icon.png";
import "./ProductDisplay.css";

const ProductDisplay = (props) => {
  const { product } = props;
  const dispatch = useDispatch();

  const handleAddCart = () => {
    dispatch(cartActions.addCart(product));
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={product.image || p36_img} alt="" />
          <img src={product.image || p36_img} alt="" />
          <img src={product.image || p36_img} alt="" />
          <img src={product.image || p36_img} alt="" />
        </div>

        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={product.image || p36_img} alt="" />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(123)</p>
        </div>
        <div className="productdisplay-right-prices">
          {product.discount ? (
            <div className="item-prices">
              <div className="productdisplay-right-price-old">{formatPrice(product.price)}</div>
              <div className="productdisplay-right-price-new">
                {formatPrice(product.price - product.price * (product.discount / 100))}
              </div>
            </div>
          ) : (
            <div className="item-prices">
              <div className="productdisplay-right-price-new">{formatPrice(product.price)}</div>
            </div>
          )}
        </div>
        <div className="productdisplay-right-description">{product.description}</div>
        <div className="productdisplay-right-size">
          {/* <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div> */}
        </div>
        <button onClick={handleAddCart}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category:</span> {product.category}
        </p>
        <p className="productdisplay-right-category">
          <span>Tags:</span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
