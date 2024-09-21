import Image from "next/image";
import styles from "./page.module.css";
import CarComponent from '../components/cars/CarComponent';
import MenuComponent from '../components/navigation/MenuComponent';
import HomeView from '../components/home/HomeComponent';
import AboutUs from '../components/home/AboutUsComponent';
import MoreInfo from '../components/home/MoreInfoComponent';
import ProfileComponent from './profile/[id]/page';

import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Revenge</title>
        <meta name="description" content="A rotating 3D car with a glitch effect." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <div className={styles.container}>
      <MenuComponent />
        <HomeView />
        <AboutUs />
        <MoreInfo />
      </div>
    </>
  );
}
