import React from "react";
import Canvas from "components/Canvas";
import Sidebar from "components/Sidebar";
import CustomHeader from "components/Header";
import "./App.css";

export const SelectedNodeContext = React.createContext();

function App() {
  const [selectedNode, setSelectedNode] = React.useState(null);
  const [saveData, setSaveData] = React.useState(null);

  return (
    <div className="App">
      <CustomHeader />

      <SelectedNodeContext.Provider
        value={{ selectedNode, setSelectedNode, saveData, setSaveData }}
      >
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
