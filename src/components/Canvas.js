import { useRef, useState, useCallback, useMemo, useEffect } from "react";
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

export default function Canvas() {
  let id = 0;
  const getId = () => `node_${id++}`;

  const reactFlowWrapperRef = useRef(null);
  const edgeUpdateSuccessful = useRef(true);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { selectedNode, setSelectedNode, saveData } = useSelectedNode();

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
        data: { label: `${type} node` },
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
    console.log(selectedNodeId);

    // Add a class to the selected node has data-id="selectedNodeId"
    const selectedNodeElement = document.querySelector(
      `[data-id="${selectedNodeId}"]`
    );
    console.log("Selected node element: ", selectedNodeElement);
    selectedNodeElement.classList.add("active");
    setSelectedNode(selectedNode);
  }, []);

  useEffect(() => {
    // Update the node label when the saveData changes
    if (selectedNode) {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === selectedNode.id) {
            node.data.label = saveData;
          }
          return node;
        })
      );
    }
    console.log("Updated nodes");
    console.log("Save data: ", saveData);
  }, [saveData]);

  return (
    <div className="canvas">
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
            // fitView
          >
            <Background color="#aaa" gap={16} size={1} />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}
