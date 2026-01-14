import React, { useState, FC } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios, { AxiosError } from 'axios';


interface RegisterModalProps {
  visible: boolean;
  onClose: () => void;
}

const RegisterModal: FC<RegisterModalProps> = ({ visible, onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');

  const validateForm = () => {
    if (!name || !address || !email || !phone || !password1 || !password2) {
      Alert.alert('Gagal', 'Semua kolom wajib diisi!');
      return false;
    }
    if (password1 !== password2) {
      Alert.alert('Gagal', 'Password tidak cocok!');
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;
  
    const requestData = {
      nama: name,
      alamat: address,
      email: email,
      no_tlp: phone,
      password: password1,
    };
  
    try {
      const response = await axios.post('http://10.0.2.2/pustaka-booking/api/register', requestData);
      console.log("Response:", response.data);
      if (response.status === 200 && response.data.status === 'success') {
          Alert.alert('Sukses', 'Akun anggota Anda sudah dibuat.');
          onClose();
      } else {
          Alert.alert('Peringatan', response.data.message || 'Ada kesalahan di server, tetapi data telah disimpan.');
      }
    } catch (error) {
      const axiosError = error as AxiosError; // Menambahkan casting ke AxiosError
      if (axiosError.response) {
        console.log("Error Response Data:", axiosError.response.data);
        console.log("Status:", axiosError.response.status);
        console.log("Headers:", axiosError.response.headers);
      } else if (axiosError.request) {
        console.log("Request Error:", axiosError.request);
      } else {
        console.log("General Error:", axiosError.message);
      }
    }
  };
  
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Daftar Anggota</Text>
          <TextInput style={styles.input} placeholder="Nama Lengkap" value={name} onChangeText={setName} />
          <TextInput style={styles.input} placeholder="Alamat Lengkap" value={address} onChangeText={setAddress} />
          <TextInput style={styles.input} placeholder="Alamat Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <TextInput style={styles.input} placeholder="Nomor Telepon" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password1} onChangeText={setPassword1} />
          <TextInput style={styles.input} placeholder="Ulangi Password" secureTextEntry value={password2} onChangeText={setPassword2} />
          <Button title="Simpan" onPress={handleRegister} />
          <Button title="Close" onPress={onClose} color="red" />
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
});

export default RegisterModal;
