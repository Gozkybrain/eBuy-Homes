// Import necessary modules from React and other libraries
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, ScrollView, ActivityIndicator, Modal } from 'react-native';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore'; // Import Firestore functions
import { getAuth, signOut } from 'firebase/auth'; // Import Firebase Auth functions
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker from Expo
import Loader from '../Loader'; // Assuming Loader component exists in the specified path
import ResetPassword from './ResetPassword'; // Assuming ResetPassword component exists in the specified path
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook from React Navigation

// Define the functional component GetUser with navigation prop
const GetUser = ({ navigation }) => {
    // State variables to manage user details, editing mode, and loading state
    const [userDetails, setUserDetails] = useState(null); // State to store user details
    const [editing, setEditing] = useState(false); // State to manage editing mode
    const [fullName, setFullName] = useState(''); // State to manage user's full name
    const [gender, setGender] = useState(''); // State to manage user's gender
    const [address, setAddress] = useState(''); // State to manage user's address
    const [profilePic, setProfilePic] = useState(null); // State to manage user's profile picture
    const [saving, setSaving] = useState(false); // State to manage saving/loading state
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility

    // Fetch user details from Firestore on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            const currentUser = getAuth().currentUser; // Get current authenticated user
            if (currentUser) {
                try {
                    // Fetch user document from Firestore based on the current user's ID
                    const userDoc = await getDoc(doc(getFirestore(), 'users', currentUser.uid));
                    if (userDoc.exists()) {
                        // Set user details in state if the document exists
                        setUserDetails(userDoc.data());
                        setFullName(userDoc.data().fullName); // Set full name in state
                    } else {
                        console.error('User document does not exist');
                    }
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails(); // Invoke the fetchUserDetails function on component mount
    }, []);

    // Function to enable editing mode
    const handleEdit = () => {
        setEditing(true);
    };

    // Function to save user details
    const handleSave = async () => {
        setSaving(true); // Set saving state to true when save is initiated

        try {
            const currentUser = getAuth().currentUser; // Get current authenticated user
            const userData = {}; // Object to hold updated user data

            // Update userData object based on changes made by the user
            if (fullName !== null && fullName !== undefined) {
                userData.fullName = fullName;
            }
            if (gender !== null && gender !== undefined) {
                userData.gender = gender;
            }
            if (profilePic) {
                userData.profilePic = profilePic;
            }
            if (address !== null && address !== undefined) {
                userData.address = address;
            }

            // Update user data in Firestore
            await updateDoc(doc(getFirestore(), 'users', currentUser.uid), userData);
            setUserDetails({ ...userDetails, fullName, gender, profilePic, address }); // Update user details in state
            setEditing(false); // Disable editing mode after save
        } catch (error) {
            console.error('Error updating user details:', error);
        } finally {
            setSaving(false); // Set saving state back to false after save operation completes
        }
    };

    // Function to handle profile picture selection
    const handleChooseProfilePic = async () => {
        try {
            const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (permissionResult.granted === false) {
                console.log('Permission to access camera roll is required!');
                return;
            }

            // Launch image picker to select profile picture
            const pickerResult = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!pickerResult.cancelled && pickerResult.uri) {
                console.log('Image selected:', pickerResult.uri);
                setProfilePic(pickerResult.uri); // Set selected profile picture URI in state
            } else {
                console.log('Profile picture selection cancelled');
            }
        } catch (error) {
            console.error('Error selecting profile picture:', error);
        }
    };

    // Function to handle user logout
    const handleLogout = () => {
        const auth = getAuth(); // Get the authentication instance

        signOut(auth)
            .then(() => {
                // Logout successful
                console.log('User logged out successfully');
                // Navigate to the home screen
                navigation.navigate('GetAuth'); // Replace 'GetAuth' with the name of your home screen component
            })
            .catch((error) => {
                // An error occurred during logout
                console.error('Error logging out:', error.message);
            });
    };

    // Function to handle password change
    const handleChangePassword = () => {
        // Set modal visibility to true to display the password reset modal
        setModalVisible(true);
    };

    // Function to close the password reset modal
    const closeModal = () => {
        setModalVisible(false); // Set modal visibility to false
    };

    return (
        <>
            {/* Conditional rendering based on user details availability */}
            {userDetails ? (
                <ScrollView>
                    <View style={styles.container}>
                        {/* User profile section */}
                        <View style={styles.profileContainer}>
                            {/* Profile picture section */}
                            <View style={styles.buttonGroup}>
                                <TouchableOpacity onPress={handleChooseProfilePic}>
                                    <Image
                                        source={{ uri: profilePic || userDetails.profilePic }}
                                        defaultSource={require('../assets/user-dp.jpg')}
                                        style={styles.profilePic}
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* User information section */}
                            <View style={styles.buttonContainer}>
                                <Text style={styles.headInfo}>@{userDetails.username}</Text>
                                <Text style={styles.fullName}>{userDetails.email}</Text>
                                {/* Button group for actions */}
                                <View style={styles.buttonGroup}>
                                    {/* Button to reset password */}
                                    <TouchableOpacity onPress={handleChangePassword} style={styles.authButton}>
                                        <Text style={styles.buttonText}>Reset Password</Text>
                                    </TouchableOpacity>
                                    {/* Button to logout */}
                                    <TouchableOpacity title="Logout" style={styles.buttonGroup1} onPress={() => handleLogout(navigation)}>
                                        <Text style={styles.buttonText}>Logout</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* Modal for password reset */}
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={closeModal}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.modalContent}>
                                    <ResetPassword />
                                    <View style={styles.buttonContainer}>
                                        {/* Close button for the modal */}
                                        <TouchableOpacity style={styles.saveButton} onPress={closeModal}>
                                            <Text style={styles.buttonText}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        {/* User profile details */}
                        <View style={styles.profile}>
                            {/* Conditionally render input fields or text based on editing mode */}
                            {editing ? (
                                <TextInput
                                    value={fullName}
                                    onChangeText={setFullName}
                                    style={styles.input}
                                    placeholder="Full Name"
                                />
                            ) : (
                                <View style={styles.profileText}>
                                    <Text style={styles.fullName}>Full Name: {userDetails.fullName}</Text>
                                </View>
                            )}
                            {/* Conditionally render input fields or text based on editing mode */}
                            {editing ? (
                                <TextInput
                                    value={address}
                                    onChangeText={setAddress}
                                    style={styles.input}
                                    placeholder="Contact Address"
                                />
                            ) : (
                                <View style={styles.profileText}>
                                    <Text style={styles.fullName}>My Address: {userDetails.address}</Text>
                                </View>
                            )}

                            {/* Conditionally render gender selection buttons based on editing mode */}
                            {editing ? (
                                <View style={styles.genderContainer}>
                                    <TouchableOpacity
                                        style={[styles.genderOption, gender === 'male' && styles.selectedOption]}
                                        onPress={() => setGender('male')}
                                    >
                                        <Text style={styles.genderText}>Male</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={[styles.genderOption, gender === 'female' && styles.selectedOption]}
                                        onPress={() => setGender('female')}
                                    >
                                        <Text style={styles.genderText}>Female</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <View style={styles.profileText}>
                                    <Text style={styles.fullName}>Gender: {userDetails.gender}</Text>
                                </View>
                            )}
                        </View>

                        {/* Button group for Save/Edit functionality */}
                        <View style={styles.buttonGroup}>
                            {/* Display Save or Edit button based on editing mode */}
                            {editing ? (
                                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                    {saving ? ( // Display ActivityIndicator if saving is true
                                        <ActivityIndicator color="#fff" />
                                    ) : (
                                        <Text style={styles.buttonText}>Save</Text>
                                    )}
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={styles.saveButton} onPress={handleEdit}>
                                    <Text style={styles.buttonText}>Edit</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>
                </ScrollView>
            ) : (
                <Loader /> // Display loader while user details are being fetched
            )}
        </>
    );
};

// Styles for various components and elements used in the component

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    profileContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
        paddingTop: '30%',
        backgroundColor: '#fff',
    },
    profilePic: {
        width: 250,
        height: 250,
        borderRadius: 50,
        // marginRight: 20,
    },
    headInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    fullName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profile: {
        paddingHorizontal: 20,
        marginVertical: 20,
    },
    profileText: {
        paddingVertical: 15,
        borderBottomColor: '#aaa',
        borderBottomWidth: 1,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 4,
    },
    genderContainer: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    genderOption: {
        backgroundColor: 'orange',
        padding: 10,
        minWidth: '40%',
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
    buttonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    buttonGroup1: {
        width: '30%',
        height: 40,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
    },
    authButton: {
        width: '40%',
        height: 40,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
    },
    saveButton: {
        width: '40%',
        height: 30,
        paddingVertical: 6,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3498db',
        borderRadius: 20,
        marginHorizontal: 10,
        marginTop: 10,
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
});

export default GetUser;
