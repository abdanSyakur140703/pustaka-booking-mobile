import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import RNFS from 'react-native-fs';

interface Materi {
  judul_materi: string;
  deskripsi: string;
  tanggal_upload: string;
  file_materi: string;
}

const MateriScreen = () => {
  // State untuk menyimpan daftar materi
  const [materiList, setMateriList] = useState<Materi[]>([]);
  // State untuk indikator loading
  const [loading, setLoading] = useState(true);
  // State untuk pesan error jika terjadi masalah
  const [error, setError] = useState<string | null>(null);

  // Mengambil data dari API saat komponen dimuat
  useEffect(() => {
    const fetchMateri = async () => {
      try {
        // Melakukan fetch ke API
        const response = await fetch('http://10.0.2.2/pustaka-booking/api/materi');
        const result = await response.json();

        // Validasi apakah data sesuai format yang diharapkan
        if (result.materi_kuliah && Array.isArray(result.materi_kuliah)) {
          setMateriList(result.materi_kuliah); // Mengisi state materiList dengan data dari API
        } else {
          throw new Error('Data tidak valid'); // Melempar error jika format data tidak sesuai
        }
      } catch (err) {
        setError('Terjadi kesalahan saat mengambil data.'); // Menampilkan error jika terjadi masalah
      } finally {
        setLoading(false); // Menghentikan indikator loading
      }
    };

    fetchMateri();
  }, []);

  // Fungsi untuk mengunduh file dari URL yang diberikan
  const downloadFile = async (fileUrl: string) => {
    const fileName = fileUrl.split('/').pop(); // Mendapatkan nama file dari URL
    const downloadPath = `${RNFS.DownloadDirectoryPath}/${fileName}`; // Menentukan path untuk menyimpan file

    try {
      // Melakukan unduhan menggunakan RNFS
      const result = await RNFS.downloadFile({
        fromUrl: fileUrl,
        toFile: downloadPath,
      }).promise;

      // Jika status kode 200, unduhan berhasil
      if (result.statusCode === 200) {
        Alert.alert('Unduhan selesai', `File telah diunduh ke ${downloadPath}`);
      } else {
        Alert.alert('Gagal mengunduh', 'Terjadi kesalahan saat mengunduh file.');
      }
    } catch (error) {
      Alert.alert('Gagal mengunduh', 'Terjadi kesalahan saat mengunduh file.');
    }
  };

  // Fungsi untuk merender setiap item materi
  const renderMateri = ({ item }: { item: Materi }) => {
    const fileUrl = `http://10.0.2.2/pustaka-booking/assets/materi/${item.file_materi}`; // URL lengkap file materi
    return (
      <View style={styles.materiContainer}>
        <Text style={styles.judul}>Judul: {item.judul_materi}</Text>
        <Text style={styles.deskripsi}>Deskripsi: {item.deskripsi}</Text>
        <Text style={styles.tanggal}>Tanggal Upload: {new Date(item.tanggal_upload).toLocaleDateString()}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => downloadFile(fileUrl)}>
          <Text style={styles.buttonText}>Download Materi</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Menampilkan indikator loading jika data sedang dimuat
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  // Menampilkan pesan error jika terjadi masalah
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  // Menampilkan daftar materi dalam bentuk FlatList
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Materi Kuliah</Text>
      <FlatList
        data={materiList}
        renderItem={renderMateri} // Menggunakan fungsi renderMateri untuk setiap item
        keyExtractor={(item, index) => index.toString()} // Memberikan key unik untuk setiap item
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  materiContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  judul: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  deskripsi: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  tanggal: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
  listContainer: {
    paddingBottom: 16,
  },
});

export default MateriScreen;
