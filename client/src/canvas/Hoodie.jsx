import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Hoodie = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/full_hoodie.glb');
  console.log("Nodes ---- ", nodes, "Materials ----", materials);

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const groupRef = useRef();
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
    setTargetRotationY((prev) => prev + deltaX * 0.01); 
  };

  // Animate shirt color
  useFrame((state, delta) => {
    const mat1 = materials["Jacket_M"];
    easing.dampC(mat1.color, snap.color, 0.25, delta);
  });

  // Animate shirt rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += (targetRotationY - groupRef.current.rotation.y) * 0.1;
    }
  });

  const stateString = JSON.stringify(snap);

  return (
    <group
      key={stateString}
      ref={groupRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      onPointerMove={handlePointerMove}
      cursor="grab"
    >
      <mesh
        geometry={nodes["jacket04_Jacket_M_0"].geometry}
        material={materials["Jacket_M"]}
        material-side={THREE.DoubleSide}
        castShadow
        position={[0, 0, 0]}
        scale={[0.004, 0.004, 0.004]}
        dispose={null}
      >{snap.isFullTexture && (
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          map={fullTexture}
        />
      )}
        {snap.isLogoTexture && (
          <Decal
            texture={logoTexture}
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={[0.15, 0.15, 0.15]}
            map={logoTexture}
            anisotropy={16}
            depthTest={false}
            depthWrite={true}
          />
        )}
      </mesh>
      <mesh
        geometry={nodes["jacket04_Layer_0"].geometry}
        material={materials["Layer"]}
        material-side={THREE.DoubleSide}
        castShadow
        scale={[0.004, 0.004, 0.004]}
        dispose={null}
      />
      <mesh
        geometry={nodes["jacket04_Layer_2_0"].geometry}
        material={materials["Layer_2"]}
        material-side={THREE.DoubleSide}
        castShadow
        scale={[0.004, 0.004, 0.004]}
        dispose={null}
      />
      <mesh
        geometry={nodes["jacket04_Zipper_0"].geometry}
        material={materials["Zipper"]}
        material-side={THREE.DoubleSide}
        castShadow
        scale={[0.004, 0.004, 0.004]}
        dispose={null}
      />
      <mesh
        geometry={nodes["pants01_Pants_M_0"].geometry}
        material={materials["Pants_M"]}
        material-side={THREE.DoubleSide}
        castShadow
        scale={[0.004, 0.004, 0.004]}
        dispose={null}
      />
      <mesh
        geometry={nodes["pants01_buttons_0"].geometry}
        material={materials["buttons"]}
        material-side={THREE.DoubleSide}
        castShadow
        scale={[0.004, 0.004, 0.004]}
        dispose={null}
      />
      <mesh
        geometry={nodes["shirt01_Shirt_M_0"].geometry}
        material={materials["Shirt_M"]}
        material-side={THREE.DoubleSide}
        castShadow
        scale={[0.004, 0.004, 0.004]}
        dispose={null}
      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0.1, 0.2]} // increase Y/Z a little
            rotation={[0, 0, 0]}
            scale={[10, 10, 10]}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            map={logoTexture}
            position={[0, 0.1, 0.15]}
            rotation={[0, 0, 0]}
            scale={[1.05, 1.05, 1.05]}
            anisotropy={16}
            depthTest={true}
            depthWrite={false}
          />
        )}
      </mesh>
    </group >
  );
};

export default Hoodie;
