import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig'; // Importa tu configuración de Firebase
import GarageSection from './GarageSection'; // Importa tu componente GarageSection

const UserGaragePage = () => {
  const [userId, setUserId] = useState<string | null>(null); // Aquí almacenaremos el UID del usuario
  const [cars, setCars] = useState<Car[]>([]); // Inicializamos como un array vacío
  const [loading, setLoading] = useState(true); // Para mostrar un spinner mientras se cargan los datos
  const [error, setError] = useState<string | null>(null); // Para manejar errores

  useEffect(() => {
    const auth = getAuth();
    
    // Verificamos el estado de autenticación del usuario
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Aquí obtenemos el UID del usuario autenticado
      } else {
        setError('Usuario no autenticado');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!userId) return; // No hacemos la llamada si el userId es null

    const fetchUserCars = async () => {
      try {
        console.log('Obteniendo datos del usuario para el ID:', userId);
        const userDocRef = doc(db, 'users', userId); // Referencia al documento del usuario
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          console.log('Datos del usuario obtenidos:', userData);

          if (userData.cars && Array.isArray(userData.cars)) {
            setCars(userData.cars); // Establecemos el array de coches desde el campo "cars"
          } else {
            setCars([]); // Si no hay coches, inicializamos como un array vacío
          }
        } else {
          setError('El documento del usuario no existe.');
          console.error('El documento del usuario no existe.');
        }
      } catch (error) {
        setError('Error obteniendo los datos del usuario.');
        console.error('Error obteniendo los datos del usuario:', error);
      } finally {
        setLoading(false); // Desactivamos el spinner
      }
    };

    fetchUserCars();
  }, [userId]);

  if (loading) {
    return <p>Cargando...</p>; // Muestra un mensaje o spinner mientras se cargan los datos
  }

  if (error) {
    return <p>{error}</p>; // Muestra cualquier error que ocurra durante la obtención de los datos
  }

  return (
    <div>
      <GarageSection cars={cars} /> {/* Pasamos los coches obtenidos a GarageSection */}
    </div>
  );
};

export default UserGaragePage;
