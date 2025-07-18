import { Canvas } from "@react-three/fiber";
import { Suspense, useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as THREE from 'three';
import "@fontsource/inter";
import "./styles/cyberpunk.css";

// Import components
import Scene from "./components/Scene";
import LoadingScreen from "./components/LoadingScreen";
import Portfolio from "./components/UI/Portfolio";
import { usePortfolio } from "./hooks/usePortfolio";

const queryClient = new QueryClient();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { activeSection } = usePortfolio();

  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="cybervault-app">
        {/* 3D Scene */}
        <Canvas
          shadows={{
            enabled: true,
            type: 'PCFSoftShadowMap'
          }}
          camera={{
            position: [0, 5, 10],
            fov: 65,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
            shadowMap: {
              enabled: true,
              type: THREE.PCFSoftShadowMap
            },
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.2
          }}
          style={{ background: '#1a1a1a' }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>

        {/* UI Overlays */}
        {activeSection && <Portfolio />}
      </div>
    </QueryClientProvider>
  );
}

export default App;
