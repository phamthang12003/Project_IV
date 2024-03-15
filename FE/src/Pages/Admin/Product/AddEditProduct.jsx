import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import FormAddEditProduct from "../../../Components/FormAddEditProduct";
import { useCategory } from "../../../features/category/categorySlice";
import { fetchAllCategory } from "../../../features/category/categoryThunk";
import { productActions, useProduct } from "../../../features/products/productSlice";
import {
  fetchAddProduct,
  fetchProductById,
  fetchUpdateProduct,
} from "../../../features/products/productThunk";
import { useNavigate } from "react-router-dom";

function AddEditProduct() {
  const params = useParams();
  const isUpdateMode = Boolean(params?.id);
  const { dataOne } = useProduct();
  const dispatch = useDispatch();
  const { data: categories } = useCategory();
  const navigation = useNavigate();

  const initialValues = useMemo(() => {
    if (dataOne) {
      return {
        id: dataOne.id,
        name: dataOne.name,
        price: dataOne.price,
        description: dataOne.description,
        discount: dataOne.discount,
        isPopulate: dataOne.isPopulate,
        categoryId: dataOne.categoryId,
        imageFile: null,
        // category: dataOne.category,
      };
    }

    return {
      name: "",
      price: 0,
      description: "",
      discount: 0,
      isPopulate: false,
      categoryId: "",
      imageFile: null,
    };
  }, [dataOne]);

  useEffect(() => {
    dispatch(fetchAllCategory({ pageSize: 999999999 }));
  }, []);

  useEffect(() => {
    if (!params?.id) return;
    dispatch(fetchProductById(params.id));

    return () => {
      dispatch(productActions.resetDataOne());
    };
  }, [params?.id]);

  const handleSubmit = (values) => {
    if (isUpdateMode) {
      dispatch(fetchUpdateProduct(values)).then((t) => {
        if (t?.payload?.success) {
          navigation("/admin/product");
        }
      });
    } else {
      dispatch(fetchAddProduct(values)).then((t) => {
        if (t?.payload?.success) {
          navigation("/admin/product");
        }
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isUpdateMode ? "Update Product" : "Add Product"}</Typography>

      <Box>
        <FormAddEditProduct
          initialValues={initialValues}
          isUpdateMode={isUpdateMode}
          categories={categories}
          defaultImage={dataOne?.image}
          onSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}

export default AddEditProduct;
