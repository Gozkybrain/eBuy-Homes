import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 ** SplashScreen component renders an initial screen with fading animations
 ** before navigating to the authentication screen ('GetAuth').
 **/
const SplashScreen = ({ navigation }) => {
  // Define animated values for opacity of the two images
  const opacityValue1 = useRef(new Animated.Value(0)).current;
  const opacityValue2 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Define a sequence of animations for the splash screen
    const sequenceAnimation = Animated.sequence([
      // Fade in the first image
      Animated.timing(opacityValue1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Fade out the first image
      Animated.timing(opacityValue1, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
      // Fade in the second image
      Animated.timing(opacityValue2, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      // Fade out the second image
      Animated.timing(opacityValue2, {
        toValue: 0,
        duration: 2000,
        useNativeDriver: true,
      }),
    ]);

    // Start the sequence of animations
    sequenceAnimation.start(() => {
      // After animations complete, navigate to the authentication screen
      navigation.replace('GetAuth');
    });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  // Render the SplashScreen component with a linear gradient background
  return (
    <LinearGradient
      colors={['#ffffff', '#3498db']} // Gradient colors from white to blue
      locations={[0.7, 1]} // Set the blue color to start appearing around 30% down the screen
      style={styles.container} // Style for the gradient container
    >
       {/* Logo at top left */}
       <Image source={require('./assets/logo.png')} style={styles.logo} />

      {/* Background container for animated images */}
      <View style={styles.background}>
        {/* Animated first image with opacity controlled by opacityValue1 */}
        <Animated.Image
          source={require('./assets/home3.jpg')}
          style={[styles.backgroundImage, { opacity: opacityValue1 }]}
          resizeMode="contain"
        />
      </View>

      {/* Animated second image with opacity controlled by opacityValue2 */}
      <Animated.Image
        source={require('./assets/home2.jpg')}
        style={[styles.backgroundImage, { opacity: opacityValue2 }]}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

// Stylesheet for SplashScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    position: 'absolute',
    top: 40,
    right: 20,
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  background: {
    ...StyleSheet.absoluteFillObject, // Fill the entire screen
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundImage: {
    width: '100%', // Take up full width of the container
    height: '100%', // Take up full height of the container
  },
});

export default SplashScreen;
