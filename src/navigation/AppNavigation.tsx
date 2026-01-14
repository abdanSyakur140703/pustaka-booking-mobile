// appnavigation.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from '../screens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import { RootStackParamList } from '../types/types'; // Pastikan path ke file types benar

// Membuat stack navigator dengan tipe RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ title: 'Profil Saya' }} // Judul layar Profile
        />
        <Stack.Screen 
          name="EditProfile" 
          component={EditProfileScreen} 
          options={{ title: 'Ubah Profil' }} // Judul layar EditProfile
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;

