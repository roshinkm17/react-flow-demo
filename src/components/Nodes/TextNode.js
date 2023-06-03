import { Handle, Position } from "reactflow"

export default function TextNode({ data }) {
    return (
        <div className="text-node drag">

            <Handle type="source" position={Position.Left} />

            <div>
                <p className="node-description">Message</p>
                <hr />
                <input type="text" name="text" />
            </div>

            <Handle type="target" position={Position.Right} />

        </div>
    )
}