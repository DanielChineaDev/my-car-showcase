"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig'; // Asegúrate de tener la configuración de Firebase
import Image from 'next/image'; // Para cargar la imagen del usuario
import { motion, AnimatePresence } from 'framer-motion'; // Importamos framer-motion
import styles from '../../styles/profile/ProfilesSection.module.css'; // Asegúrate de tener estilos para las tarjetas de usuario

const ProfilesSection = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('name'); // Estado para el filtro de ordenación
  const [filterByRole, setFilterByRole] = useState<string>('all'); // Estado para el filtro por rol

  // Función para obtener todos los usuarios desde la base de datos
  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users'); // Accede a la colección 'users'
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id, // Asigna el UID del documento como clave única
      })); // Convierte los documentos en un array
      setUsers(usersList);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Ejecuta la consulta cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  // Función para manejar la ordenación
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  // Función para manejar el filtro por rol
  const handleRoleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByRole(event.target.value);
  };

  // Ordenar los usuarios según el valor seleccionado
  const sortedUsers = [...users].sort((a, b) => {
    if (sortBy === 'name') {
      return (a.firstName || '').localeCompare(b.firstName || '');
    } else if (sortBy === 'antiquity') {
      return new Date(b.registrationDate || '1970-01-01').getTime() - new Date(a.registrationDate || '1970-01-01').getTime();
    } else if (sortBy === 'points') {
      return (b.totalPoints || 0) - (a.totalPoints || 0);
    }
    return 0;
  });

  // Filtrar los usuarios por rol (miembro, admin o todos)
  const filteredUsers = sortedUsers.filter((user) => {
    if (filterByRole === 'all') return true; // Mostrar todos
    if (filterByRole === 'admin') return user.role === 'admin';
    if (filterByRole === 'user') return user.role === 'user'; // Ajuste para filtrar por miembros (user)
    return true;
  });

  if (loading) {
    return <p>Cargando corredores...</p>; // Puedes reemplazarlo por un spinner
  }

  return (
    <div className={styles.container}>
      <h1>Corredores</h1>
      <p>Aquí se muestran los demás usuarios de la plataforma.</p>

      {/* Filtros para ordenar y filtrar */}
      <div className={styles.filters}>
        <div className={styles.filterItem}>
          <label htmlFor="sortBy">Ordenar por:</label>
          <select id="sortBy" value={sortBy} onChange={handleSort}>
            <option value="name">Nombre (A-Z)</option>
            <option value="antiquity">Antigüedad</option>
            <option value="points">Puntos Totales</option>
          </select>
        </div>

        <div className={styles.filterItem}>
          <label htmlFor="filterByRole">Filtrar por:</label>
          <select id="filterByRole" value={filterByRole} onChange={handleRoleFilter}>
            <option value="all">Todos</option>
            <option value="admin">Administradores</option>
            <option value="user">Miembros</option>
          </select>
        </div>
      </div>

      {/* Muestra los usuarios en tarjetas con animación de framer-motion */}
      <div className={styles.usersGrid}>
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.div
              key={user.uid}
              className={styles.userCard}
              layout // Esto habilita la animación de reordenamiento
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className={styles.avatarContainer}>
                <Image
                  src={user.avatarUrl || '/default-avatar.png'} // Imagen por defecto si no tiene avatar
                  alt={`${user.firstName} ${user.lastName}`}
                  width={100}
                  height={100}
                  objectFit="cover"
                  className={styles.userAvatar}
                />
              </div>
              <div className={styles.userInfo}>
                <p className={styles.userName}>
                  {user.firstName || 'N/A'} {user.lastName || ''}
                </p>
                <p className={styles.userRole}>
                  {user.role === 'admin' ? 'Administrador' : 'Miembro'}
                </p>
                {/* Mostrar los puntos totales debajo del rol */}
                <p className={styles.userPoints}>
                  Puntos Totales: {user.totalPoints || 0}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProfilesSection;
