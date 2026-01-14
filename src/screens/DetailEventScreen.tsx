import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

interface EventDetail {
  judul: string;
  tanggal_event: string;
  waktu_event: string;
  lokasi: string;
  gambar: string;
  deskripsi: string;
  id: number;
}

const DetailEventScreen = ({ route }: { route: any }) => {
  const { id } = route.params;
  const [detailData, setDetailData] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://10.0.2.2/pustaka-booking/api/detailEvent/${id}`);
        const result = await response.json();
        setDetailData(result);
      } catch (err) {
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

  const imageUrl = detailData.gambar.startsWith('http')
    ? detailData.gambar
    : `http://10.0.2.2/pustaka-booking/assets/img/events/${detailData.gambar}`;

  console.log('Image Source:', imageUrl);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{detailData.judul}</Text>
        <Text style={styles.subtitle}>Tanggal: {detailData.tanggal_event}</Text>
        <Text style={styles.subtitle}>Waktu: {detailData.waktu_event}</Text>
        <Text style={styles.subtitle}>Lokasi: {detailData.lokasi}</Text>
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

export default DetailEventScreen;
