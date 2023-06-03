export const onPreviewNodeDragStart = (event, nodeType) => {

    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';


}