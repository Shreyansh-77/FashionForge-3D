import React, { useRef, useState } from 'react';
import { easing } from 'maath';
import { useFrame } from '@react-three/fiber';
import { useSnapshot } from 'valtio';
import { Decal, useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

import state from '../store';

const FullShirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF('/full_shirt.glb');

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

  // Animate shirt color
  useFrame((state, delta) => {
    // easing.dampC(materials.lambert1.color, snap.color, 0.25, delta);
    easing.dampC(materials.Shirt.color, snap.color, 0.25, delta);
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
        geometry={nodes.defaultMaterial.geometry}
        material={materials.Shirt}
        castShadow
        receiveShadow
        dispose={null}
        material-side={THREE.DoubleSide}
        scale={[0.5, 0.5, 0.5]}

      >
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={[1.5, 1.5, 1.5]}
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
    </group >
  );
};

export default FullShirt;