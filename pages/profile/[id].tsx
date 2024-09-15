import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebaseConfig'; // Asegúrate de tener configuración de Firebase Storage
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Image from 'next/image'; // Usaremos Next.js Image
import styles from '../../styles/ProfilePage.module.css'; // Asegúrate de que el archivo CSS esté correctamente referenciado
import Sidebar from '@/components/SideMenuComponent';

const ProfilePage = () => {
  const router = useRouter();
  const { id } = router.query; // El ID del usuario desde la URL
  const [userData, setUserData] = useState<any>(null); // Estado para los datos del usuario
  const [loading, setLoading] = useState(true);
  const [editableFields, setEditableFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    notifications: 0, // Campo para notificaciones
    avatarUrl: '/mnt/data/original-4d4042835fd3881071c03326dccbc14d.webp', // Aquí se usará la imagen cargada
  });
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null); // Archivo de la imagen de perfil

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const userDocRef = doc(db, 'users', id as string);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setUserData(data);
            setEditableFields({
              firstName: data.firstName || '',
              lastName: data.lastName || '',
              email: data.email || '',
              notifications: data.notifications || 0,
              avatarUrl: data.avatarUrl || '/mnt/data/original-4d4042835fd3881071c03326dccbc14d.webp', // Usando imagen cargada
            });
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

    fetchUserData();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableFields({
      ...editableFields,
      [name]: value,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadProfileImage = async (file: File) => {
    const storageRef = ref(storage, `avatars/${id}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let newAvatarUrl = editableFields.avatarUrl;

      // Si hay una nueva imagen seleccionada, sube la imagen al almacenamiento de Firebase
      if (imageFile) {
        newAvatarUrl = await uploadProfileImage(imageFile);
      }

      const userDocRef = doc(db, 'users', id as string);
      await updateDoc(userDocRef, {
        ...editableFields,
        avatarUrl: newAvatarUrl, // Actualiza la imagen de perfil
      });
      alert('Perfil actualizado correctamente');
    } catch (err) {
      setError('Error al actualizar el perfil');
    }
  };

  const handleMarkAsRead = async () => {
    try {
      const userDocRef = doc(db, 'users', id as string);
      await updateDoc(userDocRef, { notifications: 0 }); // Marcar notificaciones como leídas
      setEditableFields((prev) => ({ ...prev, notifications: 0 }));
    } catch (err) {
      setError('Error al marcar notificaciones como leídas');
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className={styles.container}>
      <Sidebar user={editableFields}/>

      <div className={styles.profileContent}>
        <h1>Perfil de {editableFields.firstName} {editableFields.lastName}</h1>

        {editableFields.notifications > 0 && (
          <div>
            <p>Tienes {editableFields.notifications} notificaciones pendientes</p>
            <button onClick={handleMarkAsRead}>Marcar como leídas</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.profileForm}>
          <div style={{ position: 'relative' }}>
            <Image
              src={editableFields.avatarUrl}
              alt="Avatar"
              width={150}
              height={150}
              style={{ borderRadius: '50%' }}
            />
            {editableFields.notifications > 0 && (
              <span className={styles.badge}>
                {editableFields.notifications}
              </span>
            )}
          </div>

          <label>
            Cambiar imagen de perfil:
            <input type="file" onChange={handleImageChange} />
          </label>

          <label>
            Nombre:
            <input
              type="text"
              name="firstName"
              value={editableFields.firstName}
              onChange={handleInputChange}
              className={styles.inputField} 
            />
          </label>

          <label>
            Apellidos:
            <input
              type="text"
              name="lastName"
              value={editableFields.lastName}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </label>

          <label>
            Email:
            <input
              type="email"
              name="email"
              value={editableFields.email}
              onChange={handleInputChange}
              className={styles.inputField}
            />
          </label>

          <button type="submit">Guardar Cambios</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
