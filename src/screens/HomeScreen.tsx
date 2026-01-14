import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import axios from 'axios';
import Header from '../components/Header';
import RNFS from 'react-native-fs';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView, { UrlTile } from 'react-native-maps';
import { AuthProvider, useAuth } from '../context/AuthContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Publikasi from './screens/Publikasi';
import MembershipModal from '../components/MemberhsipModal';
// Tipe data
type Buku = {
  id: number;
  judul_buku: string;
  tahun_terbit: string;
  image: string;
  pdf_file: string;
};

type Produk = {
  id: number;
  nama_produk: string;
  harga: number;
  image: string;
};

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [buku, setBuku] = useState<Buku[]>([]);
  const [produk, setProduk] = useState<Produk[]>([]);
  const { isLoggedIn, userName } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch data buku
  useEffect(() => {
    const fetchBuku = async () => {
      try {
        const response = await axios.get('http://10.0.2.2/pustaka-booking/api/home');
        if (response.data && Array.isArray(response.data.buku)) {
          setBuku(response.data.buku.slice(0, 1));
        } else {
          console.error('Data buku tidak ditemukan atau bukan array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching buku data:', error);
      }
    };

    fetchBuku();
  }, []);

  // Fetch data produk
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const response = await axios.get('http://10.0.2.2/pustaka-booking/api/home');
        if (response.data && Array.isArray(response.data.produk)) {
          setProduk(response.data.produk.slice(0, 1));
        } else {
          console.error('Data produk tidak ditemukan atau bukan array:', response.data);
        }
      } catch (error) {
        console.error('Error fetching produk data:', error);
      }
    };

    fetchProduk();
  }, []);
    const downloadPdf = async (fileName: string) => {
      try {
        // Tentukan URL file PDF
        const pdfUrl = `http://10.0.2.2/pustaka-booking/assets/pdf/${fileName}`;
        // Tentukan path lokal untuk menyimpan file
        const localFilePath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
    
        // Unduh file
        const download = await RNFS.downloadFile({
          fromUrl: pdfUrl,
          toFile: localFilePath,
        }).promise;
    
        if (download.statusCode === 200) {
          console.log('File downloaded successfully to:', localFilePath);
    
          // Cek apakah file benar-benar ada setelah diunduh
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
    
    // Fungsi untuk memeriksa apakah file ada
    const checkFileExists = async (path: string) => {
      try {
        const stats = await RNFS.stat(path); // Periksa status file
        console.log(`File size: ${stats.size} bytes`);
        return true;
      } catch (err) {
        console.log('File does not exist:', err.message);
        return false;
      }
    };
  

  

  // Render tiap item e-book
  const renderBuku = ({ item }: { item: Buku }) => (
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
            {/* Tombol Download (Merah) */}
            <TouchableOpacity
              style={[styles.buttonIcon, styles.downloadButton]} // Tambahkan gaya merah
              onPress={() => downloadPdf(item.pdf_file)}
            >
              <Text style={styles.buttonText}>📄 Download</Text>
            </TouchableOpacity>
            
            {/* Tombol Detail */}
            <TouchableOpacity
              style={styles.buttonIcon} // Gunakan gaya default
              onPress={() => navigation.navigate('DetailBukuScreen', { id: item.id })}
            >
              <Text style={styles.buttonText}>🔍 Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
   // Render item produk
   const renderProdukItem = ({ item }: { item: Produk }) => (
    <View style={styles.containerProduk}>
      <View style={styles.produkCard}>
        <Image
          source={{ uri: `http://10.0.2.2/pustaka-booking/assets/img/upload/${item.image}` }}
          style={styles.produkImage}
        />
        <View style={styles.produkInfo}>
          <Text style={styles.produkTitle}>{item.nama_produk}</Text>
          <Text style={styles.produkPrice}>Rp {item.harga.toLocaleString('id-ID')}</Text>
        </View>
      </View>
    </View>
  );
  const handleJoinMembership = () => {
    if (isLoggedIn) {
      setModalVisible(true); // Tampilkan modal
    } else {
      alert('Silakan login untuk bergabung dengan membership.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header navigateToProfile={() => navigation.navigate('Profile')} />

      {/* Scrollable Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer} overScrollMode="never">
        {/* Hero Section */}
        <ImageBackground
          source={{ uri: 'http://10.0.2.2/pustaka-booking/assets/img/hero-bg.jpg' }}
          style={styles.heroContainer}
          imageStyle={styles.heroImage}
        >
          <View style={styles.overlay} />
          <View style={styles.textContainer}>
            <Text style={styles.heroTitle}>Alex Smith</Text>
            <Text style={styles.heroSubtitle}>
              I'm{' '}
              <Text style={styles.typedText}>
                Designer, Developer, Freelancer, Photographer
              </Text>
            </Text>
          </View>
        </ImageBackground>

        {/* About Section */}
        <View style={styles.aboutSection}>
          <View style={styles.sectionTitle}>
            <Text style={styles.sectionHeading}>About</Text>
            <Text style={styles.sectionDescription}>
              Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
              quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui
              impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.
            </Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'http://10.0.2.2/pustaka-booking/assets/img/my-profile-img.jpg' }}
                style={styles.profileImage}
              />
            </View>
            <View style={styles.textContent}>
              <Text style={styles.aboutTitle}>UI/UX Designer & Web Developer.</Text>
              <Text style={styles.italicText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </Text>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Birthday:</Text> 1 May 1995
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Website:</Text> www.example.com
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Phone:</Text> +123 456 7890
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>City:</Text> New York, USA
                  </Text>
                </View>
                <View style={styles.column}>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Age:</Text> 30
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Degree:</Text> Master
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Email:</Text> email@example.com
                  </Text>
                  <Text style={styles.infoText}>
                    <Text style={styles.boldText}>Freelance:</Text> Available
                  </Text>
                </View>
              </View>
              <Text style={styles.description}>
                Officiis eligendi itaque labore et dolorum mollitia officiis optio vero. Quisquam
                sunt adipisci omnis et ut. Nulla accusantium dolor incidunt officia tempore. Et eius
                omnis. Cupiditate ut dicta maxime officiis quidem quia. Sed et consectetur qui quia
                repellendus itaque neque.
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AboutUsScreen')}
              >
                <Text style={styles.buttonText}>More about us</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* E-Book Section */}
        <View style={styles.ebookSection}>
          <Text style={styles.sectionHeading}>e-book</Text>
          <Text style={styles.sectionDescription}>
            Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum
            quidem. Sit sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui
            impedit suscipit alias ea. Quia fugiat sit in iste officiis commodi quidem hic quas.
          </Text>
          <FlatList
  data={buku}
  renderItem={renderBuku}
  keyExtractor={(item) => item.id.toString()}
  horizontal={true} // Mode horizontal
  contentContainerStyle={{
    flexGrow: 1, // Pastikan anak-anak bisa tumbuh ke lebar penuh
    justifyContent: 'center',
    paddingHorizontal: 16, // Opsional: jarak dari tepi
  }}
  showsHorizontalScrollIndicator={false}
/>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('PublikasiScreen')}
          >
            <Text style={styles.buttonText}>Lihat Semua Publikasi</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventSection}>
      {/* Section Event */}
      <Text style={styles.sectionHeading}>Event</Text>
      <Text style={styles.description}>
        Temukan event terbaru yang dapat membantu kamu dalam belajar. Klik tombol di bawah untuk melihat lebih banyak event.
      </Text>
      {/* Button */}
      <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EventScreen')}
          >
            <Text style={styles.buttonText}>Lihat Semua Event</Text>
          </TouchableOpacity>
    </View>
    <View style={styles.kuliahSection}>
      {/* Section Event */}
      <Text style={styles.sectionHeading}>Materi Kuliah</Text>
      <Text style={styles.description}>
      Temukan materi kuliah terbaru yang dapat membantu kamu dalam belajar. Klik tombol di bawah untuk melihat lebih banyak materi.
      </Text>
      {/* Button */}
      <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('MateriScreen')}
          >
            <Text style={styles.buttonText}>Lihat Semua Materi Kuliah</Text>
          </TouchableOpacity>
    </View>
    <View style={styles.eventSection}>
      {/* Section Event */}
      <Text style={styles.sectionHeading}>Berita</Text>
      <Text style={styles.description}>
      Temukan berita terbaru yang dapat membantu kamu dalam belajar. Klik tombol di bawah untuk melihat lebih banyak event.
      </Text>
      {/* Button */}
      <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BeritaScreen')}
          >
            <Text style={styles.buttonText}>Lihat Semua Berita</Text>
          </TouchableOpacity>
    </View>
    <View style={styles.ebookSection}>
          <Text style={styles.sectionHeading}>e-commerce</Text>
          <Text style={styles.sectionDescription}>
          Temukan berbagai buku, jurnal, dan produk lain yang tersedia untuk mendukung pembelajaran Anda. Jelajahi koleksi kami dan dapatkan yang terbaik untuk kebutuhan akademik Anda.
          </Text>
    {/* Products List */}
    <FlatList
        data={produk}
        renderItem={renderProdukItem}
        keyExtractor={(item) => `produk-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        horizontal={true} // Mode horizontal
  contentContainerStyle={{
    flexGrow: 1, // Pastikan anak-anak bisa tumbuh ke lebar penuh
    justifyContent: 'center',
    paddingHorizontal: 16, // Opsional: jarak dari tepi
  }}
  showsHorizontalScrollIndicator={false}
      />

        {/* Button ke Halaman Produk */}
        
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ProdukScreen')} // Navigasi ke halaman produk
          >
            <Text style={styles.buttonText}>Lihat Semua Produk</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventSection}>
      {/* Section Title */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionHeading}>Membership</Text>
        <Text style={styles.description}>
          Dengan bergabung sebagai member, Anda akan mendapatkan akses penuh ke semua artikel dan jurnal dalam format PDF, serta berbagai keuntungan eksklusif lainnya.
        </Text>
      </View>

      {/* Membership Items */}
      <View style={styles.rowMembership}>
  {/* Item 1 */}
  <View style={styles.card}>
  <Icon name="key" size={40} color="#007bff" />
    <Text style={styles.cardTitle}>Akses Penuh ke PDF</Text>
    <Text style={styles.cardDescription}>
      Dapatkan akses tanpa batas ke semua artikel dan jurnal dalam format PDF untuk kebutuhan riset dan studi Anda.
    </Text>
  </View>

  {/* Item 2 */}
  <View style={styles.card}>
  <Icon name="dollar" size={40} color="#007bff" />
    <Text style={styles.cardTitle}>Harga Membership</Text>
    <Text style={styles.cardDescription}>
      Dapatkan semua manfaat keanggotaan dengan harga terjangkau. <Text style={styles.bold}>Hanya Rp 20.000 per bulan</Text>.
    </Text>
  </View>
</View>

{/* Join Membership Button */}
<View style={styles.buttonContainer}>
  <TouchableOpacity style={styles.joinButton} onPress={handleJoinMembership}>
    <Text style={styles.joinButtonText}>
      {isLoggedIn ? 'Join Membership' : 'Login untuk Join Membership'}
    </Text>
  </TouchableOpacity>
</View>
{/* Display Membership Modal jika modalVisible true */}
{modalVisible && (
        <MembershipModal 
              visible={modalVisible}
              onClose={() => setModalVisible(false)} user={{
                nama: '',
                email: '',
                no_tlp: ''
              }}        />
      )}
      </View>
      <View style={styles.ebookSection}>
      {/* Section Title */}
      <View style={styles.sectionTitle}>
        <Text style={styles.sectionHeading}>Contact</Text>
        <Text style={styles.description}>
          Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit
        </Text>
      </View>

      {/* Contact Info */}
      <View style={styles.infoWrap}>
        {/* Address */}
        <View style={styles.infoItem}>
          <Icon name="map-marker" size={40} color="#007bff"  />
          
            <Text style={styles.cardTitle}>Address</Text>
            <Text style={styles.cardDescription}>A108 Adam Street, New York, NY 535022</Text>
         
        </View>

        {/* Call Us */}
        <View style={styles.infoItem}>
          <Icon name="phone" size={40} color="#007bff"  />
          
            <Text style={styles.cardTitle}>Call Us</Text>
            <Text style={styles.cardDescription}>+1 5589 55488 55</Text>
          
        </View>

        {/* Email Us */}
        <View style={styles.infoItem}>
          <Icon name="envelope" size={40} color="#007bff"  />
          
            <Text style={styles.cardTitle}>Email Us</Text>
            <Text style={styles.cardDescription}>info@example.com</Text>
          
        </View>
      </View>
    </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  heroContainer: {
    width: '100%',
    height: height * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  },
  textContainer: {
    zIndex: 2,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
  },
  typedText: {
    fontStyle: 'italic',
    color: '#fff',
  },
  aboutContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  aboutSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },

  sectionHeading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#555',
  },

  row: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  italicText: {
    fontStyle: 'italic',
    marginBottom: 15,
    color: '#555',
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  boldText: {
    fontWeight: 'bold',
  },
  contentContainer: {
    flexDirection: 'column', // Atur elemen secara vertikal
    alignItems: 'center', // Pusatkan konten
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20, // Beri jarak antara gambar dan teks
  },
  profileImage: {
    width: 400, // Ukuran gambar
    height: 300,

  },
  textContent: {
    width: '90%', // Sesuaikan lebar konten teks
  },
  ebookSection: {
    paddingVertical: 60,
    paddingHorizontal: 16, // Tambahkan padding horizontal untuk memberi jarak dari tepi layar
    backgroundColor: '#f4f4f4',
  },
  containerBuku: {
    width: '100%', // Ubah menjadi 100% agar sesuai dengan lebar layar
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#f4f4f4',
  },
  ebookCard: {
    width: '95%', // Hampir penuh layar, sisakan sedikit margin
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 12,
  },
  ebookImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  ebookInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  ebookYear: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  ebookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  buttonIcon: {
    backgroundColor: '#007bff', // Default biru untuk tombol lainnya
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  downloadButton: {
    backgroundColor: '#dc3545', // Warna merah untuk tombol Download
  },
  buttonText: {
    color: '#fff', // Warna teks putih
    fontSize: 16,
    fontWeight: 'bold',
  },
  ebookActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  eventSection: {
    paddingVertical: 60,
    paddingHorizontal: 16, // Tambahkan padding horizontal untuk memberi jarak dari tepi layar
  },
  kuliahSection: {
    paddingVertical: 60,
    paddingHorizontal: 16, // Tambahkan padding horizontal untuk memberi jarak dari tepi layar
    backgroundColor: '#f4f4f4',
  },
  containerProduk: {
    width: '100%', // Ubah menjadi 100% agar sesuai dengan lebar layar
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: '#f4f4f4',
  },
  produkCard: {
    width: '95%', // Hampir penuh layar, sisakan sedikit margin
    backgroundColor: '#ffffff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 12,
  },
  produkImage: {
    width: '100%',
    height: 400,
    resizeMode: 'cover',
  },
  produkInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  produkYear: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  produkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
  },
  rowMembership: {
    flexDirection: 'column', // Ubah ke kolom
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20, // Jarak antar item
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  joinButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  infoWrap: {
    flexDirection: 'column', // Elemen ditumpuk secara vertikal
    justifyContent: 'center', // Elemen di tengah secara vertikal
    alignItems: 'flex-start', // Elemen sejajar ke kiri
    paddingLeft: 20, // Menambahkan jarak dari sisi kiri
    gap: 20, // Jarak antar item
  },
  
  infoItem: {
    
  },
});


export default HomeScreen;
