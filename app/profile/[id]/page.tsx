"use client"; // Indicar que este es un Client Component

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';
import Sidebar from '@/components/navigation/SideMenuComponent';
import LoadingSpinner from '../../../components/LoadingSpinnerComponent';
import styles from '../../../styles/ProfilePage.module.css';
import GeneralSection from '../../../components/profile/GeneralSection';
import UserGaragePage from '../../../components/profile/UserGarajePage';
import ProfilesSection from '../../../components/profile/ProfilesSection';
import SettingsSection from '../../../components/profile/SettingsSection';
import AdminPanelSection from '../../../components/profile/AdminPanelSection';
import RequestsSection from '../../../components/profile/RequestsSection';
import ProtectedRoute from '../../../components/ProtectedRoute';

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams(); 
  const [selectedSection, setSelectedSection] = useState('general');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userIdFromUrl = params?.id; 

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
    if (userIdFromUrl) {
      fetchUserData(userIdFromUrl);
    }
  }, [userIdFromUrl, router]);

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
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.topGradientBar}></div>

        <Sidebar
          user={userData}
          selectedSection={selectedSection}
          onSectionChange={handleSectionChange}
        />

        <div className={styles.profileContent}>
          {selectedSection === 'general' && <GeneralSection user={userData} />}
          {selectedSection === 'garage' && <UserGaragePage />}
          {selectedSection === 'profiles' && <ProfilesSection />}
          {selectedSection === 'settings' && <SettingsSection />}
          {selectedSection === 'adminPanel' && <AdminPanelSection />}
          {selectedSection === 'requests' && <RequestsSection />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ProfilePage;
