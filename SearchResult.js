import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, Image, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

const SearchResult = ({ route, navigation }) => {
    // State variables
    const { searchResults } = route.params; // Extracting searchResults from route params
    const [selectedItem, setSelectedItem] = useState(null); // Stores selected item for modal display
    const [modalVisible, setModalVisible] = useState(false); // Controls modal visibility

    // Function to handle navigation to the GetSeller screen
    const handleSeller = () => {
        // Close the modal
        closeModal();
        // Navigate to the GetSeller screen
        navigation.navigate('GetSeller');
    }
    
    // Function to handle pressing on a search result item
    const handleItemPress = (item) => {
        setSelectedItem(item);
        setModalVisible(true); // Show the modal
    };

    // Function to close the modal
    const closeModal = () => {
        setSelectedItem(null);
        setModalVisible(false); // Hide the modal
    };

    // Function to render each search result item in the FlatList
    const renderListItem = ({ item }) => (
        <TouchableOpacity style={styles.resultItem} onPress={() => handleItemPress(item)}>
            {/* Thumbnail */}
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            {/* Details */}
            <View style={styles.details}>
                <Text style={styles.title}>{item.address}, {item.location}</Text>
                <View style={styles.typePriceContainer}>
                    <Text style={styles.type}>Type: {item.type}</Text>
                    <Text style={styles.price}>Price: {item.price}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

       // Return the component structure
       return (
        <View style={styles.container}>
            {/* Option to go back */}
            <View style={styles.artistContainer}>
                {/* Go Back Button */}
                <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
                    <FontAwesome5 name="chevron-left" size={18} color="#000" />
                </TouchableOpacity>
                <Image source={require('./assets/logo.png')} style={styles.logos} />
            </View>
            {/* FlatList to display search results */}
            <FlatList
                data={searchResults}
                renderItem={renderListItem}
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
                        source={{ uri: selectedItem ? selectedItem.thumbnail : null }}
                        style={styles.modalThumbnail}
                    />
                    <View style={styles.modalContent}>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* Property details */}
                            <FontAwesome5 name="globe" size={20} color="#000" />
                            <Text style={styles.modalTitle}>
                                {selectedItem ? selectedItem.address : ''}, {selectedItem ? selectedItem.location : ''}
                            </Text>
                            <View style={styles.artistContainer}>
                                <Text style={styles.modalTexts}>
                                    <Text style={styles.modalTextsBold}>&#8226; Type: </Text>
                                    {selectedItem ? selectedItem.type : ''}
                                </Text>
                                <Text style={styles.modalTexts}>
                                    <Text style={styles.modalTextsBold}>&#8226; Price: </Text>
                                    {selectedItem ? selectedItem.price : ''}
                                </Text>
                            </View>
                            {/* Other property details */}
                            <Text style={styles.modalTexts}>
                                <Text style={styles.modalTextsBold}>&#8226; Description: </Text>
                                {selectedItem ? selectedItem.description : ''}
                            </Text>
                            <Text style={styles.modalTexts}>
                                <Text style={styles.modalTextsBold}>&#8226; Closest Landmark: </Text>
                                {selectedItem ? selectedItem.closestLandmark : ''}
                            </Text>
                            {/* Amenities */}
                            <Text style={styles.modalTexts}>
                                <Text style={styles.modalTextsBold}>&#8226; Amenities: </Text>
                                {selectedItem ? selectedItem.amenities.join(', ') : ''}
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingHorizontal: 20,
        paddingTop: 50,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    resultItem: {
        // backgroundColor: '#f0f0f0',
        padding: 20,
        marginBottom: 10,
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
        borderRadius: 5,
    },
    thumbnail: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        marginBottom: 10,
    },
    modalThumbnail: {
        width: '100%',
        height: '50%',
        borderRadius: 5,
        marginBottom: 10,
    },
    details: {},
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
        fontSize: 16,
        flex: 1,
    },
    price: {
        fontSize: 16,
        flex: 1,
        textAlign: 'right',
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
    goBackButton: {
        // paddingVertical: 15,
        paddingTop: 10,
        paddingLeft: 5,
        borderRadius: 5,
        alignSelf: 'flex-start',
    },
    artistContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        marginBottom: 20,
        width: '100%', // Adjust the width as needed
    },
    logos: {
        position: 'absolute',
        top: 5,
        right: 20,
        width: '30%',
        height: 50,
        resizeMode: 'contain',
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

export default SearchResult;
