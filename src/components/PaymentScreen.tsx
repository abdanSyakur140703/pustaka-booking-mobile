import React from 'react';
import { ActivityIndicator, Alert, StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useAuth } from '../context/AuthContext'; // Import the AuthContext hook
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentScreen = ({ route, navigation }) => {
  const { snapToken } = route.params; // Only snapToken is needed from params
  const { userEmail, setMembershipStatus } = useAuth(); // Access context data and functions
   const { userMembership, updateMembership } = useAuth();

  const updateMembershipStatus = async (): Promise<void> => {
    try {
      const response = await fetch('http://10.0.2.2/pustaka-booking/api/update_membership', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        await updateMembership('1'); // Update membership in AuthContext
        const updatedStatus = await AsyncStorage.getItem('userMembership');
        console.log('Updated AsyncStorage Membership Status:', updatedStatus);
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Failed to update membership.');
      }
    } catch (error) {
      console.error('Error updating membership:', error);
      Alert.alert('Error', 'An error occurred while updating membership.');
    }
  };

  const handleNavigationStateChange = (event) => {
    if (event.url.includes('success')) {
      Alert.alert('Success', 'Payment was successful.', [
        {
          text: 'OK',
          onPress: async () => {
            await updateMembershipStatus(); // Update membership on success
            navigation.goBack();
          },
        },
      ]);
    } else if (event.url.includes('failure')) {
      Alert.alert('Error', 'Payment failed.', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    }
  };

  return (
    <WebView
      source={{
        uri: `https://app.sandbox.midtrans.com/snap/v4/redirection/${snapToken}`,
      }}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      startInLoadingState={true}
      renderLoading={() => <ActivityIndicator size="large" color="#0000ff" />}
      onNavigationStateChange={handleNavigationStateChange}
      onError={() => {
        Alert.alert('Error', 'Failed to load the payment page.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }}
      onHttpError={(syntheticEvent) => {
        const { nativeEvent } = syntheticEvent;
        console.error('HTTP error:', nativeEvent);
        Alert.alert('Error', 'An HTTP error occurred.', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }}
    />
  );
};

export default PaymentScreen;
