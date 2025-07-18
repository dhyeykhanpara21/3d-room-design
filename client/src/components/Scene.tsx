import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';

import Room from './Room';
import CyberObjects from './CyberObjects';
import Lighting from './Lighting';
import ParticleSystem from './ParticleSystem';
import { usePortfolio } from '../hooks/usePortfolio';

export default function Scene() {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const controlsRef = useRef<any>(null);
  const { activeSection, setActiveSection } = usePortfolio();

  // Handle camera animations for different sections
  useEffect(() => {
    if (!cameraRef.current || !controlsRef.current) return;

    const camera = cameraRef.current;
    const controls = controlsRef.current;

    // Define camera positions for each section
    const positions = {
      home: { position: [0, 5, 10], target: [0, 0, 0] },
      about: { position: [-3, 3, 5], target: [-2, 2, 0] },
      skills: { position: [3, 2, 4], target: [2, 1, 0] },
      certificates: { position: [0, 3, 6], target: [0, 2, -2] },
      projects: { position: [4, 4, 3], target: [3, 0, 0] },
      contact: { position: [-2, 4, 6], target: [-1, 1, 0] }
    };

    if (activeSection && positions[activeSection as keyof typeof positions]) {
      const targetPos = positions[activeSection as keyof typeof positions];
      
      // Smooth camera transition with GSAP
      gsap.to(camera.position, {
        x: targetPos.position[0],
        y: targetPos.position[1],
        z: targetPos.position[2],
        duration: 2,
        ease: "power2.inOut"
      });

      gsap.to(controls.target, {
        x: targetPos.target[0],
        y: targetPos.target[1],
        z: targetPos.target[2],
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => controls.update()
      });
    }
  }, [activeSection]);

  // Raycasting for object interaction
  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());

  const handleClick = (event: MouseEvent) => {
    if (!cameraRef.current) return;

    // Calculate mouse position in normalized device coordinates
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.current.setFromCamera(mouse.current, cameraRef.current);
    
    // This will be handled by individual objects in CyberObjects component
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, []);

  // Idle camera movement
  useFrame((state) => {
    if (!activeSection && cameraRef.current) {
      const time = state.clock.elapsedTime;
      cameraRef.current.position.x = Math.sin(time * 0.1) * 0.5;
      cameraRef.current.position.y = 5 + Math.sin(time * 0.05) * 0.3;
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={60}
        near={0.1}
        far={1000}
        position={[0, 5, 10]}
      />
      
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
        minDistance={3}
        maxDistance={20}
        target={[0, 0, 0]}
      />

      <Lighting />
      <Room />
      <CyberObjects />
      <ParticleSystem />
    </>
  );
}
