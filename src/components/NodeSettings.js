import { TextField } from "@material-ui/core";
import { useSelectedNode } from "./ContextProvider";
import { useState } from "react";

export default function NodeSettings({ textMessage, setTextMessage }) {
  const { selectedNode, setSelectedNode, setSaveData } = useSelectedNode();
  return (
    <div className="node-settings">
      <h4>Message</h4>
      <TextField
        fullWidth
        multiline
        value={selectedNode.data.label}
        variant="outlined"
        placeholder="Type your message here"
        onChange={(e) => {
          setTextMessage(e.target.value);
        }}
      />
    </div>
  );
}
