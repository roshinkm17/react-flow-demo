import React from 'react';
import Canvas from 'components/Canvas';
import Sidebar from 'components/Sidebar';
import CustomHeader from 'components/Header';
import './App.css';

function App() {
  return (
    <div className="App">

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

    </div>
  );
}

export default App;
