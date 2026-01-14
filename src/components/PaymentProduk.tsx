import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import axios from 'axios';
import RNFS from 'react-native-fs';
import { useAuth } from '../context/AuthContext';
import { PaymentProdukProps } from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentProduk: React.FC<PaymentProdukProps> = ({ route, navigation }) => {
  const { userToken } = useAuth();
  const { id_produk, nama_produk, harga, quantity } = route.params || {};
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { userName, userEmail } = useAuth();

  const logFile = `${RNFS.DocumentDirectoryPath}/checkout-log.txt`;

  const logToFile = async (message: string) => {
    try {
      await RNFS.appendFile(logFile, `${new Date().toISOString()} - ${message}\n`);
    } catch (error) {
      console.error('Error writing to log file:', error);
    }
  };

  const downloadPdf = async (id: string) => {
    try {
      const response = await axios.get(`http://10.0.2.2/pustaka-booking/api/download/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}`, // Menambahkan token untuk autentikasi jika diperlukan
        },
      });
  
      if (response.data && response.data.file_name) {
        const pdfUrl = `http://10.0.2.2/pustaka-booking/assets/pdf/${response.data.file_name}`;
        const localFilePath = `${RNFS.DocumentDirectoryPath}/${response.data.file_name}`;
  
        const download = await RNFS.downloadFile({
          fromUrl: pdfUrl,
          toFile: localFilePath,
        }).promise;
  
        if (download.statusCode === 200) {
          console.log('File downloaded successfully to:', localFilePath);
  
          // Cek ukuran file setelah diunduh
          const fileSize = await getFileSize(localFilePath);
          console.log(`File size: ${fileSize} bytes`);
  
          // Tampilkan alert sukses
          Alert.alert('Sukses', 'Buku berhasil diunduh.');
        } else {
          console.log('Download failed with status:', download.statusCode);
          Alert.alert('Gagal', 'Unduhan gagal. Coba lagi.');
        }
      } else {
        Alert.alert('Gagal', 'File tidak ditemukan di server.');
      }
    } catch (error) {
      console.error('Error downloading file:', error);
      Alert.alert('Terjadi Kesalahan', 'Gagal mengunduh file. Silakan coba lagi.');
    }
  };
  
  // Fungsi untuk mendapatkan ukuran file
  const getFileSize = async (path: string) => {
    try {
      const stats = await RNFS.stat(path); // Periksa status file
      return stats.size; // Mengembalikan ukuran file dalam byte
    } catch (err) {
      console.log('Error retrieving file size:', err.message);
      return 0; // Mengembalikan 0 jika gagal mengambil ukuran file
    }
  };
  

  useEffect(() => {
    const checkout = async () => {
      try {
        if (!id_produk || !nama_produk || !harga || !quantity) {
          Alert.alert('Kesalahan', 'Data produk tidak lengkap.');
          navigation.goBack();
          return;
        }

        setLoading(true);

        const data = {
          id_produk,
          nama_produk,
          harga,
          quantity,
          first_name: userName,
          email: userEmail,
        };

        const response = await axios.post('http://10.0.2.2/pustaka-booking/api/checkout', data, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });

        if (response.data.token) {
          setSnapToken(response.data.token);
        } else {
          throw new Error('Gagal mengambil Snap Token');
        }
      } catch (error) {
        Alert.alert('Terjadi Kesalahan', 'Gagal memproses checkout.');
      } finally {
        setLoading(false);
      }
    };

    checkout();
  }, [id_produk, nama_produk, harga, quantity, userToken, navigation]);

  let isDownloading = false; // Tambahkan variabel untuk mengecek status unduhan

const handleNavigationChange = async (navState: any) => {
  if (navState.url.includes('success') && !isDownloading) {
    // Tandai sedang mendownload
    isDownloading = true;

    // Transaksi berhasil
    Alert.alert('Sukses', 'Pembayaran berhasil! Buku akan diunduh.');

    // Unduh file PDF setelah pembayaran berhasil
    await downloadPdf(id_produk.toString()); // Panggil fungsi downloadPdf dengan ID produk

    navigation.goBack();
  } else if (navState.url.includes('failure')) {
    // Transaksi gagal
    Alert.alert('Gagal', 'Pembayaran gagal. Silakan coba lagi.');
    navigation.goBack();
  }
};


  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!snapToken) {
    return null;
  }

  return (
    <WebView
      source={{
        uri: `https://app.sandbox.midtrans.com/snap/v4/redirection/${snapToken}`,
      }}
      javaScriptEnabled
      domStorageEnabled
      startInLoadingState
      renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      onNavigationStateChange={handleNavigationChange} // Tambahkan handler navigasi
    />
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentProduk;
