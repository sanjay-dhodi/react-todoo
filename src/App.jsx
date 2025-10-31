import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Homepage from "./page/Homepage";

function App() {
  return (
    <>
      <main className="flex items-center h-screen  bg-gray-300">
        <Homepage />
      </main>
    </>
  );
}

export default App;
