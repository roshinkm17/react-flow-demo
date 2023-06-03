import { Handle, Position } from "reactflow";
import { Card, CardHeader, CardContent, TextField } from "@material-ui/core";
import { MessageRounded } from "@material-ui/icons";

export default function TextNode({ data }) {
  return (
    <div className="text-node drag">
      <Handle type="source" position={Position.Left} style={{ height: "10px", width: "10px" }} />

      <Card>
        <CardHeader style={{ backgroundColor: "lightblue" }} title="Message" avatar={<MessageRounded />} />
        <CardContent>
          <TextField fullWidth multiline variant="outlined" onChange={(e) => (data.text = e.target.value)} placeholder="Type your message here" />
        </CardContent>
      </Card>

      <Handle type="target" position={Position.Right} style={{ height: "10px", width: "10px" }} />
    </div>
  );
}
