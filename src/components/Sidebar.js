import TextNodePreview from "./CustomNodePreview";
import { Button } from "@material-ui/core";
import { useSelectedNode } from "./ContextProvider";
import TextNodeSettings from "./Settings/TextNodeSettings";
import React from "react";
import NodeSettings from "./NodeSettings";
import NodePreviews from "./NodePreviews";

export default function Sidebar() {
  const { selectedNode, setDataToUpdate } = useSelectedNode();
  const [saveData, setSaveData] = React.useState(false);

  return (
    <div className="sidebar">
      <div className="custom-nodes-wrapper">
        {/* All custom node preview components should be added inside this */}
        {selectedNode ? (
          <NodeSettings nodeType={selectedNode.type} setData={setSaveData} />
        ) : (
          <NodePreviews />
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
              setDataToUpdate(saveData);
            }}
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}
