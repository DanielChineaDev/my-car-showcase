"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import styles from '../styles/CarComponent.module.css';
import CarStats from './CarStats';

const CarComponent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 30); // Ajuste la posición de la cámara más cerca del coche
    camera.lookAt(0, 0, 0); // Asegúrate de que la cámara esté mirando al centro de la escena

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      renderer.domElement.className = styles.canvasStyle;
    }

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(5, 5, 5);
    scene.add(light);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const loader = new GLTFLoader();
    loader.load(
      '/bmw_m4_gts.glb',
      (gltf) => {
        const car = gltf.scene;
        car.position.set(0, -1, 0); // Asegúrate de que el coche esté centrado en la escena
        car.scale.set(0.07, 0.07, 0.07); // Ajuste la escala para que el coche se vea correctamente
        scene.add(car);

        const animate = () => {
          requestAnimationFrame(animate);
          car.rotation.y += 0.003;
          composer.render();
        };

        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
      }
    );

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.carDetails}>
        <div className={styles.brand}>BMW</div> {/* Marca del coche */}
        <div className={styles.model}>M4 GTS</div> {/* Modelo del coche */}
      </div>
      <div className={styles.canvasContainer} ref={mountRef} />
      <CarStats topSpeed={3} acceleration={4} handling={2} />
      <img
        className={styles.backgroundImage}
        src="/revenge_logo.png"
        alt="Background"
      />
      <div className={styles.topRightText}>TOP RIGHT TEXT</div>
      <div className={styles.bottomLeftText}>BOTTOM LEFT TEXT</div>
      <img
        className={styles.bottomLeftImage}
        src="/path-to-your-image.png"
        alt="Bottom Left"
      />
    </div>
  );
};

export default CarComponent;
