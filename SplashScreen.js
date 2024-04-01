// * This serves as a simple onboarding screen
import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }) => {
  // Define animated values for the opacity of the images
  const opacityValue1 = useRef(new Animated.Value(0)).current;
  const opacityValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define the sequence of animations
    const sequenceAnimation = Animated.sequence([
      // Animation for the first image fading in
      Animated.timing(opacityValue1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Animation for the first image fading out
      Animated.timing(opacityValue1, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      // Animation for the second image fading in
      Animated.timing(opacityValue2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Animation for the second image fading out
      Animated.timing(opacityValue2, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    // Start the sequence of animations
    sequenceAnimation.start(() => {
      // Navigate to the next screen after animations complete
      navigation.replace('HomeScreen');
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Background color */}
      <View style={styles.background}>
        {/* First animated image */}
        <Animated.Image
          source={require('./assets/home3.jpg')}
          style={[styles.backgroundImage, { opacity: opacityValue1 }]}
          resizeMode="contain"
        />
      </View>

      {/* Second animated image */}
      <Animated.Image
        source={require('./assets/home1.jpg')}
        style={[styles.backgroundImage, { opacity: opacityValue2 }]}
        resizeMode="contain"
      />
    </View>
  );
};

// Stylesheet for SplashScreen component
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    background: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: '#fff', // Background color
      alignItems: 'center', // Center horizontally
      justifyContent: 'center', // Center vertically
    },
    backgroundImage: {
      width: '100%', // Adjust the width of the first image
      height: '100%', // Adjust the height of the first image
    },
    image: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
    animatedImage: {
      width: 200,
      height: 200,
      marginBottom: 20,
    },
  });
  
export default SplashScreen;
