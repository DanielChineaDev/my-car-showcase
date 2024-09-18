"use client";

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../../../firebaseConfig';
import Sidebar from '@/components/navigation/SideMenuComponent';
import LoadingSpinner from '../../../components/loading/LoadingSpinnerComponent';
import styles from '../../../styles/ProfilePage.module.css';

const ProfilePage = () => {
  const router = useRouter();
  const params = useParams(); // Obtiene los parámetros dinámicos de la URL
  const [selectedSection, setSelectedSection] = useState('general');
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authUser, setAuthUser] = useState<any>(null);

  const userIdFromUrl = params?.id; // Asegúrate de que params.id está definido correctamente

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        // Redirigir a la página de inicio si no está autenticado
        router.push('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  // Función para obtener los datos del usuario
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

  // Si hay un usuario autenticado y la URL tiene el id, obtener los datos
  useEffect(() => {
    if (authUser && userIdFromUrl) {
      if (userIdFromUrl !== authUser.uid) {
        router.push(`/profile/${authUser.uid}`);
        return;
      }
      fetchUserData(userIdFromUrl);
    }
  }, [authUser, userIdFromUrl, router]);

  // Controla la sección activa en el menú
  const handleSectionChange = (section: string) => {
    setSelectedSection(section);
  };

  // Mostrar spinner mientras carga
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
        {selectedSection === 'general' && (
          <div>
            <h1>General</h1>
            <p>Información general del usuario.</p>
          </div>
        )}
        {selectedSection === 'garage' && (
          <div>
            <h1>Garaje</h1>
            <p>Aquí se muestran los autos del usuario.</p>
          </div>
        )}
        {selectedSection === 'settings' && (
          <div>
            <h1>Configuración</h1>
            <p>Opciones de configuración del usuario.</p>
          </div>
        )}
        {selectedSection === 'adminPanel' && (
          <div>
            <h1>Panel de administrador</h1>
            <p>Acceso a las funciones de administrador.</p>
          </div>
        )}
        {selectedSection === 'requests' && (
          <div>
            <h1>Solicitudes</h1>
            <p>Aquí se muestran las solicitudes pendientes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
