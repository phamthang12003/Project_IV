import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Pagination from "@mui/material/Pagination";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productActions, useProduct } from "../../../features/products/productSlice";
import { fetchAllProduct, fetchDeleteProduct } from "../../../features/products/productThunk";
import { formatPrice } from "../../../utils/formatNumber";

function ProductPage() {
  const { data, filters, pagination } = useProduct();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllProduct(filters));
  }, [filters]);

  const handleChangePage = (e, p) => {
    dispatch(productActions.setFilters({ ...filters, page: p }));
  };

  const handleDelete = (id) => {
    const confirm = window.confirm("Are you sure delete product with id = " + id);

    if (confirm) {
      dispatch(fetchDeleteProduct(id)).then((t) => {
        if (t?.payload?.success) {
          dispatch(fetchAllProduct(filters));
        }
      });
    }
  };

  return (
    <Box>
      <Stack mb={2} justifyContent={"space-between"} flexDirection={"row"} alignItems={"center"}>
        <Typography variant="h4">List Product</Typography>

        <Button
          variant="contained"
          component={Link}
          to="/admin/product/add"
          startIcon={<AddIcon />}
        >
          Add Product
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Id</TableCell>
              <TableCell align="right">Product</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right">Description</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Discount</TableCell>
              <TableCell align="right">Populate</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      component="img"
                      src={row.image}
                      sx={{ width: 80, height: 80, objectFit: "cover" }}
                      loading="lazy"
                    />
                  </TableCell>

                  <TableCell align="right">{row.name}</TableCell>

                  <TableCell align="right">{row.category}</TableCell>

                  <TableCell align="right">{row.description}</TableCell>

                  <TableCell align="right">{formatPrice(row.price)}</TableCell>

                  <TableCell align="right">
                    <b>{row.discount}%</b>
                  </TableCell>

                  <TableCell align="right">
                    <b>{row.isPopulate ? "YES" : "NO"}</b>
                  </TableCell>

                  <TableCell align="right">
                    <IconButton
                      component={Link}
                      to={`/admin/product/update/${row.id}`}
                      aria-label="see"
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(row.id)} aria-label="see" color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell colSpan={5} align="center" component="th" scope="row">
                  Product is empty
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <Stack spacing={2} mb={2}>
          <Pagination
            count={pagination.totalPage}
            page={pagination.pageIndex}
            onChange={handleChangePage}
          />
        </Stack>
      </TableContainer>
    </Box>
  );
}

export default ProductPage;
