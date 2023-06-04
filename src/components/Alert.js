import { Alert } from "@mui/material";

export default function CustomAlert({ alert }) {
  return (
    <Alert severity={alert?.type} variant="outlined" sx={{ bgcolor: "white" }}>
      {alert?.message}
    </Alert>
  );
}
