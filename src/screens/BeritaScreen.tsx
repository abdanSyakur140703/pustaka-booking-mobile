import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Berita {
  id_berita: string;
  judul_berita: string;
  tanggal_terbit: string;
  konten: string;
  penulis: string;
  gambar: string;
}

const BeritaScreen = ({ navigation }: { navigation: any }) => {
  const [berita, setBerita] = useState<Berita[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBerita = async () => {
        try {
          console.log('Fetching berita...');
          
          const response = await fetch('http://10.0.2.2/pustaka-booking/api/berita');
          const responseText = await response.text(); // Read the response as text
      
          console.log('API Response:', responseText); // Log the raw response
          
          // Try parsing the response as JSON
          const data = JSON.parse(responseText);
          console.log('Berita:', data.data.berita);
      
          setBerita(data.data.berita);
        } catch (error) {
          console.error('Error fetching berita:', error);
        } finally {
          setLoading(false);
        }
      };
      
  
    fetchBerita();
  }, []);
  

  const renderBerita = ({ item }: { item: Berita }) => {
    // Convert the publication date "04 Dec 2024" to a JavaScript-friendly format
    const beritaDate = new Date(item.tanggal_terbit); // Date automatically parses "04 Dec 2024"
    
    // Format the date to a more readable format (e.g., "4 Desember 2024")
    const formattedDate = beritaDate.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  
    const imageUrl = item.gambar
      ? `http://10.0.2.2/pustaka-booking/assets/img/berita/${item.gambar}`
      : null;
  
    console.log('Formatted Date:', formattedDate); // Log the formatted date
    console.log('Image URL:', imageUrl); // Check if the image URL is correctly formatted
  
    return (
      <View style={styles.card}>
        {/* Check if imageUrl exists */}
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Gambar tidak tersedia</Text>
          </View>
        )}
        <View style={styles.info}>
          {/* Display the formatted date */}
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.title}>{item.judul_berita}</Text>
          <Text style={styles.author}>Penulis: {item.penulis}</Text>
          {/* Navigate to BeritaDetailScreen */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DetailBeritaScreen', { id: item.id_berita })}
          >
            <Text style={styles.buttonText}>Detail Berita</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (berita.length === 0) {
    return (
      <View style={styles.noBeritaContainer}>
        <Text style={styles.noBeritaText}>Belum ada berita yang tersedia saat ini.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Berita</Text>
      <FlatList
        data={berita}
        keyExtractor={(item) => item.id_berita}
        renderItem={renderBerita}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  info: {
    padding: 16,
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#007bff',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  author: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBeritaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noBeritaText: {
    fontSize: 18,
    color: '#555',
  },
});

export default BeritaScreen;
