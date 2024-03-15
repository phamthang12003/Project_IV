import React from "react";
import "./Item.css";
import { Link } from "react-router-dom";
import { formatPrice } from "./../../utils/formatNumber";
import p36_img from "../Assets/product_36.png";

const Item = (props) => {
  return (
    <div className="item">
      <Link to={`/product/${props.id}`}>
        <img onClick={window.scrollTo(0, 0)} src={props.image || p36_img} alt="" />
      </Link>

      <p>{props.name}</p>

      {props.new_price !== props.old_price ? (
        <div className="item-prices">
          <div className="item-price-new">{formatPrice(props.new_price)}</div>
          <div className="item-price-old">{formatPrice(props.old_price)}</div>
        </div>
      ) : (
        <div className="item-prices">
          <div className="item-price-new">{formatPrice(props.new_price)}</div>
        </div>
      )}
    </div>
  );
};

export default Item;
