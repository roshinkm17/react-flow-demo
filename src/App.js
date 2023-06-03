import React from 'react';
import Canvas from 'components/Canvas';
import Sidebar from 'components/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">

      <header style={{ height: "10vh", border: "1px solid black" }}>
        <h1>Header</h1>
      </header>

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

    </div>
  );
}

export default App;
