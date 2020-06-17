import React from "react";
import Movies from "./components/movies";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <main className="container">
        <Movies />
      </main>
    </React.Fragment>
  );
}

export default App;
