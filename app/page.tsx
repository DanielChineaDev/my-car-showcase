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
      </Head>
      <div>
        <MenuComponent />
        <CarComponent />
      </div>
    </>
  );
}
