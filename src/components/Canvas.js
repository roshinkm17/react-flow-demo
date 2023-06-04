import { useRef, useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  updateEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodeTypes } from "nodeTypes";
import { useSelectedNode } from "./ContextProvider";
import { Snackbar } from "@material-ui/core";
import CustomAlert from "./Alert";
import DebugInfo from "./Debug";
import { debug } from "../constants";

export default function Canvas() {
  /* Generates node ids(node_1) on dropping into canvas */
  let id = 0;
  const getId = () => `node_${id++}`;

  const reactFlowWrapperRef = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  /* 
    Keeps state for message to be shown on the bottom snackbar
    More options can be added like duration, position, styles etc.
   */
  const [snackBarState, setSnackBarState] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { selectedNode, setSelectedNode, dataToUpdate, saveFlow, setSaveFlow } =
    useSelectedNode();

  /* 
    Canvas interaction functions.
    onDragOver: Prevents default browser behavior of opening the dragged element
    onDrop: Adds the dropped element to the canvas
    onConnect: Handles node connection
    edgeUpdatingFunctionsL: Handles edge removal.
    onSelectionChange: Handles node selection
  */

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const canvasBounds = reactFlowWrapperRef.current.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type) return;

      const position = reactFlowInstance.project({
        x: event.clientX - canvasBounds.left,
        y: event.clientY - canvasBounds.top,
      });

      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node`, message: "" },
      };

      setNodes((nodes) => [...nodes, newNode]);
    },
    [reactFlowInstance]
  );

  const onConnect = useCallback(
    (params) => setEdges((els) => addEdge(params, els)),
    []
  );

  const onEdgeUpdateStart = useCallback(() => {
    edgeUpdateSuccessful.current = false;
  }, []);

  const onEdgeUpdate = useCallback((oldEdge, newConnection) => {
    edgeUpdateSuccessful.current = true;
    setEdges((els) => updateEdge(oldEdge, newConnection, els));
  }, []);

  const onEdgeUpdateEnd = useCallback((_, edge) => {
    if (!edgeUpdateSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeUpdateSuccessful.current = true;
  }, []);

  const onSelectionChange = useCallback((elements) => {
    const selectedNode = elements.nodes[0];
    if (typeof selectedNode === "undefined" || !selectedNode) {
      setSelectedNode(null);
      return;
    }
    const selectedNodeId = selectedNode.id;

    /* 
      Add a class to the selected node has data-id="selectedNodeId"
      This is used to highlight the selected node
    */
    const selectedNodeElement = document.querySelector(
      `[data-id="${selectedNodeId}"]`
    );
    selectedNodeElement.classList.add("active");

    setSelectedNode(selectedNode);
  }, []);

  /* 
    Called when a node is updated from the settings panel.
    Updates the selected node with the updated message.
  */
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode?.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...dataToUpdate,
            },
          };
        }
        return node;
      })
    );
  }, [dataToUpdate]);

  /* 
    Check if any node is not connected to any other node.
    If yes, show an error message.
  */
  useEffect(() => {
    if (!saveFlow) return;

    const nodesWithEmptyTargetHandle = nodes.filter((node) => {
      const nodeEdges = edges.filter(
        (edge) => edge.target === node.id || edge.source === node.id
      );
      return nodeEdges.length === 0;
    });

    if (nodesWithEmptyTargetHandle.length > 0) {
      setSnackBarState({
        open: true,
        message: "Please connect all the nodes",
        type: "error",
      });
    } else {
      setSnackBarState({
        open: true,
        message: "Flow saved successfully",
        type: "success",
      });
    }

    setSaveFlow(false);
  }, [saveFlow]);

  return (
    <div className="canvas">
      {/* Disabled in production environment */}
      <DebugInfo selectedNode={selectedNode} debug={debug} />

      <ReactFlowProvider>
        <div ref={reactFlowWrapperRef} className="react-flow-provider-wrapper">
          <ReactFlow
            nodes={nodes}
            nodeTypes={nodeTypes}
            edges={edges}
            onConnect={onConnect}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onInit={setReactFlowInstance}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onSelectionChange={onSelectionChange}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <Snackbar
        open={snackBarState.open}
        autoHideDuration={2000}
        onClose={() => setSnackBarState({ ...snackBarState, open: false })}
        message={snackBarState.message}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
        children={<CustomAlert alert={snackBarState} />}
      />
    </div>
  );
}
