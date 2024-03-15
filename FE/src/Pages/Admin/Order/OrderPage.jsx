import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Container from "@mui/material/Container";
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
import * as React from "react";
import { useDispatch } from "react-redux";
import DialogDetailModal from "../../../Components/DialogDetailModal";
import { formatDate } from "../../../utils/formatNumber";
import { colorStatus, convertStatus } from "../../../utils/function";
import { orderActions, useOrder } from "./../../../features/order/orderSlice";
import { fetchAllOrder, fetchChangeStatus } from "./../../../features/order/orderThunk";

function OrderPage() {
  const dispatch = useDispatch();
  const { filters, data, pagination } = useOrder();
  const [detail, setDetail] = React.useState(null);

  React.useEffect(() => {
    dispatch(fetchAllOrder({ ...filters }));

    return () => {
      dispatch(orderActions.resetValue());
    };
  }, [filters]);

  const handleChangePage = (e, p) => {
    dispatch(orderActions.setFilters({ ...filters, page: p }));
  };

  const onClickSeeDetail = (payload) => {
    setDetail(payload);
  };

  const handleCloseDetail = () => {
    setDetail(null);
  };

  const onChangeStatus = (id) => {
    const confirm = window.confirm("Are you sure change status order id " + id);

    if (confirm) {
      dispatch(fetchChangeStatus(id)).then((t) => {
        if (t?.payload?.success) {
          dispatch(fetchAllOrder({ ...filters }));
        }
      });
    }
  };

  return (
    <Container maxWidth="xl" sx={{ my: 4 }}>
      <Typography variant="h4">List Ordered</Typography>

      {detail ? (
        <DialogDetailModal open={detail} onClose={handleCloseDetail} data={detail} />
      ) : null}

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Order Id</TableCell>
              <TableCell align="right">Receiver</TableCell>
              <TableCell align="right">Phone Number</TableCell>
              <TableCell align="right">Receiver Address</TableCell>
              <TableCell align="right">Order Date</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">See detail</TableCell>
              <TableCell align="right">Change Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length ? (
              data.map((row) => (
                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {row.id}
                  </TableCell>
                  <TableCell align="right">{row.receiver}</TableCell>
                  <TableCell align="right">{row.phoneNumber}</TableCell>
                  <TableCell align="right">{row.receiverAddress}</TableCell>
                  <TableCell align="right">{formatDate(row.createdAt)}</TableCell>
                  <TableCell align="right">
                    <p style={{ color: colorStatus(row.status), fontWeight: "bold" }}>
                      {convertStatus(row.status)}
                    </p>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => onClickSeeDetail(row)}
                      aria-label="see"
                      disabled={!row.productOrders.length}
                      color="primary"
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => onChangeStatus(row.id)}
                      aria-label="see"
                      disabled={!row.productOrders.length || row.status === 2}
                      color="primary"
                    >
                      <ChangeCircleIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell colSpan={5} align="center" component="th" scope="row">
                  Order is empty
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
    </Container>
  );
}

export default OrderPage;
