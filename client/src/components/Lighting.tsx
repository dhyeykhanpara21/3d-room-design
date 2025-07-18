import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Lighting() {
  const neonLight1 = useRef<THREE.PointLight>(null);
  const neonLight2 = useRef<THREE.PointLight>(null);
  const neonLight3 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Subtle neon light animation - less jarring
    if (neonLight1.current) {
      neonLight1.current.intensity = 1.8 + Math.sin(time * 1.2) * 0.2;
    }
    if (neonLight2.current) {
      neonLight2.current.intensity = 1.6 + Math.sin(time * 1.5 + 1) * 0.15;
    }
    if (neonLight3.current) {
      neonLight3.current.intensity = 1.7 + Math.sin(time * 1.0 + 2) * 0.18;
    }
  });

  return (
    <>
      {/* Realistic ambient lighting */}
      <ambientLight intensity={0.3} color="#f5f5f5" />

      {/* Main directional light - realistic daylight */}
      <directionalLight
        position={[15, 20, 10]}
        intensity={2.2}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={100}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-radius={8}
        shadow-bias={-0.0001}
      />

      {/* Realistic overhead ceiling lighting */}
      <spotLight
        position={[0, 9.5, 0]}
        angle={Math.PI / 1.5}
        penumbra={0.4}
        intensity={1.8}
        color="#f8f8f8"
        target-position={[0, 0, 0]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Even corner lighting for realistic room illumination */}
      <pointLight
        position={[-7, 7, -7]}
        color="#f0f0f0"
        intensity={1.0}
        distance={18}
        decay={1.2}
      />

      <pointLight
        position={[7, 7, -7]}
        color="#f0f0f0"
        intensity={1.0}
        distance={18}
        decay={1.2}
      />

      <pointLight
        position={[-7, 7, 7]}
        color="#f0f0f0"
        intensity={1.0}
        distance={18}
        decay={1.2}
      />

      <pointLight
        position={[7, 7, 7]}
        color="#f0f0f0"
        intensity={1.0}
        distance={18}
        decay={1.2}
      />

      {/* Subtle accent lights - more realistic */}
      <pointLight
        ref={neonLight1}
        position={[-8.5, 4, 0]}
        color="#e6f3ff"
        intensity={1.8}
        distance={14}
        decay={1.8}
      />

      <pointLight
        ref={neonLight2}
        position={[8.5, 4, 0]}
        color="#f0f8ff"
        intensity={1.6}
        distance={12}
        decay={1.8}
      />

      <pointLight
        ref={neonLight3}
        position={[0, 6, -8.5]}
        color="#fff5f5"
        intensity={1.7}
        distance={16}
        decay={1.8}
      />

      {/* Professional ceiling lighting */}
      <rectAreaLight
        position={[0, 9.8, 0]}
        width={16}
        height={2.5}
        color="#ffffff"
        intensity={3.2}
      />

      <rectAreaLight
        position={[-5, 9.6, 0]}
        width={6}
        height={1.5}
        color="#f8f8f8"
        intensity={2.8}
      />

      <rectAreaLight
        position={[5, 9.6, 0]}
        width={6}
        height={1.5}
        color="#f8f8f8"
        intensity={2.8}
      />

      {/* Subtle floor uplighting */}
      <pointLight
        position={[0, 0.3, 0]}
        color="#f5f5f5"
        intensity={0.8}
        distance={20}
        decay={2.5}
      />
    </>
  );
}