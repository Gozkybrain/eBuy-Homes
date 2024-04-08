import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth } from '../firebaseConfig'; 

const SignAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);
      // Handle successful sign-up
      console.log('User registered successfully:', userCredential.user);
    } catch (error) {
      Alert.alert('Sign Up Failed', error.message);
    }
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={(text) => setPassword(text)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

export default SignAuth;
