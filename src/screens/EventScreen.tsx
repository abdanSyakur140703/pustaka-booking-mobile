import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';

interface Event {
  id_event: string;
  judul_event: string;
  tanggal_event: string;
  lokasi: string;
  gambar: string;
}

const EventScreen = ({ navigation }: { navigation: any }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log('Fetching events...');
        
        const response = await fetch('http://10.0.2.2/pustaka-booking/api/events');
        const data = await response.json();
        console.log('Events:', data.data.events);
  
        // Akses events dari data.data.events
        setEvents(data.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchEvents();
  }, []);
  

  const renderEvent = ({ item }: { item: Event }) => {
    // Mengonversi tanggal dalam format "04 Dec 2024" ke format yang bisa diproses oleh JavaScript
    const eventDate = new Date(item.tanggal_event); // Date automatically parses "04 Dec 2024"
    
    // Format tanggal menjadi format yang lebih nyaman (misalnya: "4 Desember 2024")
    const formattedDate = eventDate.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  
    const imageUrl = item.gambar
      ? `http://10.0.2.2/pustaka-booking/assets/img/events/${item.gambar}`
      : null;
  
    console.log('Formatted Date:', formattedDate); // Log tanggal yang sudah diformat
    console.log('Image URL:', imageUrl); // Periksa apakah URL gambar benar-benar sesuai
  
    return (
      <View style={styles.card}>
        {/* Cek apakah imageUrl ada atau tidak */}
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Gambar tidak tersedia</Text>
          </View>
        )}
        <View style={styles.info}>
          {/* Tampilkan tanggal yang sudah diformat */}
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.title}>{item.judul_event}</Text>
          <Text style={styles.location}>Lokasi: {item.lokasi}</Text>
          {/* Navigasi ke DetailEventScreen */}
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('DetailEventScreen', { id: item.id_event })}
          >
            <Text style={styles.buttonText}>Detail Event</Text>
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

  if (events.length === 0) {
    return (
      <View style={styles.noEventsContainer}>
        <Text style={styles.noEventsText}>Belum ada event yang tersedia saat ini.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Daftar Event</Text>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id_event}
        renderItem={renderEvent}
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
  location: {
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
  noEventsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventsText: {
    fontSize: 18,
    color: '#555',
  },
});

export default EventScreen;
