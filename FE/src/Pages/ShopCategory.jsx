// eslint-disable-next-line

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import kid_banner from "../Components/Assets/banner_kids.png";
import men_banner from "../Components/Assets/banner_mens.png";
import women_banner from "../Components/Assets/banner_women.png";
import Item from "../Components/Item/Item";
import { useCategory } from "../features/category/categorySlice";
import { fetchAllCategory } from "../features/category/categoryThunk";
import { productActions, useProduct } from "../features/products/productSlice";
import { fetchAllProduct } from "../features/products/productThunk";
import "./CSS/ShopCategory.css";

const ShopCategory = (props) => {
  const dispatch = useDispatch();
  const { data: categoryOptions } = useCategory();
  const { data, filters, pagination } = useProduct();

  useEffect(() => {
    dispatch(fetchAllCategory({ pageSize: 99999999 }));
  }, []);

  useEffect(() => {
    let _filters = { ...filters };

    if (_filters?.categoryId === "default") {
      delete _filters?.categoryId;
    }

    if (_filters?.sortBy === "default") {
      delete _filters?.sortBy;
    }

    dispatch(fetchAllProduct({ ..._filters }));
  }, [filters]);

  // Handle page change
  const handlePageChange = (event, value) => {
    dispatch(productActions.setFilters({ ...filters, page: value }));
  };

  const handleChangeCategory = (event) => {
    const value = event.target.value;

    dispatch(productActions.setFilters({ ...filters, page: 1, categoryId: value }));
  };

  const handleChangePrice = (event) => {
    const value = event.target.value;

    dispatch(productActions.setFilters({ ...filters, page: 1, sortBy: value }));
  };

  return (
    <div className="shop-category">
      <Carousel
        autoPlay
        infiniteLoop
        showArrows={false}
        showIndicators={false}
        transitionTime={100}
        showStatus={false}
      >
        <img className="shopcategory-banner" src={men_banner} alt="" />
        <img className="shopcategory-banner" src={women_banner} alt="" />
        <img className="shopcategory-banner" src={kid_banner} alt="" />
      </Carousel>

      <div className="shopcategory-indexSort">
        <div className="shopcategory-sort">
          Category{" "}
          <select value={filters?.categoryId ?? ""} onChange={handleChangeCategory}>
            <option value="default">Default</option>
            {categoryOptions?.map((c) => (
              <option value={c?.id} key={c?.id}>
                {c?.name}
              </option>
            ))}
          </select>
        </div>

        <div className="shopcategory-sort">
          Sort by{" "}
          <select value={filters?.sortBy} onChange={handleChangePrice}>
            <option value="default">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="shopcategory-products">
        {/* Map through products to display them on the current page */}
        {data?.length ? (
          data.map((item, i) => (
            // Render Item component based on sortedProducts
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
          ))
        ) : (
          <h1>Chưa có sản phẩm</h1>
        )}
      </div>

      {pagination.totalPage ? (
        <div className="shopcategory-pagination">
          <Stack spacing={2}>
            <Pagination
              count={pagination.totalPage}
              color="primary"
              page={pagination.pageIndex}
              onChange={handlePageChange}
            />
          </Stack>
        </div>
      ) : null}
      <div className="shopcategory-loadmore">Explore More</div>
    </div>
  );
};

export default ShopCategory;
