import React from "react";
import "./App.css";
import { FaLinkedin, FaEnvelope, FaGithub } from "react-icons/fa";
import Dimension from "./components/Dimension";
import Typewriter from "typewriter-effect";

function App() {
  let year = new Date();
  const email = <FaEnvelope className="icon" />;
  const linkedin = <FaLinkedin className="icon" />;
  const github = <FaGithub className="icon" />;

  const title = (
    <div className="title">
      <Typewriter
        options={{
          strings: ["achinth bharadwaj", "ಅಚಿಂತ್ ಭಾರದ್ವಾಜ್"],
          autoStart: true,
          cursor: "",
          loop: true,
        }}
      />
    </div>
  );
  const subtitle = (
    <div className="sub">
      fourth year computer science and statistics student @ ubc.
    </div>
  );

  const workVibe = (
    <div className="sub">
      intern <a href='https://tesla.com'>@tesla</a> <br />
      about to intern <a href='https://about.facebook.com/meta'>@meta</a> <br />
      former <a href='https://www.boeing.ca/boeing-in-canada/boeing-vancouver.page'>@boeing</a> and  <a href='https://covalenthq.com'>@covalent</a> <br />
      always hunting for ventures and fellowships in machine learning,
      software dev and data science.
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
    </div>
  );

  return (
    
      <div className="App">
        <div className="App-header">
          {title}


          <Dimension />

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
