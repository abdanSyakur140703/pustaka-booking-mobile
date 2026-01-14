import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

interface ProdukDetail {
    id: string;
    nama_produk: string;
    harga: number;
    image: string;
    deskripsi: string;
}

const DetailProdukScreen = ({ route }: { route: any }) => {
  const { id } = route.params;
  const [detailData, setDetailData] = useState<ProdukDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://10.0.2.2/pustaka-booking/api/detailProduk/${id}`);
        const result = await response.json();
        console.log('Data yang diterima:', result); // Debug: Log data yang diterima
        setDetailData(result.data);
      } catch (err) {
        console.log('Error:', err); // Debug: Log error jika terjadi masalah
        setError('Terjadi kesalahan saat mengambil data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!detailData) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Data tidak ditemukan!</Text>
      </View>
    );
  }

  const imageUrl = detailData.image.startsWith('http')
    ? detailData.image
    : `http://10.0.2.2/pustaka-booking/assets/img/upload/${detailData.image}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{detailData.nama_produk}</Text>
        <Text style={styles.subtitle}>Harga: {detailData.harga}</Text>
        {detailData.deskripsi && <Text style={styles.description}>{detailData.deskripsi}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
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
    color: '#dc3545',
    fontSize: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 12,
  },
});

export default DetailProdukScreen;
