import React, { FC, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../context/AuthContext';
import RegisterModal from './RegisterModal';
import LoginModal from './LoginModal';

const Header: FC<{ navigateToProfile: () => void; navigateToAdmin: () => void }> = ({ navigateToProfile, navigateToAdmin }) => {
  const { isLoggedIn, userName, userImage,userPhone, login, logout, roleId } = useAuth();
  const [isRegisterModalVisible, setRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setLoginModalVisible] = useState(false);

  const defaultImage = { uri: 'http://10.0.2.2/pustaka-booking/assets/img/profile/default.jpg' };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://10.0.2.2/pustaka-booking/api/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await response.json();

      if (data.status === 'success') {
        logout();
      } else {
        console.error('Logout gagal:', data.message);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat logout', error);
      Alert.alert('Kesalahan', 'Gagal menghubungi server.');
    }
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.toggleButton}>
        <Text style={styles.toggleText}>☰</Text>
      </TouchableOpacity>

      <View style={styles.profileImgContainer}>
        <Image 
          source={{ uri: userImage || defaultImage.uri }} 
          style={styles.profileImg} 
          onError={() => Alert.alert('Error', 'Image failed to load')} 
        />
      </View>

      <View style={styles.logoContainer}>
        <Text style={styles.siteName}>{isLoggedIn ? userName : 'Pengguna'}</Text>
      </View>

      <View style={styles.socialLinks}>
        {!isLoggedIn ? (
          <>
            <TouchableOpacity style={styles.iconText} onPress={() => setRegisterModalVisible(true)}>
              <Text style={styles.icon}>📋</Text>
              <Text style={styles.linkText}>Daftar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconText} onPress={() => setLoginModalVisible(true)}>
              <Text style={styles.icon}>🔑</Text>
              <Text style={styles.linkText}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {roleId === '1' && (
              <TouchableOpacity style={styles.iconText} onPress={navigateToAdmin}>
                <Text style={styles.icon}>🛠️</Text>
                <Text style={styles.linkText}>Admin</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.iconText} onPress={navigateToProfile}>
              <Text style={styles.icon}>👤</Text>
              <Text style={styles.linkText}>Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconText} onPress={handleLogout}>
              <Text style={styles.icon}>🚪</Text>
              <Text style={styles.linkText}>Logout</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      {isRegisterModalVisible && (
        <RegisterModal visible={isRegisterModalVisible} onClose={() => setRegisterModalVisible(false)} />
      )}
      {isLoginModalVisible && (
        <LoginModal
          visible={isLoginModalVisible}
          onClose={() => setLoginModalVisible(false)}
          onLogin={login}
          onLogout={logout} 
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#333',
  },
  toggleButton: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  toggleText: {
    fontSize: 24,
    color: '#fff',
  },
  profileImgContainer: {
    marginBottom: 10,
  },
  profileImg: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  logoContainer: {
    marginBottom: 10,
  },
  siteName: {
    fontSize: 20,
    color: '#fff',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  iconText: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  linkText: {
    color: '#fff',
  },
});

export default Header;
