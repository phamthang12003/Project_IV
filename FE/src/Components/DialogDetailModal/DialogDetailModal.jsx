import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { colorStatus, convertStatus } from "../../utils/function";
import { formatPrice } from "../../utils/formatNumber";
import p36_img from "../Assets/product_36.png";

function DialogDetailModal({ open = false, onClose = () => {}, data = null }) {
  console.log("====================================");
  console.log(`data`, data);
  console.log("====================================");

  const getTotalCartAmount = React.useMemo(() => {
    if (!data.productOrders.length) return 0;

    return [...data.productOrders].reduce((t, v) => {
      if (v.discount) {
        return (t += (v.price - v.price * (v.discount / 100)) * v.quantity);
      }

      return (t += v.price * v.quantity);
    }, 0);
  }, [data]);

  return (
    <React.Fragment>
      <Dialog
        maxWidth="lg"
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Order Id " + data?.id}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Receiver: <b>{data?.receiver}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Receiver address: <b>{data?.receiverAddress}</b>
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            Phone Number: <b>{data?.phoneNumber}</b>
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            Status: <b style={{ color: colorStatus(data.status) }}>{convertStatus(data.status)}</b>
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">
            Total: <b style={{ color: "rebeccapurple" }}>{formatPrice(getTotalCartAmount)}</b>
          </DialogContentText>

          <DialogContentText id="alert-dialog-description">Product Orders</DialogContentText>

          <div className="cartitems-format-main">
            <p>Products</p>
            <p>Name</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
          </div>

          <hr />

          {data ? (
            data.productOrders.map((e) => {
              return (
                <div key={e.id}>
                  <div className="cartitems-format cartitems-format-main">
                    <img
                      src={e?.product?.image || p36_img}
                      alt=""
                      className="carticon-product-icon"
                    />

                    <p>{e?.product?.name}</p>

                    {e.discount ? (
                      <p>{formatPrice(e.price - e.price * (e.discount / 100))}</p>
                    ) : (
                      <p>{formatPrice(e.price)}</p>
                    )}

                    <button className="cartitems-quantity">{e.quantity}</button>

                    {e.discount ? (
                      <p>{formatPrice((e.price - e.price * (e.discount / 100)) * e.quantity)}</p>
                    ) : (
                      <p>{formatPrice(e.price * e.quantity)}</p>
                    )}
                  </div>
                  <hr />
                </div>
              );
            })
          ) : (
            <h1>Order is empty</h1>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button onClick={onClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default DialogDetailModal;
