import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorage, setStorage, removeStorage, KEYS, seedInitialStorage, MALE_AVATAR_DEFAULT } from '../utils/storage';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Seed initial demo data on mount
    seedInitialStorage();

    // Check logged in user
    const storedUser = getStorage(KEYS.USER, null);
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = getStorage(KEYS.USERS, []);
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      if (email.toLowerCase() === 'demo@example.com' && password === 'Demo@123') {
        const demoUser = {
          id: 'user-demo-123',
          name: 'Aman Singh',
          email: 'demo@example.com',
          avatar: MALE_AVATAR_DEFAULT,
          createdAt: new Date().toISOString()
        };
        setStorage(KEYS.USER, demoUser);
        setUser(demoUser);
        return { success: true, user: demoUser };
      }
      return { success: false, message: 'Invalid email or password. Try demo@example.com / Demo@123' };
    }

    const authUser = {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      avatar: foundUser.avatar || MALE_AVATAR_DEFAULT,
      createdAt: foundUser.createdAt
    };

    setStorage(KEYS.USER, authUser);
    setUser(authUser);
    return { success: true, user: authUser };
  };

  const signup = ({ name, email, password }) => {
    const users = getStorage(KEYS.USERS, []);
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (existing) {
      return { success: false, message: 'An account with this email already exists.' };
    }

    const newUser = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      avatar: MALE_AVATAR_DEFAULT,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    setStorage(KEYS.USERS, users);

    const authUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      createdAt: newUser.createdAt
    };

    setStorage(KEYS.USER, authUser);
    setUser(authUser);
    return { success: true, user: authUser };
  };

  const logout = () => {
    removeStorage(KEYS.USER);
    setUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!user) return;
    const updatedUser = { ...user, ...updatedFields };
    setUser(updatedUser);
    setStorage(KEYS.USER, updatedUser);

    const users = getStorage(KEYS.USERS, []);
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updatedFields };
      setStorage(KEYS.USERS, users);
    }
  };

  const changePassword = (currentPassword, newPassword) => {
    if (!user) return { success: false, message: 'User not authenticated' };
    const users = getStorage(KEYS.USERS, []);
    const idx = users.findIndex((u) => u.id === user.id || u.email.toLowerCase() === user.email.toLowerCase());

    if (idx !== -1 && users[idx].password && users[idx].password !== currentPassword) {
      return { success: false, message: 'Current password does not match.' };
    }

    if (idx !== -1) {
      users[idx].password = newPassword;
      setStorage(KEYS.USERS, users);
    }
    return { success: true, message: 'Password updated successfully!' };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        changePassword,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
