import React, { useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import Popular from "../Components/Popular/Popular";
import Offers from "../Components/Offers/Offers";
import NewCollections from "../Components/NewCollections/NewCollections";
import NewsLetter from "../Components/NewsLetter/NewsLetter";
import { fetchAllProduct, fetchProductPopulate } from "./../features/products/productThunk";
import { useDispatch } from "react-redux";
import { useProduct } from "../features/products/productSlice";

const Shop = () => {
  const dispatch = useDispatch();
  const { loading } = useProduct();

  useEffect(() => {
    dispatch(fetchAllProduct({ pageSize: 10 }));
    dispatch(fetchProductPopulate({ pageSize: 4, pageIndex: 1 }));
  }, []);

  return (
    <div>
      {loading ? (
        <div className="loader-placeholder">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <Hero />
          <Popular />
          <Offers />
          <NewCollections />
          <NewsLetter />
        </>
      )}
    </div>
  );
};

export default Shop;
