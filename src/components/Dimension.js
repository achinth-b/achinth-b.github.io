// import * as THREE from "three";
import React, { useRef, useState } from "react";
import './dimensions.css'
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

require("dotenv").config();
// let result;

// const bools = async () => {
//   var data = "";
//   var config = {
//     method: "get",
//     url: "https://api.spotify.com/v1/me/player/currently-playing",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//       Authorization:
//         "Bearer BQCSapb5W3vGi867hoJHXOhpR49B9O7AIrAyeNXnfHA5FsGnjSOOaNz99UPmigxSQdm1SpEMqa-eKY_QYh8-ykzDrEZSvKoi8ztTneoGnkd2OuAStFRV9po58ySdaDFhvL0Qxw2W1RDCBHX-ON-IhQ",
//     },
//   };

//   axios(config)
//     .then(function(response) {
//       let data = JSON.parse(JSON.stringify(response.data));
//       result = data;
//       console.log(data["is_playing"]);
//       return data["is_playing"];
//     })
//     .catch(function(error) {
//       console.log(error);
//       return false;
//     });
// };

// let amIListening = bools();

function Listening(props) {
  // This reference will give us direct access to the mesh
  const ref = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    ref.current.rotation.x = ref.current.rotation.y += 0.01;
  });
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <torusGeometry args={[2, 1, 64, 200]} />
      <meshNormalMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}

function NotListening(props) {
  const ref = useRef();
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);
  // Rotate mesh every frame, this is outside of React without overhead
  // useFrame(() => {
  //   ref.current.rotation.x = ref.current.rotation.y += 0.01
  // })
  return (
    <mesh
      {...props}
      ref={ref}
      scale={active ? 1.5 : 1}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <torusGeometry args={[4, 2, 128, 400]} />
      <meshStandardMaterial color={hovered ? "indianred" : "green"} />
    </mesh>
  );
}

export default function Dimension() {
  
    return (

        <div className="canvas">

        
    
        <Canvas >
          <Listening position={[0, 0, 0]} />
          <OrbitControls screenSpacePanning />
        </Canvas>

        </div>
       
      
    );
  }

