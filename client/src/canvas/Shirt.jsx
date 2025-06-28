// import React from 'react'
// import { easing } from 'maath'
// import { useFrame } from '@react-three/fiber'
// import { useSnapshot } from 'valtio'
// import { Decal, useGLTF, useTexture } from '@react-three/drei'

// import state from '../store'

// const Shirt = () => {
//     const snap = useSnapshot(state);
//     const { nodes, materials } = useGLTF('/shirt_baked.glb');
//     const logoTexture = useTexture(snap.logoDecal);
//     const fullTexture = useTexture(snap.fullDecal);

//     useFrame((state, delta) => {easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)})

//     const stateString = JSON.stringify(snap);

//     return (
//         <group key={stateString}>
//             <mesh
//                 castShadow
//                 geometry={nodes.T_Shirt_male.geometry}
//                 material={materials.lambert1}
//                 material-roughness={1}
//                 dispose={null}
//             >{snap.isFullTexture && (
//                 <Decal
//                     position={[0, 0, 0]}
//                     rotation={[0, 0, 0]}
//                     scale={[1, 1, 1]}
//                     map={fullTexture}
//                 />
//             )}
//                 {snap.isLogoTexture && (
//                     <Decal
//                         texture={logoTexture}
//                         position={[0, 0.04, 0.15]}
//                         rotation={[0, 0, 0]}
//                         scale={[0.15, 0.15, 0.15]}
//                         map={logoTexture}
//                         anisotropy={16}
//                         depthTest={false}
//                         depthWrite={true}
//                     />
//                 )
//                 }
//             </mesh>
//         </group>
//     )
// }

// export default Shirt

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Decal } from '@react-three/drei';
import state from '../store';

const Shirt = () => {
  const { nodes, materials } = useGLTF('/shirt_baked.glb');
  const logoTexture = useTexture(state.logoDecal);
  const fullTexture = useTexture(state.fullDecal);

  const shirtRef = useRef();

  // Rotation state
  const [targetRotationY, setTargetRotationY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [prevX, setPrevX] = useState(0);

  const handlePointerDown = (e) => {
    setIsDragging(true);
    setPrevX(e.clientX);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;

    const deltaX = e.clientX - prevX;
    setPrevX(e.clientX);

    setTargetRotationY((prev) => prev + deltaX * 0.01); // Adjust sensitivity here
  };

  // Smoothly interpolate toward target rotation
  useFrame(() => {
    if (shirtRef.current) {
      shirtRef.current.rotation.y += (targetRotationY - shirtRef.current.rotation.y) * 0.1;
    }
  });

  return (
    <group
      ref={shirtRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      cursor="grab"
    >
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert1}
        material-side={2}
        material-roughness={1}
        dispose={null}
      >
        {state.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {state.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
