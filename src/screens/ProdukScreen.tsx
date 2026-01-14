import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import PaymentProduk from '../components/PaymentProduk'; // Impor layar DetailBukuScreen
interface Produk {
  id: string;
  nama_produk: string;
  harga: number;
  image: string;
}

const ProdukScreen = ({ navigation }: { navigation: any }) => {
  const [produk, setProduk] = useState<Produk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await fetch('http://10.0.2.2/pustaka-booking/api/produkHalaman');
        const data = await response.json();
  
        console.log('Data produk:', data); // Log data produk yang diterima
  
        if (data.status) {
          setProduk(data.produk);
        } else {
          console.error('Gagal mengambil data produk');
        }
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchProduk();
  }, []);

  const renderProduk = ({ item }: { item: Produk }) => (
    <View style={styles.card}>
      <Image source={{ uri: `http://10.0.2.2/pustaka-booking/assets/img/upload/${item.image}` }} style={styles.image} />
      <Text style={styles.title}>{item.nama_produk}</Text>
      <Text style={styles.price}>Rp {item.harga.toLocaleString('id-ID')}</Text>
      <TouchableOpacity 
        style={styles.buyButton} 
        onPress={() => navigation.navigate('PaymentProduk', { 
          id_produk: item.id, 
          nama_produk: item.nama_produk, 
          harga: item.harga, 
          quantity: 1 // Anda bisa mengubah quantity sesuai kebutuhan
        })}
      >
        <Text style={styles.buyButtonText}>Beli Sekarang</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('DetailProdukScreen', { id: item.id })}>
        <Text style={styles.detailButtonText}>Lihat Detail</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <FlatList
          data={produk}
          renderItem={renderProduk}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  listContainer: {
    paddingVertical: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 16,
  },
  buyButton: {
    backgroundColor: '#28a745',
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 8,
  },
  buyButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  detailButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 5,
  },
  detailButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default ProdukScreen;
