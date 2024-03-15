import React from "react";
import Item from "../Item/Item";
import "./RelatedProducts.css";

const RelatedProducts = ({ data = [] }) => {
  return (
    <div className="relatedproducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {data.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={
                item?.discount ? item.price - (item.discount / 100) * item.price : item.price
              }
              old_price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RelatedProducts;
