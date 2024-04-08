// * This is the Authentication page after the Splashscreen
import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Button, Image, Alert } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase app with your Firebase config
const firebaseConfig = {
  // == your firebase configurations here ==
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const GetAuth = ({ navigation }) => {
  // State variables for form inputs, error messages, and mode (login or register)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [fullName, setFullName] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [resetMode, setResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [errors, setErrors] = useState({
    // to handle user authentication (login or registration)
    email: '',
    password: '',
    username: '',
    gender: '',
    fullName: ''
  });

  // Function to handle user authentication (login or registration)
  const handleAuthentication = async () => {
    // Reset all previous errors
    setErrors({
      email: '',
      password: '',
      username: '',
      gender: '',
      fullName: ''
    });

    // Validate inputs
    let formValid = true;

    // Check if email is empty
    if (!email) {
      setErrors(prevState => ({ ...prevState, email: 'Please enter your email' }));
      formValid = false;
    }

    // Check if password is empty
    if (!password) {
      setErrors(prevState => ({ ...prevState, password: 'Please enter your password' }));
      formValid = false;
    }

    // Additional validations for registration mode
    if (!isLogin) {
      // Check if username is empty
      if (!username) {
        setErrors(prevState => ({ ...prevState, username: 'Please enter your username' }));
        formValid = false;
      }
      // Check if gender is empty
      if (!gender) {
        setErrors(prevState => ({ ...prevState, gender: 'Please enter your gender' }));
        formValid = false;
      }
      // Check if full name is empty
      if (!fullName) {
        setErrors(prevState => ({ ...prevState, fullName: 'Please enter your full name' }));
        formValid = false;
      }
    }



    if (formValid) {
      try {
        if (isLogin) {
          // Perform email/password login
          await signInWithEmailAndPassword(auth, email, password);
          console.log('User logged in successfully!');
        } else {
          // Perform email/password registration
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          console.log('User registered successfully!', userCredential.user);
        }
        // Navigate to HomeScreen.js upon successful authentication
        navigation.navigate('HomeScreen');
      } catch (error) {
        console.error('Authentication error:', error.message);
        Alert.alert('Please Provide Valid Information');
      }
    }
  };

  const handleForgotPassword = async () => {
    try {
      // * if email is entered, a verification email is sent
      await sendPasswordResetEmail(auth, resetEmail);
      Alert.alert('Password Reset Email Sent', 'Check your email inbox for instructions to reset your password.');
    } catch (error) {
      console.error('Password reset error:', error.message);
      // * if not, an error message is delivered
      Alert.alert('Password Reset Failed', 'Failed to send password reset email. Please try again.');
    }
  };

  return (
    <ImageBackground source={require('../assets/black.webp')} style={styles.backgroundImage}>

      {/* Logo at top left */}
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      {/* Main Page Content */}
      <View style={styles.container}>
        {!resetMode ? (
          <>
          {/* Text to display depending on the screen, Login or Register */}
            <Text style={styles.title}>{isLogin ? 'Login to Continue' : 'Register an Account'}</Text>
            {!isLogin && (
              // Will not show on login page
              <>
              {/* Choose a Username */}
                <Text style={styles.errorText}>{errors.username}</Text>
                <Text style={styles.inputText}>Choose a Username</Text>
                <TextInput
                  style={styles.input}
                  placeholder="eg. johndoe123"
                  onChangeText={setUsername}
                />
              </>
            )}

            {/* Choose an Email */}
            <Text style={styles.errorText}>{errors.email}</Text>
            <Text style={styles.inputText}>Enter Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="johndoe@gmail.com"
              onChangeText={setEmail}
            />

            {/* Choose Password */}
            <Text style={styles.errorText}>{errors.password}</Text>
            <Text style={styles.inputText}>Enter Password</Text>
            <TextInput
              style={styles.input}
              placeholder="********"
              onChangeText={setPassword}
              secureTextEntry
            />
            {!isLogin && (
              // Will not also show on login page
              <>
              {/* Select a Gender, Male or Female */}
                <Text style={styles.errorText}>{errors.gender}</Text>
                <Text style={styles.inputText}>Select a Gender</Text>
                <View style={styles.genderContainer}>
                  {/* For Male */}
                  <TouchableOpacity
                    style={[styles.genderOption, gender === 'male' && styles.selectedOption]}
                    onPress={() => setGender('male')}
                  >
                    <Text style={styles.genderText}>Male</Text>
                  </TouchableOpacity>
                  {/* For Female */}
                  <TouchableOpacity
                    style={[styles.genderOption, gender === 'female' && styles.selectedOption]}
                    onPress={() => setGender('female')}
                  >
                    <Text style={styles.genderText}>Female</Text>
                  </TouchableOpacity>
                </View>

                {/* Enter Full Name */}
                <Text style={styles.errorText}>{errors.fullName}</Text>
                <Text style={styles.inputText}>What is your name?</Text>
                <TextInput
                  style={styles.input}
                  placeholder="John Doe"
                  onChangeText={setFullName}
                />
              </>
            )}

            {/* Submit button based on screen: Login or Register */}
            <TouchableOpacity onPress={handleAuthentication} style={styles.authButton}>
              <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Create Account'}</Text>
            </TouchableOpacity>
            {/* Toggle text for login or register depending on screen */}
            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
              <Text style={styles.toggleButton}>
                {isLogin ? 'Create an Account' : 'Already have an Account? Login'}
              </Text>
            </TouchableOpacity>
            {/* Text for Forgot Password */}
            <TouchableOpacity onPress={() => setResetMode(true)}>
              <Text style={styles.forgotPassword}>Forgot Password?</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
          {/* Opening the Forgot Password Tab */}
            <Text style={styles.title}>Forgot Password</Text>
            {/* Input Email Address */}
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              onChangeText={setResetEmail}
            />
            {/* Submit Button */}
            <TouchableOpacity onPress={handleForgotPassword} style={styles.authButton}>
              <Text style={styles.buttonText}>Reset Password</Text>
            </TouchableOpacity>
            {/* To Go Back */}
            <TouchableOpacity onPress={() => setResetMode(false)}>
              <Text style={styles.toggleButton}>Go Back</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      {/* Main Page Ends */}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  authButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db', // Blue color for button
    borderRadius: 50,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  toggleButton: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 20,
  },
  forgotPassword: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
    alignSelf: 'flex-start',
  },
  genderContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  genderOption: {
    backgroundColor: 'orange',
    padding: 10,
    minWidth: '50%',
    marginRight: 10,
    justifyContent: 'center',
    borderRadius: 4,
  },
  selectedOption: {
    backgroundColor: '#3498db',
  },
  genderText: {
    color: '#fff',
  },
  inputText: {
    color: '#000',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default GetAuth;
