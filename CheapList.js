import React, { useState, useEffect } from 'react';
import { View, Modal, Text, Image, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Loader from './Loader'; // Import the Loader component

const CheapList = ({ navigation }) => {
    // State variables
    const [properties, setProperties] = useState([]); // Stores property data
    const [selectedProperty, setSelectedProperty] = useState(null); // Stores selected property for modal display
    const [loading, setLoading] = useState(true); // Loading state
    const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility

    // Fetch properties from the API when component mounts
    useEffect(() => {
        fetchProperties();
    }, []);

    // Function to fetch properties from the API
    const fetchProperties = async () => {
        try {
            // Fetch data from the API endpoint for properties below 500k
            const response = await fetch('https://ebuy-api.onrender.com/properties/price-below-500k');
            // Parse the response as JSON
            const data = await response.json();
            // Update the state with the fetched properties
            setProperties(data);
            setLoading(false); // Set loading state to false after data is fetched
        } catch (error) {
            // Handle errors if any occur during fetching
            console.error('Error fetching properties:', error);
            setLoading(false); // Set loading state to false if fetching fails
        }
    };

    // Function to handle pressing on a property item
    const handleItemPress = (property) => {
        // Set the selected property for modal display
        setSelectedProperty(property);
        // Set the modal visibility to true to show the modal
        setModalVisible(true);
    };

    // Function to close the modal
    const closeModal = () => {
        // Reset the selected property
        setSelectedProperty(null);
        // Set the modal visibility to false to close the modal
        setModalVisible(false);
    };

    // Function to handle pressing on the "Show Seller" button
    const handleSeller = () => {
        // Close the modal
        closeModal();
        // Navigate to the GetSeller screen using navigation prop
        navigation.navigate('GetSeller');
    }

    // Function to render each property item in the FlatList
    const renderPropertyItem = ({ item }) => (
        <TouchableOpacity style={styles.propertyItem} onPress={() => handleItemPress(item)}>
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <View style={styles.propertyDetails}>
                <Text style={styles.title}>{item.address}, {item.location}</Text>
                {/* Type of the property (e.g., apartment) */}
                <Text>Type: {item.type}</Text>
                {/* Price of the property */}
                <Text>Price: {item.price}</Text>
            </View>
        </TouchableOpacity>
    );

    // Return the component structure
    return (
       <>
         {loading ? ( // Show Loader if data is still being fetched
                    <Loader />
                ) : (
                    // Render the FlatList and Modal once data is fetched
        <View style={styles.container}>
            <Image source={require('./assets/logo.png')} style={styles.logos} />
            <View style={styles.contain}>
              
                    <>
                        <FlatList
                            data={properties}
                            renderItem={renderPropertyItem}
                            keyExtractor={(item) => item.id.toString()}
                        />
                        {/* Modal */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal}
                        >
                            {/* Modal content */}
                            <View style={styles.modalContainer}>
                                <Image
                                    source={{ uri: selectedProperty ? selectedProperty.thumbnail : null }}
                                    style={styles.modalThumbnail}
                                />
                                <View style={styles.modalContent}>
                                    <ScrollView showsVerticalScrollIndicator={false}>
                                        {/* Property details */}
                                        <FontAwesome5 name="globe" size={20} color="#000" />
                                        <Text style={styles.modalTitle}>
                                            {selectedProperty ? selectedProperty.address : ''}, {selectedProperty ? selectedProperty.location : ''}
                                        </Text>
                                        <View style={styles.artistContainer}>
                                            <Text style={styles.modalTexts}>
                                                <Text style={styles.modalTextsBold}>&#8226; Type: </Text>
                                                {selectedProperty ? selectedProperty.type : ''}
                                            </Text>
                                            <Text style={styles.modalTexts}>
                                                <Text style={styles.modalTextsBold}>&#8226; Price: </Text>
                                                {selectedProperty ? selectedProperty.price : ''}
                                            </Text>
                                        </View>
                                        {/* Other property details */}
                                        <Text style={styles.modalTexts}>
                                            <Text style={styles.modalTextsBold}>&#8226; Description: </Text>
                                            {selectedProperty ? selectedProperty.description : ''}
                                        </Text>
                                        <Text style={styles.modalTexts}>
                                            <Text style={styles.modalTextsBold}>&#8226; Closest Landmark: </Text>
                                            {selectedProperty ? selectedProperty.closestLandmark : ''}
                                        </Text>
                                        <Text style={styles.modalTexts}>
                                            <Text style={styles.modalTextsBold}>&#8226; Amenities: </Text>
                                            {selectedProperty ? selectedProperty.amenities.join(', ') : ''}
                                        </Text>
                                        {/* Buttons */}
                                        <View style={styles.buttonContainer}>
                                            {/* Button to show seller */}
                                            <TouchableOpacity style={[styles.button, styles.sellerButton]} onPress={handleSeller}>
                                                <Text style={[styles.buttonText, styles.showSellerButtonText]}>Show Seller</Text>
                                            </TouchableOpacity>
                                            {/* Close button */}
                                            <TouchableOpacity style={[styles.button, styles.closeButton]} onPress={closeModal}>
                                                <Text style={[styles.buttonText, styles.closeButtonText]}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </ScrollView>
                                </View>
                            </View>
                        </Modal>
                    </>
               
            </View>
        </View>
         )}
       </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 20,
        paddingTop: 100,
    },
    propertyItem: {
        flexDirection: 'row',
        marginBottom: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    thumbnail: {
        width: 100,
        height: 100,
        borderRadius: 5,
        marginRight: 20,
    },
    propertyDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    modalContent: {
        backgroundColor: '#fff',
        flex: 1,
        padding: 20,
        borderRadius: 10,
        width: '100%',
    },
    modalThumbnail: {
        width: '100%',
        height: '50%',
        borderRadius: 5,
        marginBottom: 10,
    },
    logos: {
        position: 'absolute',
        top: 30,
        right: 20,
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    typePriceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    type: {
        fontSize: 16,
        flex: 1,
    },
    price: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    button: {
        flex: 1,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginHorizontal: 5,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
    sellerButton: {
        backgroundColor: '#1B6DC0',
    },
    showSellerButtonText: {
        color: '#fff',
    },
    closeButton: {
        backgroundColor: '#ccc',
    },
    closeButtonText: {
        color: '#000',
    },
    artistContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
        width: '100%', // Adjust the width as needed
    },
    modalTexts: {
        fontSize: 16,
        // fontWeight: 'bold',
        marginBottom: 15,
    },
    modalTextsBold: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
});

export default CheapList;
