import { useLoader, useThree } from '@react-three/fiber'
import { TextureLoader } from 'three'
import { useEffect } from 'react'

const SceneBackground = () => {
  const texture = useLoader(TextureLoader, '/wall7.png')
  const { scene } = useThree()

  useEffect(() => {
    scene.background = texture
  }, [scene, texture])

  return null
}

export default SceneBackground;