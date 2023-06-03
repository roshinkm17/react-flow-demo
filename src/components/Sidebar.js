import TextNodePreview from "./Previews/TextNodePreview";
import { Button } from "@material-ui/core";
import { useSelectedNode } from "./ContextProvider";
import NodeSettings from "./NodeSettings";
import { useState } from "react";
import { useReactFlow } from "reactflow";

export default function Sidebar() {
  const { selectedNode, setSelectedNode, setSaveData } = useSelectedNode();
  const [textMessage, setTextMessage] = useState("");

  const handleSave = () => {
    setSaveData(textMessage);
  };

  return (
    <div className="sidebar">
      <div className="custom-nodes-wrapper">
        {/* All custom node preview components should be added inside this */}
        {selectedNode ? (
          <NodeSettings
            textMessage={textMessage}
            setTextMessage={setTextMessage}
          />
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
            onClick={() => handleSave()}
          >
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}
