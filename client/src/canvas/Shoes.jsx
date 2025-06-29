import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const Shoes = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/sport_shoes.glb');

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
    setTargetRotationY((prev) => prev + deltaX * 0.01); // adjust sensitivity
  };

  useFrame((state, delta) => {
    // easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    const mat1 = materials["Material0-material"];
    easing.dampC(mat1.color, snap.color, 0.25, delta);
  });

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

      {Object.keys(nodes).map((key) => {
  const node = nodes[key];
  if (!node.isMesh) return null;

  const isTargetMaterial = node.material?.name === 'Material0-material';

  return (
    <mesh
      key={key}
      geometry={node.geometry}
      material={node.material}
      material-side={THREE.DoubleSide}
      castShadow
      position={[0, 0, 0]}
      rotation={[4.7, 0, 0]}
      scale={[0.6, 0.22, 0.3]}
    >
      {isTargetMaterial && snap.isFullTexture && (
        <Decal
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={[1, 1, 1]}
          map={fullTexture}
        />
      )}
      {isTargetMaterial && snap.isLogoTexture && (
        <Decal
          texture={logoTexture}
          position={[0, 0.04, 0.15]}
          rotation={[0, 0, 0]}
          scale={[0.95, 0.75, 0.95]}
          map={logoTexture}
          anisotropy={16}
          depthTest={false}
          depthWrite={true}
        />
      )}
    </mesh>
  );
})}
    </group >
  );
};

export default Shoes;
