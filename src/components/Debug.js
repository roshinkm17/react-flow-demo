export default function DebugInfo({ selectedNode, debug }) {
  if (!debug) return null;
  return (
    <div className="debug-info">
      <p className="small">DEBUG</p>
      <p>id:{selectedNode?.id}</p>
      <p>label:{selectedNode?.data.label}</p>
      <p>message:{selectedNode?.data.message}</p>
    </div>
  );
}
