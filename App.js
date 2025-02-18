import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView, Alert } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (text) => {
    const formattedText = text.replace(/\D/g, '');

    let displayText = formattedText;
    if (formattedText.length > 4) {
      displayText = `${formattedText.slice(0, 4)} ${formattedText.slice(4, 7)}`;
    }
    if (formattedText.length > 7) {
      displayText = `${formattedText.slice(0, 4)} ${formattedText.slice(4, 7)} ${formattedText.slice(7)}`;
    }

    setPhoneNumber(displayText);

    setIsValid(formattedText.length === 10 || formattedText.length === 0);
  };

  const handleContinue = () => {
    if (isValid) {
      Alert.alert('Success', 'Phone number is valid!');
    } else {
      Alert.alert('Error', 'Please enter a valid phone number.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.header}>
        <Text style={styles.headerText}>Đăng nhập</Text>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.subLabel}>Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro</Text>
        <TextInput
          style={[styles.input, phoneNumber && !isValid && { borderColor: 'red' }]}
          placeholder="Nhập số điện thoại của bạn"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handleInputChange}
          maxLength={12} // Limiting input length to 12 characters (including dashes)
        />
        {phoneNumber && !isValid && <Text style={styles.errorText}>Số điện thoại không hợp lệ</Text>}
      </View>
      <Button title="Tiếp tục" onPress={handleContinue} />
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  subLabel: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});
