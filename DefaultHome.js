import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';

const DefaultHome = ({ navigation }) => {
// ==   no logic needed here ==

    return (
        <View style={styles.container}>
            {/* Background image */}
            <Image
                source={require('./assets/girl.png')}
                style={styles.backgroundImage}
            />

            {/* Black overlay */}
            <View style={styles.overlay}></View>

            {/* Header section */}
            <View style={styles.header}>
                <View style={styles.logoContainer}>
                    <Image source={require('./assets/myLogo.png')} style={styles.logo} />
                </View>
            </View>

            {/* Body */}
            <View style={styles.body}>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View>
                        <Text style={styles.searchButtonText}>
                            Agents. Tours. Loans. Homes.
                        </Text>
                    </View>

                    {/* text input field */}
                    <TextInput
                        style={styles.input}
                        placeholder="Search by type, closest landmark, or price"
                        placeholderTextColor="#808080"
                        // Implement onChangeText to handle search functionality
                        onChangeText={(text) => console.log('Searching for: ', text)}
                    />

                </View>

                {/* body ends */}
            </View>
        </View>
    );
};

// Stylesheet
const styles = StyleSheet.create({
    header: {
        paddingTop: 50,
        justifyContent: 'flex-end', // Align items to the bottom
        alignItems: 'flex-end', // Align items to the right
        paddingRight: 20, // Add some right padding for the logo
    },
    logoContainer: {
        justifyContent: 'center', // Center the logo vertically
        alignItems: 'flex-end', // Align the logo to the right
    },
    logo: {
        width: 250,
        height: 100,
    },
    body: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Black color with 30% opacity
    },
    searchContainer: {
        position: 'absolute',
        bottom: 100,
        // flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 18,
        paddingVertical: 18,
        margin: 15,
        color: '#000',
        width: '100%', // Adjust the width as needed
    },
    
    searchButton: {
        backgroundColor: '#1B6DC0',
        borderRadius: 5,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
        textShadowColor: '#000',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 2,
    }
    
});

export default DefaultHome;
