import TextNodeSettings from "./Settings/TextNodeSettings";

export default function NodeSettings({ nodeType, setData }) {
  /* 
    Create custom node type to settings mapping.
    Shows the settings panel based on the selected node type.
  */

  /* IMPORTANT */
  /* PASS setData as a prop to every settings */

  if (nodeType == "textNode") return <TextNodeSettings setData={setData} />;

  /* New node types to be added here */

  return null;
}
