import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Box, Cylinder, Sphere, Text, useTexture } from '@react-three/drei';
import { gsap } from 'gsap';
import * as THREE from 'three';
import { usePortfolio } from '../hooks/usePortfolio';

export default function CyberObjects() {
  const { setActiveSection } = usePortfolio();
  const { camera, gl } = useThree();
  const [hoveredObject, setHoveredObject] = useState<string | null>(null);

  // Load textures for realistic materials
  const woodTexture = useTexture("/textures/wood.jpg");
  const asphaltTexture = useTexture("/textures/asphalt.png");

  // Configure texture properties
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);
  woodTexture.anisotropy = 16;

  asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping;
  asphaltTexture.repeat.set(1, 1);
  asphaltTexture.anisotropy = 16;

  // Object refs for hover effects
  const securityDoorRef = useRef<THREE.Mesh>(null);
  const whiteboardRef = useRef<THREE.Mesh>(null);
  const pcSetupRef = useRef<THREE.Group>(null);
  const certificateShelfRef = useRef<THREE.Group>(null);
  const serverRackRef = useRef<THREE.Group>(null);
  const terminalRef = useRef<THREE.Mesh>(null);

  // Refs for broadcasting rings
  const broadcastRing1Ref = useRef<THREE.Mesh>(null);
  const broadcastRing2Ref = useRef<THREE.Mesh>(null);
  const broadcastRing3Ref = useRef<THREE.Mesh>(null);

  // Animation frame hook for time-based animations
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Add any time-based animations here
    if (broadcastRing1Ref.current) {
      broadcastRing1Ref.current.rotation.z = time * 0.5;
    }
    if (broadcastRing2Ref.current) {
      broadcastRing2Ref.current.rotation.z = time * -0.3;
    }
    if (broadcastRing3Ref.current) {
      broadcastRing3Ref.current.rotation.z = time * 0.8;
    }
  });

  // Ref for data particles
  const dataParticlesRef = useRef<THREE.Group>(null);

  // Handle clicks
  const handleObjectClick = (sectionName: string) => {
    setActiveSection(sectionName);
  };

  // Handle hover effects
  const handleHover = (objectName: string, isHovering: boolean) => {
    setHoveredObject(isHovering ? objectName : null);
    gl.domElement.style.cursor = isHovering ? 'pointer' : 'default';
  };

  // Animate objects
  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Security Door animation
    if (securityDoorRef.current) {
      securityDoorRef.current.rotation.y = Math.sin(time * 0.5) * 0.05;
      const material = securityDoorRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.3 + Math.sin(time * 2) * 0.1;
    }

    // PC Setup screen glow
    if (pcSetupRef.current) {
      pcSetupRef.current.children.forEach((child, index) => {
        if (child.material && 'emissive' in child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.emissiveIntensity = 0.4 + Math.sin(time * 3 + index) * 0.2;
        }
      });
    }

    // Server rack LED animation
    if (serverRackRef.current) {
      serverRackRef.current.children.forEach((child, index) => {
        if (child.material && 'emissive' in child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          const phase = (time * 4 + index * 0.5) % (Math.PI * 2);
          material.emissiveIntensity = 0.3 + Math.sin(phase) * 0.3;
        }
      });
    }

    // Terminal screen flicker
    if (terminalRef.current) {
      const material = terminalRef.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 0.6 + Math.random() * 0.2;
    }

    // Animate broadcasting rings with wave propagation
    if (broadcastRing1Ref.current) {
      const scale1 = 1 + Math.sin(time * 1.5) * 0.2;
      broadcastRing1Ref.current.scale.x = broadcastRing1Ref.current.scale.y = scale1;
      broadcastRing1Ref.current.rotation.z = time * 0.3;
      (broadcastRing1Ref.current.material as THREE.MeshStandardMaterial).opacity = 
        Math.max(0.1, 0.8 - Math.abs(Math.sin(time * 1.5) * 0.6));
    }
    if (broadcastRing2Ref.current) {
      const scale2 = 1 + Math.sin(time * 1.2 + Math.PI / 2) * 0.25;
      broadcastRing2Ref.current.scale.x = broadcastRing2Ref.current.scale.y = scale2;
      broadcastRing2Ref.current.rotation.z = -time * 0.2;
      (broadcastRing2Ref.current.material as THREE.MeshStandardMaterial).opacity = 
        Math.max(0.1, 0.6 - Math.abs(Math.sin(time * 1.2 + Math.PI / 2) * 0.4));
    }
    if (broadcastRing3Ref.current) {
      const scale3 = 1 + Math.sin(time * 0.8 + Math.PI) * 0.3;
      broadcastRing3Ref.current.scale.x = broadcastRing3Ref.current.scale.y = scale3;
      broadcastRing3Ref.current.rotation.z = time * 0.1;
      (broadcastRing3Ref.current.material as THREE.MeshStandardMaterial).opacity = 
        Math.max(0.05, 0.4 - Math.abs(Math.sin(time * 0.8 + Math.PI) * 0.3));
    }

    // Animate data particles
    if (dataParticlesRef.current) {
      dataParticlesRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        mesh.position.set(
          Math.sin((i / 12) * Math.PI * 2 + time * 0.5) * (0.3 + Math.sin(time * 0.3 + i) * 0.1),
          Math.sin(time * 0.8 + i * 0.5) * 0.4 + 1 + (i * 0.1),
          Math.cos((i / 12) * Math.PI * 2 + time * 0.5) * (0.3 + Math.cos(time * 0.3 + i) * 0.1)
        );

        const sphere = mesh.geometry as THREE.SphereGeometry;
        sphere.parameters.radius = 0.015 + Math.sin(time * 2 + i) * 0.005
        const material = mesh.material as THREE.MeshStandardMaterial;
        material.emissiveIntensity = 0.8 + Math.sin(time * 3 + i) * 0.4;
        material.opacity = 0.7 + Math.sin(time * 2 + i * 0.8) * 0.3;
      });
    }
  });

  return (
    <group>
      {/* ===== STRUCTURED LAYOUT - 5 ORGANIZED POSITIONS ===== */}

      {/* POSITION 1: CENTER BACK - Security Door (Home) */}
      <group position={[0, 2, -8]}>
        <Box
          ref={securityDoorRef}
          args={[3, 4, 0.3]}
          onClick={() => handleObjectClick('home')}
          onPointerOver={() => handleHover('door', true)}
          onPointerOut={() => handleHover('door', false)}
        >
          <meshStandardMaterial
            map={asphaltTexture}
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.2}
            emissive="#ffffff"
            emissiveIntensity={hoveredObject === 'door' ? 1.2 : 0.8}
          />
        </Box>
        {/* Door frame */}
        <Box args={[3.2, 4.2, 0.1]} position={[0, 0, -0.2]}>
          <meshStandardMaterial
            map={asphaltTexture}
            color="#444444"
            metalness={0.9}
            roughness={0.2}
          />
        </Box>
        {/* Security panel */}
        <Box args={[0.3, 0.5, 0.1]} position={[1.8, 0, 0.2]}>
          <meshStandardMaterial
            color="#000000"
            metalness={0.8}
            roughness={0.2}
            emissive="#ffffff"
            emissiveIntensity={1.5}
          />
        </Box>
        <Text
          position={[0, -2.5, 0.2]}
          fontSize={0.3}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          HOME - SECURITY ACCESS
        </Text>
      </group>

      {/* POSITION 2: LEFT SIDE - Whiteboard (About) */}
      <group position={[-7, 3.5, -2]}>
        {/* Support table */}
        <Box args={[2, 0.1, 1]} position={[0, -2.4, 0]} castShadow receiveShadow>
          <meshStandardMaterial
            map={woodTexture}
            color="#A0522D"
            metalness={0.05}
            roughness={0.7}
          />
        </Box>
        {/* Table legs */}
        {[[-0.8, -1.9, -0.4], [-0.8, -1.9, 0.4], [0.8, -1.9, -0.4], [0.8, -1.9, 0.4]].map((pos, i) => (
          <Box key={`leg1-${i}`} args={[0.1, 1, 0.1]} position={pos}>
            <meshStandardMaterial
              map={asphaltTexture}
              color="#333333"
              metalness={0.8}
              roughness={0.3}
            />
          </Box>
        ))}
        {/* Whiteboard */}
        <Box
          ref={whiteboardRef}
          args={[3, 2, 0.1]}
          onClick={() => handleObjectClick('about')}
          onPointerOver={() => handleHover('whiteboard', true)}
          onPointerOut={() => handleHover('whiteboard', false)}
        >
          <meshStandardMaterial
            color="#f0f0f0"
            metalness={0.1}
            roughness={0.1}
            emissive="#0066ff"
            emissiveIntensity={hoveredObject === 'whiteboard' ? 1.0 : 0.6}
          />
        </Box>
        <Text
          position={[0, -1.3, 0.1]}
          fontSize={0.2}
          color="#0066ff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          ABOUT ME
        </Text>
      </group>

      {/* POSITION 3: RIGHT SIDE - PC Setup (Skills) */}
      <group position={[7, 0.9, -2]}>
        {/* Main desk */}
        <Box args={[4, 0.1, 2]} position={[0, -0.1, 0]} castShadow receiveShadow>
          <meshStandardMaterial
            map={woodTexture}
            color="#8B4513"
            metalness={0.1}
            roughness={0.8}
          />
        </Box>
        {/* Desk legs */}
        {[[-1.8, -0.5, -0.8], [1.8, -0.5, -0.8], [-1.8, -0.5, 0.8], [1.8, -0.5, 0.8]].map((pos, i) => (
          <Box key={`leg2-${i}`} args={[0.1, 0.8, 0.1]} position={pos}>
            <meshStandardMaterial
              map={asphaltTexture}
              color="#333333"
              metalness={0.8}
              roughness={0.3}
            />
          </Box>
        ))}

        {/* PC Setup */}
        <group
          ref={pcSetupRef}
          position={[0, 0, 0]}
          onClick={() => handleObjectClick('skills')}
          onPointerOver={() => handleHover('pc', true)}
          onPointerOut={() => handleHover('pc', false)}
        >
          {/* PC Base */}
          <Box args={[2.5, 0.8, 1.5]} position={[0, 0.4, 0]}>
            <meshStandardMaterial
              map={asphaltTexture}
              color="#333333"
              metalness={0.8}
              roughness={0.3}
            />
          </Box>
          {/* Main monitor - Website Display */}
          <Box args={[2, 1.2, 0.1]} position={[0, 1.4, 0]}>
            <meshStandardMaterial
              color="#001122"
              metalness={0.9}
              roughness={0.1}
              emissive="#00aaff"
              emissiveIntensity={hoveredObject === 'pc' ? 1.4 : 1.0}
            />
          </Box>
          {/* Website content overlay */}
          <Text
            position={[0, 1.6, 0.051]}
            fontSize={0.08}
            color="#00ffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            APHELION CYBER
          </Text>
          <Text
            position={[0, 1.45, 0.051]}
            fontSize={0.05}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            aphelioncyber.com
          </Text>
          <Text
            position={[0, 1.3, 0.051]}
            fontSize={0.03}
            color="#00ff88"
            anchorX="center"
            anchorY="middle"
            maxWidth={1.6}
          >
            Advanced Cybersecurity Solutions
          </Text>
          
          {/* Side monitors */}
          <Box args={[1.5, 1, 0.1]} position={[-1.5, 1.4, 0.3]} rotation={[0, 0.3, 0]}>
            <meshStandardMaterial
              color="#000000"
              metalness={0.9}
              roughness={0.1}
              emissive="#0066ff"
              emissiveIntensity={hoveredObject === 'pc' ? 1.2 : 0.8}
            />
          </Box>
          <Text
            position={[-1.5, 1.4, 0.35]}
            fontSize={0.04}
            color="#0066ff"
            anchorX="center"
            anchorY="middle"
            rotation={[0, 0.3, 0]}
          >
            THREAT MONITOR
          </Text>
          
          <Box args={[1.5, 1, 0.1]} position={[1.5, 1.4, 0.3]} rotation={[0, -0.3, 0]}>
            <meshStandardMaterial
              color="#000000"
              metalness={0.9}
              roughness={0.1}
              emissive="#ff6600"
              emissiveIntensity={hoveredObject === 'pc' ? 1.2 : 0.8}
            />
          </Box>
          <Text
            position={[1.5, 1.4, 0.35]}
            fontSize={0.04}
            color="#ff6600"
            anchorX="center"
            anchorY="middle"
            rotation={[0, -0.3, 0]}
          >
            SYSTEM STATUS
          </Text>
          {/* Keyboard */}
          <Box args={[1.5, 0.1, 0.5]} position={[0, 0.85, 0.8]}>
            <meshStandardMaterial
              map={asphaltTexture}
              color="#1a1a1a"
              metalness={0.7}
              roughness={0.4}
            />
          </Box>
          {/* Mouse */}
          <Box args={[0.2, 0.1, 0.3]} position={[1, 0.85, 0.8]}>
            <meshStandardMaterial
              color="#333333"
              metalness={0.8}
              roughness={0.2}
            />
          </Box>

          {/* Broadcasting Signal Rings */}
          <mesh ref={broadcastRing1Ref} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.5, 0.7, 32]} />
            <meshStandardMaterial
              color="#00ff88"
              emissive="#00ff88"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh ref={broadcastRing2Ref} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.8, 1.0, 32]} />
            <meshStandardMaterial
              color="#00aaff"
              emissive="#00aaff"
              emissiveIntensity={0.6}
              transparent
              opacity={0.4}
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh ref={broadcastRing3Ref} position={[0, 1.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[1.1, 1.3, 32]} />
            <meshStandardMaterial
              color="#ff0088"
              emissive="#ff0088"
              emissiveIntensity={0.4}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Data particles floating upward */}
          <group ref={dataParticlesRef} position={[0, 0.8, 0]}>
            {Array.from({ length: 12 }).map((_, i) => (
              <mesh key={i} position={[0, 1, 0]}>
                <sphereGeometry args={[0.015]} />
                <meshStandardMaterial
                  color={i % 3 === 0 ? "#00ff88" : i % 3 === 1 ? "#00aaff" : "#ff0088"}
                  emissive={i % 3 === 0 ? "#00ff88" : i % 3 === 1 ? "#00aaff" : "#ff0088"}
                  emissiveIntensity={0.8}
                  transparent
                  opacity={0.7}
                />
              </mesh>
            ))}
          </group>
        </group>

        <Text
          position={[0, -0.8, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          SKILLS - PC WORKSTATION
        </Text>
      </group>

      {/* POSITION 4: BACK RIGHT - Server Rack (Projects) */}
      <group position={[4, 1.6, -3]}>
        {/* Server platform */}
        <Box args={[2, 0.1, 1.5]} position={[0, -1.55, 0]} castShadow receiveShadow>
          <meshStandardMaterial
            map={asphaltTexture}
            color="#555555"
            metalness={0.7}
            roughness={0.4}
          />
        </Box>

        {/* Server Rack */}
        <group
          ref={serverRackRef}
          position={[0, 0, 0]}
          onClick={() => handleObjectClick('projects')}
          onPointerOver={() => handleHover('servers', true)}
          onPointerOut={() => handleHover('servers', false)}
        >
          {/* Main rack */}
          <Box args={[1.5, 3, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              map={asphaltTexture}
              color="#222222" 
              metalness={0.9} 
              roughness={0.2} 
            />
          </Box>
          {/* LED indicators */}
          {[...Array(6)].map((_, i) => (
            <Sphere
              key={i}
              args={[0.05]}
              position={[0.6, -1 + i * 0.4, 0.51]}
            >
              <meshStandardMaterial
                color="#ff0000"
                emissive="#ff0000"
                emissiveIntensity={hoveredObject === 'servers' ? 1.5 : 1.0}
              />
            </Sphere>
          ))}
          {/* Server rack ventilation panels */}
          {[...Array(3)].map((_, i) => (
            <Box
              key={`vent-${i}`}
              args={[1.2, 0.8, 0.05]}
              position={[0, -1 + i * 0.9, 0.52]}
            >
              <meshStandardMaterial
                map={asphaltTexture}
                color="#444444"
                metalness={0.6}
                roughness={0.4}
              />
            </Box>
          ))}
        </group>

        <Text
          position={[0, -2.1, 0]}
          fontSize={0.2}
          color="#ff0000"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          PROJECTS - SERVER RACK
        </Text>
      </group>

      {/* POSITION 5: CENTER RIGHT - Combined Certificates & Terminal */}
      <group position={[4, 2.5, 5]}>
        {/* Elevated platform */}
        <Box args={[3, 0.1, 2.5]} position={[0, -0.9, 0]} castShadow receiveShadow>
          <meshStandardMaterial
            map={asphaltTexture}
            color="#333333"
            metalness={0.8}
            roughness={0.3}
          />
        </Box>
        {/* Platform support columns */}
        {[[-1.4, -1.35, -1], [1.4, -1.35, -1], [-1.4, -1.35, 1], [1.4, -1.35, 1]].map((pos, i) => (
          <Box key={`col-${i}`} args={[0.1, 0.9, 0.1]} position={pos}>
            <meshStandardMaterial
              map={asphaltTexture}
              color="#444444"
              metalness={0.8}
              roughness={0.3}
            />
          </Box>
        ))}

        {/* Certificate Shelf */}
        <group
          ref={certificateShelfRef}
          position={[0, 1.5, 0]}
          onClick={() => handleObjectClick('certificates')}
          onPointerOver={() => handleHover('certificates', true)}
          onPointerOut={() => handleHover('certificates', false)}
        >
          {/* Shelf */}
          <Box args={[4, 0.2, 1]} position={[0, 0, 0]}>
            <meshStandardMaterial 
              map={woodTexture}
              color="#8B4513" 
              metalness={0.1} 
              roughness={0.8} 
            />
          </Box>
          {/* Certificate frames */}
          {[...Array(3)].map((_, i) => (
            <Box
              key={i}
              args={[0.8, 1.2, 0.1]}
              position={[-1.5 + i * 1.5, 0.7, 0]}
              rotation={[0, 0, Math.sin(Date.now() * 0.001 + i) * 0.1]}
            >
              <meshStandardMaterial
                map={woodTexture}
                color="#654321"
                metalness={0.2}
                roughness={0.6}
                emissive="#0066ff"
                emissiveIntensity={hoveredObject === 'certificates' ? 1.0 : 0.6}
              />
            </Box>
          ))}
        </group>

        {/* Terminal */}
        <group position={[0, -0.1, 0]}>
          {/* Terminal Base */}
          <Box args={[2.5, 0.3, 2]} position={[0, 0.15, 0]}>
            <meshStandardMaterial
              map={asphaltTexture}
              color="#333333"
              metalness={0.8}
              roughness={0.3}
            />
          </Box>
          {/* Terminal Screen */}
          <Box
            ref={terminalRef}
            args={[2, 1.5, 0.1]}
            position={[0, 1, 0]}
            onClick={() => handleObjectClick('contact')}
            onPointerOver={() => handleHover('terminal', true)}
            onPointerOut={() => handleHover('terminal', false)}
          >
            <meshStandardMaterial
              color="#000000"
              metalness={0.9}
              roughness={0.1}
              emissive="#ffffff"
              emissiveIntensity={hoveredObject === 'terminal' ? 1.5 : 1.0}
            />
          </Box>
        </group>

        <Text
          position={[0, -1.5, 0]}
          fontSize={0.2}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.02}
          outlineColor="#000000"
        >
          CERTIFICATES & CONTACT
        </Text>
      </group>
    </group>
  );
}