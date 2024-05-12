import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Loader from './Loader'; // Import the Loader component

const NewList = ({ navigation }) => {
    // State variables
    const [property, setProperty] = useState(null); // Stores property data
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch a random property when the component mounts
    useEffect(() => {
        fetchProperty();
    }, []);

    // Function to fetch a random property from the API
    const fetchProperty = async () => {
        try {
            const response = await fetch('https://ebuy-api.onrender.com/properties/random');
            const data = await response.json();
            setProperty(data);
            setLoading(false); // Set loading state to false after data is fetched
        } catch (error) {
            console.error('Error fetching property:', error);
            setLoading(false); // Set loading state to false if fetching fails
        }
    };

    // Function to handle pressing on a property item
    const handleItemPress = () => {
        // Navigate to the GetSeller screen
        navigation.navigate('GetSeller');
    };

    // Return the component structure
    return (
        <View style={styles.container}>
            {loading ? ( // Show Loader if data is still being fetched
                <Loader />
            ) : (
                // Render the property if available
                property && (
                    <TouchableOpacity style={styles.resultItem} onPress={handleItemPress}>
                        {/* Property thumbnail */}
                        <Image source={{ uri: property.thumbnail }} style={styles.thumbnail} />
                        {/* Property details */}
                        <View style={styles.details}>
                            <Text style={styles.property}>{property.type} with {property.amenities.join(', ')}</Text>
                            <Text style={styles.title}>{property.address}, {property.location}</Text>
                            <Text style={styles.type}>Closest Landmark: {property.closestLandmark}</Text>
                            <View style={styles.typePriceContainer}>
                                <Text style={styles.type}>Type: {property.type}</Text>
                                <Text style={styles.price}>Price: {property.price}</Text>
                            </View>
                        </View>
                        {/* Button to show seller */}
                        <TouchableOpacity style={styles.button} onPress={handleItemPress}>
                            <Text style={styles.buttonText}>Show Seller</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )
            )}
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    resultItem: {
        marginBottom: 10,
        borderRadius: 5,
        flex: 1,
    },
    thumbnail: {
        width: '100%',
        height: '70%',
        borderRadius: 5,
        marginRight: 10,
    },
    details: {
        margin: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    typePriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    type: {
        fontSize: 18,
    },
    price: {
        fontSize: 18,
        textAlign: 'right',
    },
    property: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    button: {
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
        backgroundColor: '#1B6DC0',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        color: '#fff',
    },
});

export default NewList;
