import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFS from 'react-native-fs';
import { useAuth } from '../context/AuthContext';

interface Buku {
  id: string;
  image: string;
  tahun_terbit: string;
  judul_buku: string;
  pdf_file: string;
  is_exclusive: string; // Menambahkan properti is_exclusive
}

const PublikasiScreen = ({ navigation }: { navigation: any }) => {
  const [buku, setBuku] = useState<Buku[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
 

  useEffect(() => {
    const fetchPublikasi = async () => {
      try {
        const response = await fetch('http://10.0.2.2/pustaka-booking/api/publikasi');
        const data = await response.json();
        console.log('Data Publikasi:', data);

        if (data.status) {
          setBuku(data.buku); // Menyimpan data buku
        } else {
          console.error('Gagal mengambil data');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      } finally {
        setIsLoading(false); // Selesai loading
      }
    };

    fetchPublikasi();
  }, []);

  const checkMembershipStatus = async (): Promise<boolean> => {
    try {
      const isMembership = await AsyncStorage.getItem('userMembership');
      console.log('Status membership:', isMembership);
      return isMembership === '1'; // Jika userMembership bernilai "1", pengguna adalah member
    } catch (error) {
      console.error('Error reading membership status from AsyncStorage:', error);
      return false;
    }
  };

  const downloadPdf = async (fileName: string, isExclusive: string) => {
    console.log(`File: ${fileName}, isExclusive: ${isExclusive}`); // Log nilai isExclusive

    try {
      // Cek apakah buku eksklusif
      if (isExclusive === "1") {
        const isMember = await checkMembershipStatus();
        if (!isMember) {
          alert("Buku ini eksklusif. Silakan bergabung dengan membership untuk mengunduh.");
          return;
        }
      }

      const pdfUrl = `http://10.0.2.2/pustaka-booking/assets/pdf/${fileName}`;
      const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

      const download = await RNFS.downloadFile({
        fromUrl: pdfUrl,
        toFile: localFilePath,
      }).promise;

      if (download.statusCode === 200) {
        console.log('File downloaded successfully to:', localFilePath);

        const fileExists = await checkFileExists(localFilePath);
        if (fileExists) {
          console.log('File exists and is ready to use.');
        }
      } else {
        console.log('Download failed with status:', download.statusCode);
      }
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const checkFileExists = async (path: string) => {
    try {
      const stats = await RNFS.stat(path);
      console.log(`File size: ${stats.size} bytes`);
      return true;
    } catch (err) {
      console.log('File does not exist:', err.message);
      return false;
    }
  };

  const renderBuku = ({ item }: { item: Buku }) => {
    console.log(`Judul: ${item.judul_buku}, is_exclusive: ${item.is_exclusive}`); // Menampilkan log nilai is_exclusive

    return (
      <View style={styles.containerBuku}>
        <View style={styles.ebookCard}>
          <Image
            source={{ uri: `http://10.0.2.2/pustaka-booking/assets/img/upload/${item.image}` }}
            style={styles.ebookImage}
          />
          <View style={styles.ebookInfo}>
            <Text style={styles.ebookYear}>{item.tahun_terbit.slice(0, 4)}</Text>
            <Text style={styles.ebookTitle}>{item.judul_buku}</Text>
            <View style={styles.ebookActions}>
              <TouchableOpacity
                style={[styles.buttonIcon, styles.downloadButton]}
                onPress={() => downloadPdf(item.pdf_file, item.is_exclusive)}
              >
                <Text style={styles.buttonText}>📄 Download</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonIcon, styles.detailButton]} // Tombol Detail dengan warna biru
                onPress={() => navigation.navigate('DetailBukuScreen', { id: item.id })}
              >
                <Text style={styles.buttonText}>🔍 Detail</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          <View style={styles.sectionTitle}>
            <Text style={styles.heading}>Publikasi</Text>
            <Text style={styles.description}>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
              quidem. Sit sint consectetur velit.
            </Text>
          </View>

          <FlatList
            data={buku}
            renderItem={renderBuku}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.listContainer}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  sectionTitle: {
    padding: 16,
    backgroundColor: '#007bff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  description: {
    fontSize: 14,
    color: '#e0e0e0',
    marginTop: 8,
  },
  listContainer: {
    padding: 16,
  },
  containerBuku: {
    marginBottom: 16,
  },
  ebookCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  ebookImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  ebookInfo: {
    padding: 16,
  },
  ebookYear: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 8,
  },
  ebookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  ebookActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonIcon: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  downloadButton: {
    backgroundColor: '#ff4d4d',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailButton: {
    backgroundColor: '#007bff', // Biru untuk tombol Detail
  },
});

export default PublikasiScreen;
