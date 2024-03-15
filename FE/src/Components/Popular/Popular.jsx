import React from "react";
import { useProduct } from "../../features/products/productSlice";
import Item from "../Item/Item";
import "./Popular.css";
import p36_img from "../Assets/product_36.png";

const Popular = () => {
  const { populateData } = useProduct();

  return (
    <div className="popular">
      <h1>POPULAR</h1>
      <hr />

      <div className="popular-item">
        {populateData?.length ? (
          populateData.map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image || p36_img}
                new_price={
                  item?.discount ? item.price - (item.discount / 100) * item.price : item.price
                }
                old_price={item.price}
              />
            );
          })
        ) : (
          <h1>Chưa có sản phẩm phổ biến</h1>
        )}
      </div>
    </div>
  );
};
export default Popular;
