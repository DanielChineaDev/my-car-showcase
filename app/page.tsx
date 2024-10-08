"use client";

import { useState, useEffect } from 'react';
import { ParallaxProvider } from 'react-scroll-parallax';
import HomeSection from '../components/home/HomeComponent';
import AboutUsSection from '../components/home/AboutUsComponent';
import MoreInfoSection from '../components/home/MoreInfoComponent';
import MenuComponent from '../components/navigation/MenuComponent';
import styles from "./page.module.css";
import Head from 'next/head';

const FullPageNavigation: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionIds = ['home', 'about', 'more-info'];
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleScroll = (event: WheelEvent) => {
    event.preventDefault();
    if (event.deltaY > 0 && currentSection < sectionIds.length - 1) {
      setCurrentSection(currentSection + 1);
    } else if (event.deltaY < 0 && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }
  };

  const handleTouchStart = (event: TouchEvent) => {
    setTouchStart(event.touches[0].clientY);
  };

  const handleTouchMove = (event: TouchEvent) => {
    setTouchEnd(event.touches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;

    if (distance > 50 && currentSection < sectionIds.length - 1) {
      setCurrentSection(currentSection + 1);
    }

    if (distance < -50 && currentSection > 0) {
      setCurrentSection(currentSection - 1);
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  useEffect(() => {
    const section = document.getElementById(sectionIds[currentSection]);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentSection]);

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, touchStart, touchEnd]);

  return (
    <>
      <ParallaxProvider>
        <Head>
          <title>Revenge</title>
          <meta name="description" content="A rotating 3D car with a glitch effect." />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
        </Head>
        <div className={styles.container}>
          <MenuComponent />
          <div className={styles.navigation}>
            {sectionIds.map((id, index) => (
              <div
                key={id}
                onClick={() => setCurrentSection(index)}
                className={`${styles.navDot} ${currentSection === index ? styles.active : ''}`}
              ></div>
            ))}
          </div>
          <HomeSection />
          <AboutUsSection />
          <MoreInfoSection />
        </div>
      </ParallaxProvider>
    </>
  );
};

export default FullPageNavigation;
