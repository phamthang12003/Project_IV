import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import React, { useEffect, useMemo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import FormAddEditCategory from "../../../Components/FormAddEditCategory";
import { categoryActions, useCategory } from "../../../features/category/categorySlice";
import {
  fetchAddCategory,
  fetchCategoryById,
  fetchUpdateCategory,
} from "../../../features/category/categoryThunk";

function AddEditCategory() {
  const params = useParams();
  const isUpdateMode = Boolean(params?.id);
  const dispatch = useDispatch();
  const { dataOne } = useCategory();
  const navigation = useNavigate();

  const initialValues = useMemo(() => {
    if (dataOne) {
      return {
        id: dataOne.id,
        name: dataOne.name,
      };
    }

    return {
      name: "",
    };
  }, [dataOne]);

  useEffect(() => {
    if (!params?.id) return;
    dispatch(fetchCategoryById(params.id));

    return () => {
      dispatch(categoryActions.resetDataOne());
    };
  }, [params?.id]);

  const handleSubmit = (values) => {
    if (isUpdateMode) {
      dispatch(fetchUpdateCategory(values)).then((t) => {
        if (t?.payload?.success) {
          navigation("/admin/category");
        }
      });
    } else {
      dispatch(fetchAddCategory(values)).then((t) => {
        if (t?.payload?.success) {
          navigation("/admin/category");
        }
      });
    }
  };

  return (
    <Box>
      <Typography variant="h4">{isUpdateMode ? "Update Category" : "Add Category"}</Typography>

      <Box>
        <FormAddEditCategory
          initialValues={initialValues}
          isUpdateMode={isUpdateMode}
          onSubmit={handleSubmit}
        />
      </Box>
    </Box>
  );
}

export default AddEditCategory;
