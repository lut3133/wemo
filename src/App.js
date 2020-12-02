import './App.css'
import React from "react"
import {Header} from "./components/Header"
import FileList from "./components/MemoList"
function App() {
  return (
      <div>
        <Header/>
        <FileList/>
      </div>
  );
}

export default App;
