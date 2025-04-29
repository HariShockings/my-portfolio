import { useGLTF, useAnimations } from '@react-three/drei'
import { forwardRef, useState, useEffect } from 'react'
import * as THREE from 'three'

// Preload both GLB files
useGLTF.preload('/assets/3d-model.glb')
useGLTF.preload('/assets/magic.glb')

const Model = forwardRef(({ scale, position, modelNo = 1 }, ref) => {
  const [gltf, setGltf] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const { actions, mixer } = useAnimations(gltf?.animations || [], ref)

  // Get model path based on modelNo
  const getModelPath = () => {
    return modelNo === 1 ? '/assets/3d-model.glb' : '/assets/magic.glb'
  }

  // Load the model with retry logic
  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError(null)

    const loadModel = async (attempt = 1) => {
      try {
        const modelPath = getModelPath()
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error(`Timeout loading ${modelPath} (Attempt ${attempt})`)), 15000) // Increased timeout
        })
        const gltfPromise = useGLTF(modelPath)
        const loadedGltf = await Promise.race([gltfPromise, timeoutPromise])

        if (isMounted) {
          // Apply uniform scale and position
          loadedGltf.scene.scale.set(scale, scale, scale)
          loadedGltf.scene.position.set(position[0], position[1], position[2])

          // Enable shadow casting for all meshes
          loadedGltf.scene.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
            }
          })

          setGltf(loadedGltf)
          setError(null)
          setIsLoading(false)
        }
      } catch (err) {
        console.warn(`Model loading attempt ${attempt}:`, err)
        if (isMounted && attempt < 3) {
          setTimeout(() => loadModel(attempt + 1), 1000)
        } else if (isMounted) {
          setError(err.message || 'Failed to load model')
          setIsLoading(false)
        }
      }
    }

    loadModel()

    return () => {
      isMounted = false
    }
  }, [scale, position, modelNo])

  // Manage infinite looping animation
  useEffect(() => {
    if (gltf && actions && mixer) {
      const availableAnimations = Object.keys(actions)
      if (availableAnimations.length > 0) {
        const action = actions[availableAnimations[0]]

        // Configure animation to loop infinitely
        action.setLoop(THREE.LoopRepeat, Infinity)
        action.zeroSlopeAtEnd = true // Prevent positional drift
        action.reset().play()

        // Stabilize position during animation
        const updatePosition = () => {
          if (gltf.scene) {
            gltf.scene.position.set(position[0], position[1], position[2])
          }
        }

        mixer.addEventListener('loop', updatePosition)

        // Cleanup animations on unmount
        return () => {
          action.stop()
          mixer.removeEventListener('loop', updatePosition)
          mixer.stopAllAction()
        }
      }
    }
  }, [gltf, actions, mixer, position])

  // Render fallback if model fails to load or is still loading
  if (isLoading || error) {
    return (
      <mesh ref={ref} scale={scale} position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={error ? "red" : "gray"} />
      </mesh>
    )
  }

  return (
    <primitive 
      ref={ref} 
      object={gltf.scene}
      castShadow
      receiveShadow
    />
  )
})

export default Model