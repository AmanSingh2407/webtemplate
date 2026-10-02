import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorage, setStorage, removeStorage, KEYS, seedInitialStorage } from '../utils/storage';

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
    // Demo authentication check against stored users
    const users = getStorage(KEYS.USERS, []);
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!foundUser) {
      // Allow fallback login with demo@example.com / Demo@123 if user deleted or custom
      if (email.toLowerCase() === 'demo@example.com' && password === 'Demo@123') {
        const demoUser = {
          id: 'user-demo-123',
          name: 'Aman Singh',
          email: 'demo@example.com',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
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
      avatar: foundUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
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
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`,
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

    // Also update in app_users
    const users = getStorage(KEYS.USERS, []);
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updatedFields };
      setStorage(KEYS.USERS, users);
    }
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
