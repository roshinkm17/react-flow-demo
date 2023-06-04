import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { SaveRounded } from "@material-ui/icons";
import React from "react";
import { useSelectedNode } from "./ContextProvider";

export default function CustomHeader() {
  const { setSaveFlow } = useSelectedNode();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Chat 🤖 Flow Builder
          </Typography>
          <Button
            color="inherit"
            variant="outlined"
            endIcon={<SaveRounded />}
            onClick={() => {
              setSaveFlow(true);
            }}
          >
            Save Changes
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
