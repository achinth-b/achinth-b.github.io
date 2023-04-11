import React from "react";
import "./App.css";
import { FaLinkedin, FaEnvelope, FaGithub} from "react-icons/fa";
import {SiSubstack} from "react-icons/si";
import Dimension from "./components/Dimension";
import Typewriter from "typewriter-effect";

function App() {
  let year = new Date();
  const email = <FaEnvelope className="icon" />;
  const linkedin = <FaLinkedin className="icon" />;
  const github = <FaGithub className="icon" />;
  const substack = <SiSubstack className="icon" />;
  

  const title = (
    <div className="title">
      <Typewriter
        options={{
          strings: ["achinth bharadwaj", "@bigdaddytwochinz"],
          autoStart: true,
          cursor: "",
          loop: true,
        }}
      />
    </div>
  );

  const location = (
    <div className="sub">
      📍 nyc / vancouver, bc
    </div>
  )

  const subtitle = (
    <div className="sub">
      fifth-year cs + stats major <a href = "https://cs.ubc.ca">@ubc</a> /
      about to ft  <a href='https://www.palantir.com'>@palantir</a> / research <a href = "https://www.cs.ubc.ca/students/undergrad/research-and-conferences/undergraduate-student-research-awards">@ubc</a>. <br />
    </div>
  );

  const workVibe = (
    <div className="sub">
      former <a href='https://about.facebook.com/meta'>@meta</a> summer '22 / <a href='https://tesla.com'>@tesla</a> fall '21 / <a href='https://covalenthq.com'>@covalent</a> summer '21 / <a href='https://www.boeing.ca/boeing-in-canada/boeing-vancouver.page'>@boeing</a> winter & summer '20
    
       <br />
      always hunting for ventures and fellowships in machine learning,
      software engineering and data science.
    </div>
  );

  const links = (
    <div>
      <button
        className="button"
        onClick={() => window.open("https://linkedin.com/in/achinthb")}
      >
        {linkedin}
      </button>

      <button
        className="button"
        onClick={() => window.open("https://github.com/achinth-b")}
      >
        {github}
      </button>

      <button
        className="button"
        onClick={() =>
          window.open("mailto:achinth@student.ubc.ca?subject=Hey Achinth!")
        }
      >
        {email}
      </button>

      <button
        className="button"
        onClick={() =>
          window.open("https://achinth.substack.com")
        }
      >
        {substack}
      </button>
    </div>
  );

  return (
    
      <div className="App">
        <div className="App-header">
          {title}

          
          <Dimension />
          {location}
          {subtitle}
          {workVibe}

          <br />
          {links}
        </div>

        <div className="footer">
         
          made with 💖, achinth © {year.getFullYear()}.{" "}
        </div>
      </div>
    
  );
}

export default App;
