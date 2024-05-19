import React from "react";
import "./App.css";
import Main from "./components/Main"
import Resume from "./components/Resume"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {

  let year = new Date();
  
  return (
    
      <div className="App">
        <div className="App-header">
          
          <BrowserRouter>
            <Routes>
              <Route path = "/" element = {<Main/>} />
              <Route path = "/resume" element = {<Resume/>}/>
            </Routes>
          </BrowserRouter>
         
        </div>

        <div className="footer">
         
          made with 💖, achinth © {year.getFullYear()}.{" "}
        </div>
      </div>
    
  );
}

export default App;
