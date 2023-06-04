import { MessageRounded } from "@material-ui/icons";
import CustomNodePreview from "./CustomNodePreview";

export default function NodePreviews({ nodeType }) {
  /* 
    Creates custom node type to node preview mapping.
    Shows on the sidebar as the list of available nodes.
    */

  const nodeList = [
    <CustomNodePreview
      nodeTypeName="textNode"
      icon={<MessageRounded />}
      title={"Message"}
    />,
  ];
  return <div>{nodeList}</div>;

  /* New node types to be added in the nodeList Array */
}
