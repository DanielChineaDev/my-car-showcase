import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth'; // Importa la autenticación de Firebase
import { db } from '../../firebaseConfig';
import Sidebar from '@/components/SideMenuComponent';
import LoadingSpinner from '@/components/LoadingSpinnerComponent';
import styles from '../../styles/ProfilePage.module.css';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query; // El ID del usuario desde la URL
  const [selectedSection, setSelectedSection] = useState('general'); // Controla la sección seleccionada
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [authUser, setAuthUser] = useState<any>(null); // Estado para el usuario autenticado

  // Verifica si el usuario está autenticado
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user); // Guarda el usuario autenticado
      } else {
        router.push('/'); // Redirigir a la página de inicio de sesión si no está autenticado
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (authUser && id) {
        // Si el usuario autenticado intenta acceder al perfil de otro usuario, redirigirlo a su propio perfil
        if (id !== authUser.uid) {
          router.push(`/profile/${authUser.uid}`);
          return;
        }

        try {
          const userDocRef = doc(db, 'users', id as string);
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
      }
    };
    if (authUser) fetchUserData();
  }, [id, authUser, router]);

  // Controla la sección activa en el menú
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
      <Sidebar user={userData} selectedSection={selectedSection} onSectionChange={handleSectionChange} />

      <div className={styles.profileContent}>
        {/* Renderiza contenido basado en la sección seleccionada */}
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
