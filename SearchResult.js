import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const SearchResult = ({ route }) => {
  const { searchResults } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Search Results</Text>
      <FlatList
        data={searchResults}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultText}>{item.type}</Text>
            <Text style={styles.resultText}>Price: {item.price}</Text>
            {/* Add more details here based on your data structure */}
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultItem: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  resultText: {
    fontSize: 16,
  },
});

export default SearchResult;
