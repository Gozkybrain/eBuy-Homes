import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GetHelp = ({ navigation }) => {
    // State variables to manage form inputs
    const [gender, setGender] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [fullName, setFullName] = useState('');

    const goBack = () => {
        navigation.goBack(); // Go back to the previous screen
    };

    // Function to handle form submission
    const handleContinue = () => {
        // Check if all required fields are filled
        if (gender.trim() !== '' && selectedDate.trim() !== '' && fullName.trim() !== '') {
            // Navigate to AuthMain component if all fields are filled
            navigation.navigate('AuthMain');
        } else {
            // Display error message if any required field is empty
            Alert.alert('Error', 'Please provide all information!');
        }
    };

    // Function to format the date as "dd/mm/yyyy" while typing
    const formatDateString = (text) => {
        // Remove non-numeric characters
        const numericText = text.replace(/\D/g, '');
        // Insert slashes at appropriate positions
        if (numericText.length > 2 && numericText.length <= 4) {
            return `${numericText.slice(0, 2)}/${numericText.slice(2)}`;
        } else if (numericText.length > 4) {
            return `${numericText.slice(0, 2)}/${numericText.slice(2, 4)}/${numericText.slice(4, 8)}`;
        } else {
            return numericText;
        }
    };

    return (
        <View style={styles.container}>

            {/* Header */}
            <View style={styles.header}>


                {/* logo image */}
                <Image source={require('./assets/myLogo.png')} style={styles.logo} />
            </View>

            {/* Body */}
            <View style={styles.body}>
                {/* Gradient */}
                <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
                    style={styles.gradient}
                />

                {/* Form */}
                <View style={styles.accordionButtonLogin}>
                    
                       
                    <Image
                source={require('./assets/group3.png')}
                style={styles.helpImg}
            />
            <Text>
                Get Help Screen
            </Text>

                </View>
            </View>
        </View>
    );
};

// Stylesheet
const styles = StyleSheet.create({
    header: {
        padding: 20,
        paddingTop: 50,
        justifyContent: 'center', // Center the logo vertically
        alignItems: 'flex-end', // Align the logo to the right
    },
    logo: {
        width: 250,
        height: 100,
    },
    helpImg: {
        width: '100%',
        height: '80%',
    },
    body: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    accordionLogin: {
        backgroundColor: '#ffffff',
        borderTopRightRadius: 100,
        overflow: 'hidden',
    },
    gradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '60%',
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
        position: 'absolute',
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    title: {
        fontSize: 18,
        fontFamily: 'Trebuchet MS',
        marginBottom: 20,
        color: '#FFFFFF',
        marginTop: 30,
    },
    accordionButtonLogin: {
        backgroundColor: '#fff',
        paddingTop: 30,
        width: '100%',
        borderTopRightRadius: 200,
        overflow: 'hidden',
    },
});

export default GetHelp;
