import TextNodePreview from "./Previews/TextNodePreview";
import { Button } from "@material-ui/core";
import { useSelectedNode } from "./ContextProvider";
import NodeSettings from "./NodeSettings";
import React from "react";

export default function Sidebar() {
  const { selectedNode, setSelectedNode, setMessageToUpdate } =
    useSelectedNode();
  const [saveData, setSaveData] = React.useState(false);

  return (
    <div className="sidebar">
      <div className="custom-nodes-wrapper">
        {/* All custom node preview components should be added inside this */}
        {selectedNode ? (
          <NodeSettings setData={setSaveData} />
        ) : (
          <TextNodePreview />
        )}
      </div>

      <div className="sidebar-footer">
        {selectedNode && (
          <Button
            variant="contained"
            color="primary"
            className="save-btn"
            disableElevation
            fullWidth
            onClick={() => {
              setMessageToUpdate(saveData);
            }}
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}
