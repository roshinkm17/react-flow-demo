import { onPreviewNodeDragStart } from "utils"

export default function TextNodePreview({ data }) {

    return (
        <div className="text-node drag" draggable onDragStart={(event) => onPreviewNodeDragStart(event, 'textNode')}>
            <p className="node-description">Text</p>
        </div>
    )
}