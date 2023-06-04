import { onPreviewNodeDragStart } from "utils";
import { Card, CardHeader } from "@material-ui/core";

export default function CustomNodePreview({
  nodeTypeName = "input",
  title,
  icon,
}) {
  return (
    <div
      className="text-node drag"
      draggable
      onDragStart={(event) => onPreviewNodeDragStart(event, nodeTypeName)}
    >
      <Card className="text-node-card node-card" elevation={1}>
        <CardHeader title={title} avatar={icon} />
      </Card>
    </div>
  );
}
