import { useState, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const useThreeLoader = () => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { gl } = useThree();

  useEffect(() => {
    const manager = new THREE.LoadingManager();
    
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      const progressPercentage = (itemsLoaded / itemsTotal) * 100;
      setProgress(progressPercentage);
    };

    manager.onLoad = () => {
      setIsLoaded(true);
    };

    manager.onError = (url) => {
      console.error('Failed to load resource:', url);
    };

    return () => {
      manager.onProgress = () => {};
      manager.onLoad = () => {};
      manager.onError = () => {};
    };
  }, []);

  return { progress, isLoaded };
};
