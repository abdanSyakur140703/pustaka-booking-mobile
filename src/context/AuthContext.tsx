import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

// Mendefinisikan tipe data untuk context
interface AuthContextType {
  isLoggedIn: boolean;
  userName: string;
  userEmail: string;
  userImage: string;
  roleId: string; // Role ID
  userPhone: string; // Tambahkan no_tlp di sini
  userMembership: string;
  login: (username: string, email: string, image: string, roleId: string, phone: string ,membershp:string,) => void;
  logout: () => void;
  updateProfile: (newImage: string) => void; // Fungsi updateProfile
  updateMembership: (newMembership: string) => void; // Fungsi baru
}


// Menyediakan context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider untuk memberikan nilai context
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userImage, setUserImage] = useState<string>(''); // Gambar default
  const [roleId, setRoleId] = useState<string>(''); // State untuk roleId
  const [userPhone, setUserPhone] = useState<string>(''); // State untuk nomor telepon
  const [userMembership, setMembershipStatus] = useState<string>(''); // State untuk nomor telepon

  // Mengambil data pengguna dari AsyncStorage
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedUserEmail = await AsyncStorage.getItem('userEmail');
        const storedUserPhone = await AsyncStorage.getItem('userPhone');
        const storedUserImage = await AsyncStorage.getItem('userImage');
        const storedRoleId = await AsyncStorage.getItem('roleId'); // Ambil roleId
        const storedUserMembership = await AsyncStorage.getItem('userMembership');
         

        if (storedUserName && storedUserEmail && storedRoleId && storedUserPhone && storedUserMembership) {
          setIsLoggedIn(true);
          setUserName(storedUserName);
          setUserEmail(storedUserEmail);
          setUserPhone(storedUserPhone);
          setUserImage(storedUserImage || ''); // Gambar default jika tidak ada
          setRoleId((storedRoleId)); // Set roleId
          setMembershipStatus(storedUserMembership);
          
        }
      } catch (error) {
        console.error('Error loading user data from AsyncStorage:', error);
      }
    };

    loadUserData();
  }, []);

  const login = async (
    username: string,
    email: string,
    image: string,
    roleId: string,
    phone: string,
    membership: string,
  ) => {
    console.log('Memulai fungsi login dengan parameter:', {
      username,
      email,
      image,
      roleId,
      phone,
      membership,
    });
  
    try {
      if (roleId === undefined) {
        console.error('roleId tidak tersedia saat login.');
        return;
      }
  
      console.log('Menyimpan roleId ke AsyncStorage:', roleId);
  
      // Simpan roleId ke AsyncStorage
      await AsyncStorage.setItem('roleId', roleId.toString());
  
      console.log('Menyimpan data pengguna lainnya ke AsyncStorage...');
      await AsyncStorage.setItem('userName', username);
      await AsyncStorage.setItem('userEmail', email);
      await AsyncStorage.setItem('userPhone', phone);
      await AsyncStorage.setItem('userImage', image);
      await AsyncStorage.setItem('userMembership', membership);
  
      console.log('Perbarui state aplikasi...');
      setIsLoggedIn(true);
      setUserName(username);
      setUserEmail(email);
      setUserPhone(phone);
      setUserImage(image);
      setRoleId(roleId); // Gunakan langsung roleId dari parameter
      setMembershipStatus(membership);
  
      console.log('Data berhasil disimpan ke AsyncStorage:', {
        username,
        email,
        image,
        phone,
        roleId,
        membership,
      });
    } catch (error) {
      console.error('Error saving user data to AsyncStorage:', error);
    }
  };
  
  
  
  
  

  
  

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('userEmail');
      await AsyncStorage.removeItem('userPhome');
      await AsyncStorage.removeItem('userImage');
      await AsyncStorage.removeItem('roleId'); // Hapus roleId
      await AsyncStorage.removeItem('userMembership'); // Hapus roleId

      setIsLoggedIn(false);
      setUserName('');
      setUserEmail('');
      setUserPhone('');
      setUserImage(''); // Gambar default setelah logout
      setRoleId(''); // Reset roleId setelah logout
      setMembershipStatus('');
    } catch (error) {
      console.error('Error removing user data from AsyncStorage:', error);
    }
  };

  // Fungsi untuk memperbarui gambar profil
  const updateProfile = async (newImage: string) => {
    try {
      await AsyncStorage.setItem('userImage', newImage); // Simpan gambar baru di AsyncStorage
      setUserImage(newImage); // Update state dengan gambar baru
    } catch (error) {
      console.error('Error saving new profile image:', error);
    }
  };
  const updateMembership = async (newMembership: string) => {
    try {
      // Perbarui state
      await AsyncStorage.setItem('userMembership', newMembership); // Simpan gambar baru di AsyncStorage
      setMembershipStatus(newMembership); // Update state dengan gambar baru
    } catch (error) {
      console.error('Error saving membership status to AsyncStorage:', error);
    }
  };
  
  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, userEmail, userImage, roleId,userPhone,userMembership, login, logout, updateProfile,updateMembership }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook untuk menggunakan context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth harus digunakan dalam AuthProvider');
  }
  return context;
};
