import React, { useState, FC } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
  onLogin: (username: string, email: string, image: string,  role_id: number,no_tlp: string,membership_status: string,) => void;
  onLogout: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ visible, onClose, onLogin, onLogout }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [roleId, setRoleId] = useState<number | null>(null); // roleId as number or null
  const [membershipStatus, setMembershipStatus] = useState(''); // Status membership

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Peringatan', 'Email dan password harus diisi!');
      return;
    }
  
    try {
      console.log('Mengirim data ke API:', { email, password });
  
      const response = await axios.post(
        'http://10.0.2.2/pustaka-booking/api/login',
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );
  
      console.log('Respons API lengkap:', response.data);
      const { status, message, data } = response.data;
  
      if (status === 'success' && data) {
        console.log('Data user diterima:', data);
  
        const { nama, user_image,  role_id,no_tlp ,membership_status } = data;
  
        const profileImageUrl = user_image
          ? user_image.startsWith('http')
            ? user_image
            : `http://10.0.2.2/pustaka-booking/assets/img/profile/${user_image}`
          : 'http://10.0.2.2/pustaka-booking/assets/img/profile/default.jpg';
  
        console.log('URL Gambar Profil:', profileImageUrl);
  
        // Simpan data ke AsyncStorage
        await AsyncStorage.setItem('roleId', role_id.toString()); // Perbaikan di sini
        
        await AsyncStorage.setItem('userName', nama);
        await AsyncStorage.setItem('userEmail', email);
        await AsyncStorage.setItem('userPhone', phone);
        await AsyncStorage.setItem('userImage', profileImageUrl);
        await AsyncStorage.setItem('userMembership', membershipStatus);
  
        console.log('Memulai login dengan:', {
          username: nama,
          email,
          image: profileImageUrl,
          roleId: role_id, // Pastikan role_id digunakan
          phone: no_tlp,
          membership: membership_status,
        });
  
        onLogin(nama, email, profileImageUrl,  role_id,no_tlp,membership_status);
  
        setIsLoggedIn(true);
  
        if (role_id === 1) {
          Alert.alert('Sukses', 'Login berhasil sebagai Admin!');
        } else if (role_id === 2) {
          Alert.alert('Sukses', 'Login berhasil sebagai Member!');
        }
  
        setEmail('');
        setPassword('');
        onClose();
      } else {
        console.error('Login gagal:', message || 'Respons tidak valid.');
        Alert.alert('Gagal', message || 'Login gagal, periksa email dan password Anda.');
      }
    } catch (error) {
      console.error('Kesalahan selama proses login:', error);
      Alert.alert('Kesalahan', 'Tidak dapat terhubung ke server. Periksa koneksi internet Anda.');
    }
  };
  
  

  const handleLogout = async () => {
    setIsLoggedIn(false);
    setName('');
    setProfileImage('');
    setRoleId(null); // Reset roleId
    await AsyncStorage.clear(); // Clear all AsyncStorage
    onLogout();
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Login Member</Text>

          {isLoggedIn ? (
            <>
              <View style={styles.profileContainer}>
                <Image source={{ uri: profileImage }} style={styles.profileImage} />
                <Text style={styles.loggedInText}>
                  Selamat datang, {name}! ({roleId === 1 ? 'Admin' : 'Member'})
                </Text>
                <Button title="Logout" onPress={handleLogout} color="red" />
              </View>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Alamat Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <Button title="Log in" onPress={handleLogin} />
            </>
          )}

          <Button
            title="Close"
            onPress={() => {
              setEmail('');
              setPassword('');
              onClose();
            }}
            color="red"
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loggedInText: {
    fontSize: 18,
    marginBottom: 10,
  },
  profileContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },
});

export default LoginModal;

