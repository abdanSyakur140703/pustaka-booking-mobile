// ProfileScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Button } from 'react-native';
import { useAuth } from '../context/AuthContext'; // Pastikan path ini benar
import { useNavigation } from '@react-navigation/native'; // Import navigasi
import { StackNavigationProp } from '@react-navigation/stack'; // Import StackNavigationProp
import { RootStackParamList } from '../types/types'; // Impor tipe rute

// Definisikan tipe navigasi untuk ProfileScreen
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profile'>;

const ProfileScreen: React.FC = () => {
  const { userName, userEmail, userImage } = useAuth();
  const navigation = useNavigation<ProfileScreenNavigationProp>(); // Inisialisasi navigasi dengan tipe yang benar

  const handleEditProfile = () => {
    navigation.navigate('EditProfile'); // Navigasi ke layar EditProfile
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.cardContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: userImage || 'https://via.placeholder.com/150' }} 
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{userName}</Text>
          <Text style={styles.text}>{userEmail}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Ubah Profil" color="#17a2b8" onPress={handleEditProfile} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    width: '90%',
    elevation: 4,
  },
  imageContainer: {
    width: '100%',
    height: 150,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  infoContainer: {
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
  },
  buttonContainer: {
    margin: 16,
  },
});

export default ProfileScreen;
