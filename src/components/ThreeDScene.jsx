import { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Model from './Model'

export default function ThreeDScene({ 
  scale, 
  position,
  modelNo = 1
}) {
  const modelRef = useRef()

  return (
    <>
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[10, 10, 10]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.8} />
      <Model 
        ref={modelRef} 
        scale={scale} 
        position={position}
        modelNo={modelNo}
      />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </>
  )
}