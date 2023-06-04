import React from "react";
import Canvas from "components/Canvas";
import Sidebar from "components/Sidebar";
import CustomHeader from "components/Header";
import "./App.css";

export const SelectedNodeContext = React.createContext();

function App() {
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [messageToUpdate, setMessageToUpdate] = React.useState("");
  const [saveFlow, setSaveFlow] = React.useState(false);

  return (
    <div className="App">
      <SelectedNodeContext.Provider
        value={{
          selectedNode,
          setSelectedNode,
          messageToUpdate,
          setMessageToUpdate,
          saveFlow,
          setSaveFlow,
        }}
      >
        <CustomHeader />
        <div style={{ display: "flex" }}>
          {/* Flow section */}
          <div className="canvas-wrapper">
            <Canvas />
          </div>
          {/* Sidebar */}
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
        </div>
      </SelectedNodeContext.Provider>
    </div>
  );
}

export default App;
