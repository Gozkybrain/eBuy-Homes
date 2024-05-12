import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const DefaultHome = ({ navigation }) => {
  // State variables
  const [selectedType, setSelectedType] = useState(''); // Stores the selected property type
  const [selectedLocation, setSelectedLocation] = useState(''); // Stores the selected location
  const [searchResults, setSearchResults] = useState([]); // Stores the search results
  const [loading, setLoading] = useState(false); // Tracks loading status during search

  // Function to handle search
  const handleSearch = () => {
    // Construct the query based on selected type and location
    let constructedQuery = '';
    if (selectedType && selectedLocation) {
      constructedQuery = `${selectedType}/${selectedLocation}`;
    } else {
      if (selectedType) {
        constructedQuery = `type/${selectedType}/`;
      }
      if (selectedLocation) {
        constructedQuery = `location/${selectedLocation}/`;
      }
    }

    // Validate if type or location is selected
    if (!selectedType && !selectedLocation) {
      Alert.alert('Error', 'Please select a property type or location.');
      return;
    }

    // Set loading to true when search begins
    setLoading(true);

    // Fetch search results from API
    const endpoint = `https://ebuy-api.onrender.com/properties/${constructedQuery}`;
    fetch(endpoint)
      .then(response => response.json())
      .then(data => {
        setSearchResults(data);
        navigation.navigate('SearchResult', { searchResults: data });
      })
      .catch(error => console.error('Error fetching search results:', error))
      .finally(() => setLoading(false)); // Set loading to false when search completes
  };

  // Return the component structure
  return (
    <View style={styles.container}>
      {/* Background image */}
      <Image source={require('./assets/girl.png')} style={styles.backgroundImage} />
      <View style={styles.overlay}></View>
      {/* App logo */}
      <Image source={require('./assets/logo.png')} style={styles.logos} />
      <View style={styles.body}>
        {/* Search container */}
        <View style={styles.searchContainer}>
          {/* Dropdown for selecting property type */}
          <SelectDropdown
            data={['', 'Duplex', 'Apartment', 'Ranch', 'Beachfront', 'Mansion', 'Estate']}
            onSelect={(selectedItem, index) => {
              setSelectedType(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => (
              <TouchableOpacity style={styles.input}>
                <Text style={styles.dropdownButtonText}>
                  {selectedItem || 'Search by type'}
                </Text>
              </TouchableOpacity>
            )}
            renderItem={(item, index, isSelected) => (
              <TouchableOpacity
                style={[styles.dropdownItem, isSelected && styles.selectedItem]}
                onPress={() => { }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenu}
          />
          {/* Dropdown for selecting location */}
          <SelectDropdown
            data={['', 'Texas', 'Oklahoma', 'West Virginia', 'Florida', 'Chicago']}
            onSelect={(selectedItem, index) => {
              setSelectedLocation(selectedItem);
            }}
            renderButton={(selectedItem, isOpened) => (
              <TouchableOpacity style={styles.input}>
                <Text style={styles.dropdownButtonText}>
                  {selectedItem || 'Select Location (Optional)'}
                </Text>
              </TouchableOpacity>
            )}
            renderItem={(item, index, isSelected) => (
              <TouchableOpacity
                style={[styles.dropdownItem, isSelected && styles.selectedItem]}
                onPress={() => { }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenu}
          />
          {/* Search button */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
            {/* Display loading indicator if search is in progress */}
            {loading ? (
              <ActivityIndicator size="small" color="#ffffff" />
            ) : (
              <Text style={styles.searchText}>Search</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  logos: {
    position: 'absolute',
    top: 30,
    right: 20,
    width: 100,
    height: 80,
    resizeMode: 'contain',
  },
  searchContainer: {
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
    width: '100%',
    paddingTop: 40,
    borderTopRightRadius: 200,
    backgroundColor: '#ffffff',
    paddingVertical: 30,
    paddingHorizontal: 30,
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
    width: '90%',
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  selectedItem: {
    backgroundColor: '#D2D9DF',
  },
  dropdownItemText: {
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: '#1B6DC0',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 10,
    width: '90%',
  },
  searchText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DefaultHome;
