import React from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const Loader = () => {
    const pulseAnimation = new Animated.Value(1); // Initial scale value for animation

    const startPulseAnimation = () => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnimation, {
                    toValue: 1.2, // Scale up to 1.2
                    duration: 1000, // Animation duration in milliseconds
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnimation, {
                    toValue: 1, // Scale down to 1
                    duration: 1000, // Animation duration in milliseconds
                    easing: Easing.linear,
                    useNativeDriver: true,
                }),
            ]),
            { iterations: -1 } // Loop indefinitely
        ).start(); // Start the animation
    };

    React.useEffect(() => {
        startPulseAnimation(); // Start the pulsating animation when component mounts
        return () => pulseAnimation.stopAnimation(); // Clean up animation on unmount
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.circle, { transform: [{ scale: pulseAnimation }] }]} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#3498db', // Blue color (you can change it)
    },
});

export default Loader;
