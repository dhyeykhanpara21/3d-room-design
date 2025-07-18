import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Plane, Cylinder, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Room() {
  const roomRef = useRef<THREE.Group>(null);

  // Load textures
  const woodTexture = useTexture("/textures/wood.jpg");
  const asphaltTexture = useTexture("/textures/asphalt.png");

  // Configure wood texture for flooring
  woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(8, 8);
  woodTexture.anisotropy = 16;

  // Configure ceiling texture
  asphaltTexture.wrapS = asphaltTexture.wrapT = THREE.RepeatWrapping;
  asphaltTexture.repeat.set(4, 4);
  asphaltTexture.anisotropy = 16;

  // Animated LED strips
  useFrame((state) => {
    if (roomRef.current) {
      const time = state.clock.elapsedTime;
      roomRef.current.children.forEach((child, index) => {
        if (child.material && 'emissive' in child.material) {
          const material = child.material as THREE.MeshStandardMaterial;
          material.emissive.setHSL(0.3, 1, 0.1 + Math.sin(time + index) * 0.05);
        }
      });
    }
  });

  return (
    <group ref={roomRef}>
      {/* Floor - Light beige matching reference */}
      <mesh receiveShadow position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial
          color="#F5F0E8"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>

      {/* Ceiling - Clean white */}
      <mesh position={[0, 8, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          metalness={0.1}
          roughness={0.7}
        />
      </mesh>

      {/* Walls - Light beige matching reference */}
      {/* Back wall */}
      <mesh position={[0, 3, -8]} castShadow receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial
          color="#E8DDD4"
          metalness={0.05}
          roughness={0.8}
        />
      </mesh>

      {/* Front wall */}
      <mesh position={[0, 3, 8]} rotation={[0, Math.PI, 0]} castShadow receiveShadow>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial
          color="#E8DDD4"
          metalness={0.05}
          roughness={0.8}
        />
      </mesh>

      {/* Left wall */}
      <mesh position={[-10, 3, 0]} rotation={[0, Math.PI / 2, 0]} castShadow receiveShadow>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial
          color="#E8DDD4"
          metalness={0.05}
          roughness={0.8}
        />
      </mesh>

      {/* Right wall */}
      <mesh position={[10, 3, 0]} rotation={[0, -Math.PI / 2, 0]} castShadow receiveShadow>
        <planeGeometry args={[16, 10]} />
        <meshStandardMaterial
          color="#E8DDD4"
          metalness={0.05}
          roughness={0.8}
        />
      </mesh>

      {/* CONFERENCE ROOM - Top area (matching reference) */}
      <group position={[0, -1.5, -4]}>
        {/* Oval conference table */}
        <Cylinder args={[3, 3, 0.08]} position={[0, 0.6, 0]} castShadow receiveShadow>
          <meshStandardMaterial
            color="#D4B896"
            metalness={0.2}
            roughness={0.4}
          />
        </Cylinder>

        {/* Table base */}
        <Cylinder args={[0.6, 0.6, 0.5]} position={[0, 0.25, 0]} castShadow>
          <meshStandardMaterial
            color="#B8956F"
            metalness={0.1}
            roughness={0.6}
          />
        </Cylinder>

        {/* Conference chairs - 8 chairs around oval table */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const radius = 4.2;
          const x = Math.cos(angle) * radius;
          const z = Math.sin(angle) * radius;
          const rotation = angle + Math.PI;

          return (
            <group key={`conf-chair-${i}`} position={[x, 0, z]} rotation={[0, rotation, 0]}>
              {/* Chair base */}
              <Cylinder args={[0.25, 0.25, 0.06]} position={[0, 0.03, 0]} castShadow>
                <meshStandardMaterial color="#2A2A2A" metalness={0.7} roughness={0.3} />
              </Cylinder>
              {/* Chair stem */}
              <Cylinder args={[0.03, 0.03, 0.4]} position={[0, 0.4, 0]} castShadow>
                <meshStandardMaterial color="#404040" metalness={0.8} roughness={0.2} />
              </Cylinder>
              {/* Seat */}
              <Box args={[0.4, 0.06, 0.4]} position={[0, 0.65, 0]} castShadow>
                <meshStandardMaterial color="#666666" metalness={0.2} roughness={0.8} />
              </Box>
              {/* Backrest */}
              <Box args={[0.4, 0.6, 0.06]} position={[0, 1, -0.17]} castShadow>
                <meshStandardMaterial color="#666666" metalness={0.2} roughness={0.8} />
              </Box>
            </group>
          );
        })}

        {/* Wall-mounted screen */}
        <Box args={[2.5, 1.5, 0.1]} position={[0, 4, -3.8]} castShadow>
          <meshStandardMaterial color="#1a1a1a" metalness={0.2} roughness={0.8} />
        </Box>
      </group>

      {/* GLASS PARTITION - Horizontal divider (matching reference) */}
      <group position={[0, 0, -1]}>
        {/* Metal frame */}
        <Box args={[0.08, 3, 18]} position={[0, 1.5, 0]} castShadow>
          <meshStandardMaterial color="#C0C0C0" metalness={0.6} roughness={0.2} />
        </Box>

        {/* Glass panels */}
        {[-6, -2, 2, 6].map((z, i) => (
          <Box key={`glass-h-${i}`} args={[0.04, 2.8, 3.5]} position={[0, 1.6, z]} castShadow>
            <meshStandardMaterial
              color="#ffffff"
              transparent
              opacity={0.2}
              metalness={0.1}
              roughness={0.05}
            />
          </Box>
        ))}
      </group>

      {/* LEFT WORK AREA - Individual L-shaped workstations (matching reference) */}
      <group position={[-5, -1.5, 2]}>
        {/* L-shaped desk 1 */}
        <group position={[0, 0, -2]}>
          {/* Horizontal part of L */}
          <Box args={[3, 0.06, 1.2]} position={[0, 0.6, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#D4B896" metalness={0.2} roughness={0.5} />
          </Box>
          {/* Vertical part of L */}
          <Box args={[1.2, 0.06, 2]} position={[0.9, 0.6, 0.9]} castShadow receiveShadow>
            <meshStandardMaterial color="#D4B896" metalness={0.2} roughness={0.5} />
          </Box>
          {/* Desk drawers */}
          <Box args={[2.8, 0.5, 1]} position={[0, 0.25, 0]} castShadow>
            <meshStandardMaterial color="#B8956F" metalness={0.1} roughness={0.7} />
          </Box>

          {/* Monitor */}
          <Box args={[0.5, 0.35, 0.06]} position={[0, 1.1, -0.4]} castShadow>
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
          </Box>
          {/* Monitor stand */}
          <Cylinder args={[0.03, 0.03, 0.3]} position={[0, 0.8, -0.35]} castShadow>
            <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.3} />
          </Cylinder>
        </group>

        {/* L-shaped desk 2 */}
        <group position={[0, 0, 2.5]}>
          {/* Horizontal part of L */}
          <Box args={[3, 0.06, 1.2]} position={[0, 0.6, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#D4B896" metalness={0.2} roughness={0.5} />
          </Box>
          {/* Vertical part of L */}
          <Box args={[1.2, 0.06, 2]} position={[0.9, 0.6, -0.9]} castShadow receiveShadow>
            <meshStandardMaterial color="#D4B896" metalness={0.2} roughness={0.5} />
          </Box>
          {/* Desk drawers */}
          <Box args={[2.8, 0.5, 1]} position={[0, 0.25, 0]} castShadow>
            <meshStandardMaterial color="#B8956F" metalness={0.1} roughness={0.7} />
          </Box>

          {/* Monitor */}
          <Box args={[0.5, 0.35, 0.06]} position={[0, 1.1, 0.4]} castShadow>
            <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
          </Box>
          {/* Monitor stand */}
          <Cylinder args={[0.03, 0.03, 0.3]} position={[0, 0.8, 0.35]} castShadow>
            <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.3} />
          </Cylinder>
        </group>

        {/* Office chairs for left area */}
        {[-1.5, 3].map((z, i) => (
          <group key={`left-chair-${i}`} position={[1.2, 0, z]} rotation={[0, Math.PI / 2, 0]}>
            <Cylinder args={[0.25, 0.25, 0.06]} position={[0, 0.03, 0]} castShadow>
              <meshStandardMaterial color="#2A2A2A" metalness={0.7} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.03, 0.03, 0.4]} position={[0, 0.4, 0]} castShadow>
              <meshStandardMaterial color="#404040" metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Box args={[0.4, 0.06, 0.4]} position={[0, 0.65, 0]} castShadow>
              <meshStandardMaterial color="#666666" metalness={0.2} roughness={0.8} />
            </Box>
            <Box args={[0.4, 0.6, 0.06]} position={[0, 1, -0.17]} castShadow>
              <meshStandardMaterial color="#666666" metalness={0.2} roughness={0.8} />
            </Box>
          </group>
        ))}
      </group>

      {/* RIGHT WORK AREA - Open collaborative workspace (matching reference) */}
      <group position={[5, -1.5, 3]}>
        {/* Large shared desk cluster */}
        <Box args={[5, 0.06, 3]} position={[0, 0.6, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#D4B896" metalness={0.2} roughness={0.5} />
        </Box>

        {/* Desk support */}
        <Box args={[4.8, 0.5, 2.8]} position={[0, 0.25, 0]} castShadow>
          <meshStandardMaterial color="#B8956F" metalness={0.1} roughness={0.7} />
        </Box>

        {/* Multiple workstation monitors */}
        {[
          { pos: [-1.5, 1.1, -1], size: [0.4, 0.3, 0.05] },
          { pos: [0, 1.1, -1], size: [0.4, 0.3, 0.05] },
          { pos: [1.5, 1.1, -1], size: [0.4, 0.3, 0.05] },
          { pos: [-1.5, 1.1, 1], size: [0.4, 0.3, 0.05] },
          { pos: [0, 1.1, 1], size: [0.4, 0.3, 0.05] },
          { pos: [1.5, 1.1, 1], size: [0.4, 0.3, 0.05] }
        ].map((monitor, i) => (
          <group key={`monitor-${i}`}>
            <Box args={monitor.size} position={monitor.pos} castShadow>
              <meshStandardMaterial color="#1a1a1a" metalness={0.3} roughness={0.8} />
            </Box>
            <Cylinder 
              args={[0.025, 0.025, 0.2]} 
              position={[monitor.pos[0], 0.8, monitor.pos[2]]} 
              castShadow
            >
              <meshStandardMaterial color="#404040" metalness={0.7} roughness={0.3} />
            </Cylinder>
          </group>
        ))}

        {/* Office chairs for cluster desk */}
        {[
          { pos: [-1.5, 0, -1.8], rot: [0, 0, 0] },
          { pos: [0, 0, -1.8], rot: [0, 0, 0] },
          { pos: [1.5, 0, -1.8], rot: [0, 0, 0] },
          { pos: [-1.5, 0, 1.8], rot: [0, Math.PI, 0] },
          { pos: [0, 0, 1.8], rot: [0, Math.PI, 0] },
          { pos: [1.5, 0, 1.8], rot: [0, Math.PI, 0] }
        ].map((chair, i) => (
          <group key={`cluster-chair-${i}`} position={chair.pos} rotation={chair.rot}>
            <Cylinder args={[0.25, 0.25, 0.06]} position={[0, 0.03, 0]} castShadow>
              <meshStandardMaterial color="#2A2A2A" metalness={0.7} roughness={0.3} />
            </Cylinder>
            <Cylinder args={[0.03, 0.03, 0.4]} position={[0, 0.4, 0]} castShadow>
              <meshStandardMaterial color="#404040" metalness={0.8} roughness={0.2} />
            </Cylinder>
            <Box args={[0.4, 0.06, 0.4]} position={[0, 0.65, 0]} castShadow>
              <meshStandardMaterial color="#666666" metalness={0.2} roughness={0.8} />
            </Box>
            <Box args={[0.4, 0.6, 0.06]} position={[0, 1, -0.17]} castShadow>
              <meshStandardMaterial color="#666666" metalness={0.2} roughness={0.8} />
            </Box>
          </group>
        ))}
      </group>

      {/* STORAGE AND DECORATIVE ELEMENTS */}
      {/* Storage cabinets on walls */}
      <Box args={[1.5, 0.8, 0.4]} position={[-8, 3.5, 6]} castShadow>
        <meshStandardMaterial color="#B8956F" metalness={0.2} roughness={0.6} />
      </Box>

      <Box args={[1.5, 0.8, 0.4]} position={[8, 3.5, 6]} castShadow>
        <meshStandardMaterial color="#B8956F" metalness={0.2} roughness={0.6} />
      </Box>

      {/* Floor storage units */}
      <Box args={[1, 1.2, 0.6]} position={[-8, 0.1, -6]} castShadow>
        <meshStandardMaterial color="#A8A8A8" metalness={0.3} roughness={0.7} />
      </Box>

      <Box args={[1, 1.2, 0.6]} position={[8, 0.1, -6]} castShadow>
        <meshStandardMaterial color="#A8A8A8" metalness={0.3} roughness={0.7} />
      </Box>

      {/* Decorative plants */}
      <group position={[-7, -1.5, 5]}>
        <Cylinder args={[0.2, 0.2, 0.4]} position={[0, 0.2, 0]} castShadow>
          <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.9} />
        </Cylinder>
        <Cylinder args={[0.3, 0.1, 0.6]} position={[0, 0.7, 0]} castShadow>
          <meshStandardMaterial color="#228B22" metalness={0.1} roughness={0.9} />
        </Cylinder>
      </group>

      <group position={[7, -1.5, 5]}>
        <Cylinder args={[0.2, 0.2, 0.4]} position={[0, 0.2, 0]} castShadow>
          <meshStandardMaterial color="#8B4513" metalness={0.1} roughness={0.9} />
        </Cylinder>
        <Cylinder args={[0.3, 0.1, 0.6]} position={[0, 0.7, 0]} castShadow>
          <meshStandardMaterial color="#228B22" metalness={0.1} roughness={0.9} />
        </Cylinder>
      </group>

      {/* Baseboards around room perimeter */}
      <mesh position={[0, -1.7, -7.9]}>
        <boxGeometry args={[20, 0.3, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[0, -1.7, 7.9]}>
        <boxGeometry args={[20, 0.3, 0.1]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[-9.9, -1.7, 0]}>
        <boxGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh position={[9.9, -1.7, 0]}>
        <boxGeometry args={[0.1, 0.3, 16]} />
        <meshStandardMaterial color="#FFFFFF" metalness={0.1} roughness={0.8} />
      </mesh>
    </group>
  );
}