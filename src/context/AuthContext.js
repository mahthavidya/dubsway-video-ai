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
        // Handle error silently
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
    } catch (e) {
      // Handle error silently
    }
  };

  const logout = async () => {
    try {
      await Storage.removeUserToken();
      await Storage.removeUserData();
      setToken(null);
      setUser(null);
    } catch (e) {
      // Handle error silently
    }
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
