import React, { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for navigation props
type RootStackParamList = {
  MembershipModal: undefined;
  PaymentScreen: {
    snapToken: string;
    email: string;
    nama: string;
    no_tlp: string;
  };
};

type MembershipModalNavigationProp = StackNavigationProp<RootStackParamList, 'MembershipModal'>;

interface MembershipModalProps {
  visible: boolean;
  onClose: () => void;
}

const MembershipModal: React.FC<MembershipModalProps> = ({ visible, onClose }) => {
  const [snapToken, setSnapToken] = useState<string | null>(null);
  const [user, setUser] = useState({
    nama: '',
    email: '',
    no_tlp: '',
  });
  const navigation = useNavigation<MembershipModalNavigationProp>();  // Explicitly type the navigation hook

  // Fetch user data from AsyncStorage
  const fetchUserData = async () => {
    try {
      const nama = await AsyncStorage.getItem('userName');
      const email = await AsyncStorage.getItem('userEmail');
      const no_tlp = await AsyncStorage.getItem('userPhone');
      
      if (nama && email && no_tlp) {
        setUser({ nama, email, no_tlp });
      } else {
        Alert.alert('Error', 'Data pengguna tidak lengkap di AsyncStorage.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      Alert.alert('Error', 'Gagal mengambil data pengguna.');
    }
  };

  // Fetch snap token from API
  const fetchSnapToken = async () => {
    if (!user.email) {
      Alert.alert('Error', 'Data pengguna tidak lengkap.');
      return;
    }

    try {
      const response = await fetch('http://10.0.2.2/pustaka-booking/api/create_transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      
      if (data?.status === 'success' && data?.snap_token) {
        setSnapToken(data.snap_token);
      } else {
        const errorMessage = data?.message || 'Gagal mendapatkan Snap token.';
        Alert.alert('Error', errorMessage);
      }
    } catch (error) {
      console.error('Error fetching Snap Token:', error);
      Alert.alert('Error', `Gagal mendapatkan Snap token: ${error.message}`);
    }
  };

  useEffect(() => {
    if (visible) {
      fetchUserData(); // Fetch user data when modal becomes visible
    }
  }, [visible]);

  useEffect(() => {
    if (user.email) {
      fetchSnapToken(); // Fetch Snap token when user email is available
    }
  }, [user.email]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Membership</Text>

          {!snapToken ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Nama Pengguna</Text>
                <TextInput style={styles.input} value={user.nama} editable={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email Pengguna</Text>
                <TextInput style={styles.input} value={user.email} editable={false} />
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Nomor Telepon</Text>
                <TextInput style={styles.input} value={user.no_tlp} editable={false} />
              </View>

              <TouchableOpacity
                style={styles.payButton}
                onPress={() => {
                  if (snapToken) {
                    onClose(); // Tutup modal
                    navigation.navigate('PaymentScreen', {
                      snapToken: snapToken, // Kirim Snap Token
                      email: user.email,    // Kirim Email Pengguna
                      nama: user.nama,      // (Opsional) Kirim Nama Pengguna
                      no_tlp: user.no_tlp,  // (Opsional) Kirim Nomor Telepon
                    });
                  } else {
                    Alert.alert('Error', 'Snap Token tidak tersedia.');
                  }
                }}
              >
                <Text style={styles.payButtonText}>Bayar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Tutup</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    width: '100%',
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginVertical: 10,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f44336',
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default MembershipModal;
