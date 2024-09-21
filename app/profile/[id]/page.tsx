"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../firebaseConfig';
import Sidebar from '@/components/navigation/SideMenuComponent';
import LoadingSpinner from '../../../components/loading/LoadingSpinnerComponent';
import styles from '../../../styles/ProfilePage.module.css';

// Importa las secciones
import GeneralSection from '../../../components/profile/GeneralSection';
import GarageSection from '../../../components/profile/GarageSection';
import ProfilesSection from '../../../components/profile/ProfilesSection';
import SettingsSection from '../../../components/profile/SettingsSection';
import AdminPanelSection from '../../../components/profile/AdminPanelSection';
import RequestsSection from '../../../components/profile/RequestsSection';

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams(); 
  const [selectedSection, setSelectedSection] = useState('general');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authUser, setAuthUser] = useState<any>(null);

  const userIdFromUrl = params?.id; 

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchUserData = async (id: string) => {
    try {
      const userDocRef = doc(db, 'users', id);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserData(userDocSnap.data());
      } else {
        setError('Usuario no encontrado');
      }
    } catch (err) {
      setError('Error al cargar los datos del usuario');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authUser && userIdFromUrl) {
      if (userIdFromUrl !== authUser.uid) {
        router.push(`/profile/${authUser.uid}`);
        return;
      }
      fetchUserData(userIdFromUrl);
    }
  }, [authUser, userIdFromUrl, router]);

  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <Sidebar
        user={userData}
        selectedSection={selectedSection}
        onSectionChange={handleSectionChange}
      />

      <div className={styles.profileContent}>
        {selectedSection === 'general' && <GeneralSection user={userData} />}
        {selectedSection === 'garage' && <GarageSection />}
        {selectedSection === 'profiles' && <ProfilesSection />}
        {selectedSection === 'settings' && <SettingsSection />}
        {selectedSection === 'adminPanel' && <AdminPanelSection />}
        {selectedSection === 'requests' && <RequestsSection />}
      </div>
    </div>
  );
};

export default ProfilePage;
