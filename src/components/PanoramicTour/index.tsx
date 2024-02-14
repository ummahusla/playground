import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PanoramicTour = ({ imagePath }) => {
  const containerRef = useRef(null);
  let camera, scene, renderer;

  useEffect(() => {
    init();
    animate();

    return () => {
      // Cleanup Three.js resources
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.map.dispose();
          object.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  const init = () => {
    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 0);

    // Renderer setup
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Sphere setup
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const texture = new THREE.TextureLoader().load(imagePath);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
  };

  const animate = () => {
    requestAnimationFrame(animate);

    // Rotate camera
    camera.rotation.y -= 0.001;

    renderer.render(scene, camera);
  };

  return <div ref={containerRef} />;
};

export default PanoramicTour;
