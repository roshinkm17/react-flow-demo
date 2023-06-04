import { Handle, Position, getConnectedEdges, useReactFlow } from "reactflow";
import { Card, CardHeader, CardContent, TextField } from "@material-ui/core";
import { MessageRounded } from "@material-ui/icons";
import { useCallback, useEffect } from "react";
import { useSelectedNode } from "components/ContextProvider";

export default function TextNode({ data }) {
  /* 
    Check the validity of the edge.
    The edge can only have one source but can have multiple targets.
  */
  const useValidatorFn = () => {
    const { getNode, getEdges } = useReactFlow();

    return useCallback(
      (connection) => {
        const edges = getConnectedEdges(
          [getNode(connection.target)],
          getEdges()
        );
        return !edges.length;
      },
      [getNode, getEdges]
    );
  };

  return (
    <div className="text-node drag">
      <Handle
        type="source"
        position={Position.Left}
        style={{ height: "10px", width: "10px" }}
        isValidConnection={useValidatorFn()}
      />

      <Card>
        <CardHeader
          style={{ backgroundColor: "lightblue" }}
          title="Message"
          avatar={<MessageRounded />}
        />
        <CardContent>
          <p>{data?.message}</p>
        </CardContent>
      </Card>

      <Handle
        type="target"
        position={Position.Right}
        style={{ height: "10px", width: "10px" }}
        isValidConnection={useValidatorFn()}
      />
    </div>
  );
}
