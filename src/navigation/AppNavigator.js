import React from 'react';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import CustomDrawerNavigation from './CustomDrawerNavigation';
import LoadingScreen from '../components/LoadingScreen';

const AppNavigator = () => {
  const { token, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (token) {
    return <CustomDrawerNavigation />;
  } else {
    return <AuthStack />;
  }
};

export default AppNavigator;
