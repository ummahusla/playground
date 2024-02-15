import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface PanoPreviewProps {
  content: string;
}

const PanoPreview = ({ content }: PanoPreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  let camera: THREE.PerspectiveCamera | undefined;
  let scene: THREE.Scene | undefined;
  let renderer: THREE.WebGLRenderer | undefined;

  useEffect(() => {
    init();
    animate();

    return () => {
      // Cleanup Three.js resources
      if (scene && renderer) {
        scene.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            object.geometry.dispose();
            if (object.material.map) object.material.map.dispose();
            object.material.dispose();
          }
        });

        renderer.dispose();
      }
    };
  }, []);

  const init = () => {
    if (renderer) return;

    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    const aspectRatio = 390 / 844;
    camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    camera.position.set(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(390, 844);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }

    // Sphere setup
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const texture = new THREE.TextureLoader().load(content);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    if (scene) scene.add(sphere);
  };

  const animate = () => {
    if (!renderer || !scene || !camera) return;

    requestAnimationFrame(animate);

    // Rotate camera
    camera.rotation.y -= 0.001;

    renderer.render(scene, camera);
  };

  return (
    <div
      style={{ width: '390px', height: '844px', overflow: 'hidden' }}
      ref={containerRef}
    />
  );
};

export default PanoPreview;
