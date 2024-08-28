"use client"; // Indica que este es un componente que solo debe renderizarse en el cliente

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Asegúrate de importar correctamente
import styles from '../styles/CarComponent.module.css';
import CarStats from './CarStats';

const CarComponent: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [carData, setCarData] = useState<any>(null);
  const [currentCarIndex, setCurrentCarIndex] = useState(0);
  const [cars, setCars] = useState<any[]>([]);
  const carScene = useRef<THREE.Scene | null>(null);
  const carMesh = useRef<THREE.Group | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      const querySnapshot = await getDocs(collection(db, 'cars'));
      const carsList: any[] = [];
      querySnapshot.forEach((doc) => {
        carsList.push(doc.data());
      });
      setCars(carsList);
      setCarData(carsList[0]);
    };

    fetchCars();
  }, []);

  useEffect(() => {
    if (!carData) return;

    const scene = new THREE.Scene();
    carScene.current = scene;
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 15, 30);
    camera.lookAt(0, 0, 0);

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
      carData.glbPath,
      (gltf) => {
        const car = gltf.scene;
        car.position.set(0, -1, 0);

        console.log("Applying scale:", carData.scale);

        // Aplica la escala desde Firebase (uniformemente en los ejes x, y, z)
        if (typeof carData.scale === 'number') {
          car.scale.set(carData.scale, carData.scale, carData.scale);
        } else {
          car.scale.set(0.07, 0.07, 0.07); // Escala por defecto si no está especificado
        }

        scene.add(car);
        carMesh.current = car;

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
  }, [carData]);

  const handleNextCar = () => {
    const nextIndex = (currentCarIndex + 1) % cars.length;
    setCurrentCarIndex(nextIndex);
    setCarData(cars[nextIndex]);
  };

  const handlePrevCar = () => {
    const prevIndex = (currentCarIndex - 1 + cars.length) % cars.length;
    setCurrentCarIndex(prevIndex);
    setCarData(cars[prevIndex]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carDetails}>
        <button className={styles.arrowLeft} onClick={handlePrevCar}>◀</button>
        <div>
          <div className={styles.brand}>{carData?.name}</div>
          <div className={styles.model}>{carData?.model}</div>
        </div>
        <button className={styles.arrowRight} onClick={handleNextCar}>▶</button>
      </div>
      <div className={styles.canvasContainer} ref={mountRef} />
      <CarStats topSpeed={carData?.maxSpeed} acceleration={carData?.acceleration} handling={carData?.handling} />
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
