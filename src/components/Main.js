import React from "react";
import "./../App.css";
import { FaLinkedin, FaEnvelope, FaGithub} from "react-icons/fa";
import {SiSubstack} from "react-icons/si";
import Dimension from "./Dimension";
import {BrowserRouter, Routes, Route} from "react-router-dom"

function Main() {
  
  const email = <FaEnvelope className="icon" />;
  const linkedin = <FaLinkedin className="icon" />;
  const github = <FaGithub className="icon" />;
  const substack = <SiSubstack className="icon" />;
  let year = new Date();

  
  const title = (
    <div className="title">
      {/* <Typewriter
        options={{
          strings: ["achinth bharadwaj", "@bigdaddytwochinz"],
          autoStart: true,
          cursor: "",
          loop: true,
        }}
      /> */}
      achinth bharadwaj
    </div>
  );

  const location = (
    <div className="sub">
      📍 nyc / vancouver, bc
    </div>
  )

  const subtitle = (
    <div className="sub">
       cs + stats  <a href = "https://cs.ubc.ca">@ubc</a> / <a href='https://www.palantir.com'>@palantir</a>  <br />
    </div>
  );

  const workVibe = (
    <div className="sub">
      research <a href = "https://www.cs.ubc.ca/students/undergrad/research-and-conferences/undergraduate-student-research-awards">@ubc </a> s'23 / <a href='https://about.facebook.com/meta'>@meta</a> s'22 / <a href='https://tesla.com'>@tesla</a> f'21 / <a href='https://covalenthq.com'>@covalent</a> s'21 / <a href='https://www.boeing.ca/boeing-in-canada/boeing-vancouver.page'>@boeing</a> w & s'20
       <br />
    </div>
  );

  const always =  (
    <div className="sub">
      here to research algorithmic fairness by reassessing our canonical assumptions, machine learning, engineering, but distracted by the ultimate and politics.
    </div>
  );

  const footer = (
    
    <div className="sub">
          made with 💖, achinth © {year.getFullYear()}.{" "}
        </div>
  )

   const menu = (
    <div className="menu">

      <ul>
      <li>
          <a href="/"> home </a>
        </li>
        <li>
          <a href="/posts"> posts </a>
        </li>
        <li>
          <a href="/papers"> papers </a>
        </li>
        
        <br/>
        
        <li>
          <a href="https://linkedin.com/in/-achinth"> linkedin </a>
        </li>
        <li>
          <a href="https://github.com/achinth-b"> github </a>
        </li>
        <li>
          <a href="https://x.com/bigdaddy2chinz"> twitter </a>
        </li>
        <li>
          <a href="mailto:achinth@student.ubc.ca?subject=Hi Achinth!"> email </a>
        </li>
      </ul>

    </div>
  )


  const style = {
    display: "flex",
    alignItems: "center", 
    justifyContent: 'center',
    height: '100vh'

  }

  return (
    
      <div style={style}>
      
        <div>         
      
          {title}
          

          
          <Dimension />
          {location}
          {subtitle}
          {workVibe}
          {always}

          <br />
    
          {footer}
        </div>
        {menu}
      </div>
    
  );
}

export default Main;
