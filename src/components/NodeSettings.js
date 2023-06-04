import { TextField } from "@material-ui/core";
import { useSelectedNode } from "./ContextProvider";
import React, { useEffect } from "react";

export default function NodeSettings({ setData }) {
  const { selectedNode } = useSelectedNode();
  const [defaultData, setDefaultData] = React.useState("");

  useEffect(() => {
    setDefaultData(selectedNode.data.message);
  }, [selectedNode]);

  return (
    <div className="node-settings">
      <h4>Message</h4>
      <TextField
        fullWidth
        multiline
        defaultValue={defaultData}
        variant="outlined"
        placeholder="Type your message here"
        onChange={(e) => {
          setData(e.target.value);
        }}
      />
    </div>
  );
}
