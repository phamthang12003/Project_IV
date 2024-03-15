import React from "react";
import "./NewCollections.css";
import new_collection from "../Assets/new_collections";
import Item from "../Item/Item";
import { useProduct } from "../../features/products/productSlice";
import p36_img from "../Assets/product_36.png";

const NewCollections = () => {
  const { data } = useProduct();

  return (
    <div className="new-collections">
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {data?.length ? (
          data.map((item, i) => {
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
          <h1>Chưa có sản phẩm</h1>
        )}
      </div>
    </div>
  );
};

export default NewCollections;
