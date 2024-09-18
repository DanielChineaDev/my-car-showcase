"use client";

import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/profile/ProfilesSection.module.css';

const ProfilesSection = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<string>('name');
  const [filterByRole, setFilterByRole] = useState<string>('all');

  const fetchUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersList = usersSnapshot.docs.map((doc) => ({
        ...doc.data(),
        uid: doc.id,
      }));
      setUsers(usersList);
    } catch (error) {
      console.error('Error al cargar los usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value);
  };

  const handleRoleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterByRole(event.target.value);
  };

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

  const filteredUsers = sortedUsers.filter((user) => {
    if (filterByRole === 'all') return true;
    if (filterByRole === 'admin') return user.role === 'admin';
    if (filterByRole === 'user') return user.role === 'user';
    return true;
  });

  if (loading) {
    return <p>Cargando corredores...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Corredores</h1>
      <p className={styles.description}>Aquí se muestran los demás usuarios de la plataforma.</p>

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

      <div className={styles.usersGrid}>
        <AnimatePresence>
          {filteredUsers.map((user) => (
            <motion.div
              key={user.uid}
              className={styles.userCard}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className={styles.avatarContainer}>
                <Image
                  src={user.avatarUrl || '/default-avatar.png'}
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
                <p className={styles.userPoints}>
                  Puntos: {user.totalPoints || 0}
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
