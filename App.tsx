import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';
import HomeScreen from './src/screens/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import AboutUsScreen from './src/screens/AboutUsScreen'; // Impor layar AboutUsScreen
import PublikasiScreen from './src/screens/PublikasiScreen'; // Impor layar AboutUsScreen
import DetailBukuScreen from './src/screens/DetailBukuScreen'; // Impor layar DetailBukuScreen
import EventScreen from './src/screens/EventScreen'; // Impor layar DetailBukuScreen
import DetailEventScreen from './src/screens/DetailEventScreen'; // Impor layar DetailBukuScreen
import MateriScreen from './src/screens/MateriScreen'; // Impor layar DetailBukuScreen
import BeritaScreen from './src/screens/BeritaScreen'; // Impor layar DetailBukuScreen
import DetailBeritaScreen from './src/screens/DetailBeritaScreen'; // Impor layar DetailBukuScreen
import MembershipModal from './src/components/MemberhsipModal'; // Impor layar DetailBukuScreen
import PaymentScreen from './src/components/PaymentScreen'; // Impor layar DetailBukuScreen
import ProdukScreen from './src/screens/ProdukScreen'; // Impor layar DetailBukuScreen
import PaymentProduk from './src/components/PaymentProduk'; // Impor layar DetailBukuScreen
import DetailProdukScreen from './src/screens/DetailProdukScreen'; // Impor layar DetailBukuScreen
// Membuat Stack Navigator
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {/* Halaman Home */}
          <Stack.Screen
            name="Home"
            options={{ headerShown: false }} // Menyembunyikan header di halaman Home
            component={HomeScreen}
          />

          {/* Halaman Profile */}
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ title: 'Profil Saya' }}
          />

          {/* Halaman EditProfile */}
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ title: 'Ubah Profil' }}
          />

          {/* Halaman About Us */}
          <Stack.Screen
            name="AboutUsScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={AboutUsScreen}
            options={{ title: 'Tentang Kami' }} // Atur judul di header
          />
          <Stack.Screen
            name="PublikasiScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={PublikasiScreen}
            options={{ title: 'Publikasi' }} // Atur judul di header
          />
          <Stack.Screen
            name="DetailBukuScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={DetailBukuScreen}
            options={{ title: 'Detail Buku' }} // Atur judul di header
          />
          <Stack.Screen
            name="EventScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={EventScreen}
            options={{ title: 'Detail Buku' }} // Atur judul di header
          />
          <Stack.Screen
            name="DetailEventScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={DetailEventScreen}
            options={{ title: 'Detail Event' }} // Atur judul di header
          />
          <Stack.Screen
            name="MateriScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={MateriScreen}
            options={{ title: 'Materi' }} // Atur judul di header
          />
          <Stack.Screen
            name="BeritaScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={BeritaScreen}
            options={{ title: 'Berita' }} // Atur judul di header
          />
           <Stack.Screen
            name="DetailBeritaScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={DetailBeritaScreen}
            options={{ title: 'Detail Berita' }} // Atur judul di header
          />
          <Stack.Screen
            name="PaymentScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={PaymentScreen}
            options={{ title: 'payment screen' }} // Atur judul di header
          />
          <Stack.Screen
            name="ProdukScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={ProdukScreen}
            options={{ title: 'pruduk screen' }} // Atur judul di header
          />
          <Stack.Screen
            name="PaymentProduk" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={PaymentProduk}
            options={{ title: 'payment produk' }} // Atur judul di header
          />
          <Stack.Screen
            name="DetailProdukScreen" // Pastikan nama ini sesuai dengan tujuan navigasi
            component={DetailProdukScreen}
            options={{ title: 'Detail Produk' }} // Atur judul di header
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
