import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrum from "../Components/Breadcrums/Breadcrum";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { useProduct } from "../features/products/productSlice";
import { fetchAllProduct, fetchProductById } from "../features/products/productThunk";

const Product = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { dataOne: product, loading, data } = useProduct();

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchProductById(productId));
  }, [productId]);

  useEffect(() => {
    if (!product) return;
    dispatch(fetchAllProduct({ pageSize: 4, categoryId: product.categoryId }));
  }, [product]);

  return (
    <div>
      {loading ? (
        <div className="loader-placeholder">
          <div className="loader"></div>
        </div>
      ) : null}

      {product ? (
        <>
          <Breadcrum product={product} />

          <ProductDisplay product={product} />

          <DescriptionBox description={product.description} />

          <RelatedProducts data={data} />
        </>
      ) : null}
    </div>
  );
};

export default Product;
