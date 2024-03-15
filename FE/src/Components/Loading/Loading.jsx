import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useApp } from "../../features/app/appSlice";

function Loading() {
  const { loading } = useApp();

  return (
    <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 4 }} open={loading}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default Loading;
