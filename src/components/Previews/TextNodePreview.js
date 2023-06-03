import { onPreviewNodeDragStart } from "utils";
import { Card, CardHeader } from "@material-ui/core";
import { MessageRounded } from "@material-ui/icons";

export default function TextNodePreview({ data }) {
  return (
    <div
      className="text-node drag"
      draggable
      onDragStart={(event) => onPreviewNodeDragStart(event, "textNode")}
    >
      <Card className="text-node-card node-card" elevation={1}>
        <CardHeader title={"Message"} avatar={<MessageRounded />} />
      </Card>
    </div>
  );
}
