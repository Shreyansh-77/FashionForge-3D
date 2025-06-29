import { Canvas } from "@react-three/fiber"
import { Environment, Center } from "@react-three/drei"

import Shirt from "./Shirt"
import CameraRig from "./CameraRig"
import Backdrop from "./Backdrop"
import SceneBackground from "./SceneBackground"
import Pants from "./Pants";
import Trouser from "./Trouser";
import Shoes from "./Shoes";
import Hoodie from "./Hoodie";
import FullShirt from "./FullShirt";
import WomenShirt from "./WomenShirt";

import state from '../store';
import { useSnapshot } from "valtio"


const CanvasModel = () => {

  const snap = useSnapshot(state);

  let CurrentModel;
  switch (snap.modelId) {
    case 0:
      CurrentModel = <Shirt />;
      break;
    case 1:
      CurrentModel = <Pants />;
      break;
    case 2:
      CurrentModel = <Trouser />;
      break;
    case 3:
      CurrentModel = <Shoes />;
      break;
    case 4:
      CurrentModel = <Hoodie />;
      break;
    case 5:
      CurrentModel = <FullShirt />;
      break;
    case 6:
      CurrentModel = <WomenShirt />;
      break;
    default:
      CurrentModel = <Shirt />;
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 0], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
      className="w-full max-w-full h-full transition-all ease-in-out"
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 2, -5]} intensity={1} />
      <Environment preset="city" />
      <SceneBackground />
      <CameraRig>
        <Backdrop />
        <Center>
          <group key={snap.modelId} position={[0, -0.5, 0]}>
            {CurrentModel}
          </group>
          {/* <Shirt /> */}
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
