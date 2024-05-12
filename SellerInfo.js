import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const SellerInfo = ({ navigation }) => {
    const handleSeller = () => {
        // Navigate to the GetSeller screen
        navigation.navigate('HomeScreen');
    }
    return (
        <View style={styles.container}>
            {/* User Profile Pic */}
            <Image
                source={require('./assets/amazing.png')} 
                style={styles.profilePic}
            />

            {/* User Information */}
            <View style={styles.userInfo}>
                <Text style={styles.fullName}>Sarcastic Geek</Text>
                <Text style={styles.contactInfo}>Twitter: @gozkybrain4u</Text>
                <Text style={styles.contactInfo}>Email: gozkybrain@gmail.com</Text>
            </View>

            {/* Button to show seller */}
            <TouchableOpacity style={[styles.button, styles.sellerButton]} onPress={() => navigation.goBack()}>
                <Text style={[styles.buttonText, styles.showSellerButtonText]}>Continue  Shopping</Text>
            </TouchableOpacity>

        </View>



    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    profilePic: {
        width: 250,
        height: 250,
        borderRadius: 250,
        backgroundColor: 'cyan',
        borderWidth: 1, // Border width
        borderColor: '#ccc',
        marginBottom: 20,
    },
    userInfo: {
        alignItems: 'center',
    },
    fullName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    sellerButton: {
        backgroundColor: '#1B6DC0',
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20,
    },
    showSellerButtonText: {
        color: '#fff',
    },

    contactInfo: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default SellerInfo;
