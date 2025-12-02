import React from 'react';
import './App.css';

/**
 * PUBLIC_INTERFACE
 * App - Legacy CRA demo component (not used in routing).
 * Kept for CRA test harness; does not manage theme anymore.
 */
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>UI Component Explorer</p>
        <p>App component is not used directly; see src/routes and MainLayout.</p>
      </header>
    </div>
  );
}

export default App;
