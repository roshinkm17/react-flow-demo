import { useRef, useState, useCallback, useMemo } from "react";
import ReactFlow, { Background, Controls, ReactFlowProvider, useNodesState, useEdgesState, addEdge, updateEdge } from "reactflow";
import 'reactflow/dist/style.css';
import { nodeTypes } from "nodeTypes";



export default function Canvas() {

    let id = 0;
    const getId = () => `node_${id++}`;

    const reactFlowWrapperRef = useRef(null);
    const edgeUpdateSuccessful = useRef(true);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);

    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);

    const onDragOver = useCallback((event) => {

        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';

    }, []);


    const onDrop = useCallback((event) => {

        event.preventDefault();

        const canvasBounds = reactFlowWrapperRef.current.getBoundingClientRect();
        const type = event.dataTransfer.getData('application/reactflow');

        if (typeof type === 'undefined' || !type) return;

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

    }, [reactFlowInstance]);


    const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), []);


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


    return (
        <div className="canvas">

            <ReactFlowProvider >

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
                    // fitView
                    >

                        <Background color="#aaa" gap={16} size={1} />
                        <Controls />

                    </ReactFlow>

                </div>

            </ReactFlowProvider>

        </div>
    )
}