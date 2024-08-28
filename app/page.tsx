import Image from "next/image";
import styles from "./page.module.css";
import CarComponent from '../components/CarComponent';
import MenuComponent from '../components/MenuComponent';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Car Showcase</title>
        <meta name="description" content="A rotating 3D car with a glitch effect." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap" rel="stylesheet" />
      </Head>
      <div>
        <MenuComponent />
        <CarComponent />
      </div>
    </>
  );
}
