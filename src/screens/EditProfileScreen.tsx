import React, { useState, useEffect, FC } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import axios, { AxiosError } from 'axios';
import { launchImageLibrary } from 'react-native-image-picker';
import { useAuth } from '../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface EditProfileProps {
  userId: number;
  onClose: () => void;
}

const EditProfileScreen: FC<EditProfileProps> = ({ userId, onClose }) => {
  const { userImage, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState<string | null>(userImage);
  const [imageFile, setImageFile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://10.0.2.2/pustaka-booking/api/updateProfile/${userId}`)
        .then(response => {
          const { data } = response;
          setName(data.nama);
          setEmail(data.email);
          setImage(data.image || userImage);
        })
        .catch((error: AxiosError) => {
          console.error('Error fetching profile:', error);
          Alert.alert('Error', 'Gagal mengambil data profil.');
        });
    }
  }, [userId, userImage]);

  const validateForm = () => {
    if (!name || !email) {
      Alert.alert('Gagal', 'Nama dan email wajib diisi!');
      return false;
    }
    return true;
  };

  const handleImagePick = () => {
    launchImageLibrary(
      { mediaType: 'photo', quality: 0.5 },
      (response) => {
        if (response.didCancel) {
          console.log('Pengguna membatalkan pemilihan gambar');
        } else if (response.errorMessage) {
          console.log('Kesalahan ImagePicker: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri = response.assets[0].uri;
          if (uri) {
            setImage(uri);
            setImageFile(response.assets[0]);
          }
        }
      }
    );
  };

  const handleProfileUpdate = async () => {
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append('nama', name);
    formData.append('email', email);

    // Tambahkan gambar baru jika ada
    if (imageFile) {
      formData.append('image', {
        uri: imageFile.uri,
        type: imageFile.type || 'image/jpeg',
        name: imageFile.fileName || 'image.jpg',
      });
    }

    // Kirim nama file gambar lama
    formData.append('oldImage', image);

    console.log('Old Image:', image);
    console.log('New Image File:', imageFile?.fileName);

    setLoading(true);
    try {
      const response = await axios.post('http://10.0.2.2/pustaka-booking/api/updateProfile', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200 && response.data.status === 'success') {
        Alert.alert('Sukses', 'Profil berhasil diperbarui.');
        const newImageUri = `http://10.0.2.2/pustaka-booking/assets/img/profile/${response.data.image}`; // Sertakan path lengkap
        console.log('Response New Image:', newImageUri);

        setImage(newImageUri);

        if (newImageUri) {
          await AsyncStorage.setItem('userImage', newImageUri); // Simpan gambar baru
          updateProfile(newImageUri); // Update context
        } else {
          // Hapus gambar jika null
          await AsyncStorage.removeItem('userImage');
        }
      } else {
        Alert.alert('Peringatan', response.data.message || 'Ada kesalahan di server.');
      }
    } catch (error) {
      console.error('Error:', error as AxiosError);
      Alert.alert('Error', 'Gagal memperbarui profil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ubah Profil</Text>

      {image ? (
        <Image source={{ uri: image }} style={styles.profileImage} />
      ) : (
        <Text>Tidak ada gambar yang tersedia</Text>
      )}

      <Button title="Pilih Gambar" onPress={handleImagePick} />
      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Alamat Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}

      <Button title={loading ? 'Memperbarui...' : 'Simpan Perubahan'} onPress={handleProfileUpdate} disabled={loading} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    alignSelf: 'center',
  },
  loading: {
    marginTop: 20,
    alignSelf: 'center',
  },
});

export default EditProfileScreen;
