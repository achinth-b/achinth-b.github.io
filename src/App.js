import React from "react";
import "./App.css";
import Main from "./components/Main"
import Blog from "./components/Blog";
// import Resume from "./components/Resume"
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {

  
  return (
    
      <div className="App">
        <div className="App-header">
          
          <BrowserRouter>
            <Routes>
              <Route path = "/" element = {<Main/>} />
              {/* <Route path = "/resume" element = {<Resume/>}/> */}
              <Route path ='/posts' element = {<Blog/>} />
            </Routes>
          </BrowserRouter>
         
        </div>

        
      </div>
    
  );
}

export default App;
