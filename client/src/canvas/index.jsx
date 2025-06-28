import { Canvas } from "@react-three/fiber"
import { Environment, Center } from "@react-three/drei"

import Shirt from "./Shirt"
import CameraRig from "./CameraRig"
import Backdrop from "./Backdrop"
import SceneBackground from "./SceneBackground"

const CanvasModel = () => {
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
          <Shirt />
        </Center>
      </CameraRig>
    </Canvas>
  )
}

export default CanvasModel
