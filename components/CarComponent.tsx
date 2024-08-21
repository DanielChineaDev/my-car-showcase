"use client";

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import styles from '../styles/CarComponent.module.css';

const CarComponent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configuración básica de la escena
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 1, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Agregar el renderizador al DOM
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
      renderer.domElement.className = styles.canvasStyle;
    }

    // Añadir luz a la escena
    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Cargar el modelo 3D del coche
    const loader = new GLTFLoader();
    loader.load(
      '/bmw_m4_gts.glb',
      (gltf) => {
        const car = gltf.scene;
        car.position.set(0, 0, 0);
        car.scale.set(0.07, 0.07, 0.07);
        scene.add(car);

        // Animación del coche
        const animate = () => {
          requestAnimationFrame(animate);
          car.rotation.y += 0.005; // Velocidad de rotación ajustada
          composer.render();
        };

        animate();
      },
      undefined,
      (error) => {
        console.error('Error loading GLTF model:', error);
      }
    );

    // Configuración de postprocesamiento con GlitchPass
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    const glitchPass = new GlitchPass();
    composer.addPass(glitchPass);

    // Manejo de la ventana de cambio de tamaño
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
    <div className={styles.container} ref={mountRef}>
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
