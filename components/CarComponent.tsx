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
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const light = new THREE.DirectionalLight(0xffffff, 5);
    light.position.set(5, 5, 5);
    scene.add(light);

    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.set(0, 2, 30); // Ajusta según sea necesario
    camera.lookAt(0, 1, 0); // Apunta al centro de la escena

    const loader = new GLTFLoader();
    loader.load('/bmw_m4_gts.glb', (gltf) => {
      const car = gltf.scene;

      car.position.set(0, 0, 0); // Asegura que el coche esté en el centro de la escena
      car.scale.set(0.1, 0.1, 0.1); // Escala el modelo si es muy grande
      scene.add(car);

      car.rotation.x = 0.5;
      car.rotation.y = 0.5;

      const animate = () => {
        requestAnimationFrame(animate);
        car.rotation.y += 0.001;
        composer.render();
      };

      animate();
    });

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // Ajustes del GlitchPass para hacer el efecto visible pero controlado
    const glitchPass = new GlitchPass();
    glitchPass.goWild = false; // Mantén desactivado el modo salvaje
    glitchPass.curF = 30; // Reduce la frecuencia de glitches, valores bajos aumentan la frecuencia
    glitchPass.randX = 0.1; // Incrementa la variabilidad de los glitches

    composer.addPass(glitchPass);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div className={styles.container} ref={mountRef} />;
};

export default CarComponent;
