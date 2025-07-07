import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Storage from '../utils/storage';

const AuthContext = createContext();

export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const userToken = await Storage.getUserToken();
        const userData = await Storage.getUserData();
        
        if (userToken) {
          setToken(userToken);
        }
        
        if (userData) {
          setUser(userData);
        }
      } catch (e) {
        // Silently handle token verification errors
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, []);

  const login = async (userToken, userData = null) => {
    try {
      await Storage.setUserToken(userToken);
      setToken(userToken);
      
      if (userData) {
        await Storage.setUserData(userData);
        setUser(userData);
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear storage
      await Storage.removeUserToken();
      await Storage.removeUserData();
      
      // Clear state
      setToken(null);
      setUser(null);
    } catch (error) {
      // Even if storage clearing fails, clear the state
      setToken(null);
      setUser(null);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
