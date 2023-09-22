import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen = ({ route }) => {
  const { product } = route.params;
  const navigation = useNavigation();

  const handleBackToVendor = () => {
    // Navigate back to the Vendor screen
    navigation.goBack();
  };

  return (
    <ImageBackground source={product.image} style={styles.containerImage}>
      <View style={styles.containerCard}>
        <View style={styles.card}>
          <Text style={styles.header}>Product Details</Text>
          <Text style={styles.name}>Name: {product.name}</Text>
          <Text style={styles.category}>Category: {product.category}</Text>
          {/* Add more product details here */}
          
          {/* Close Button */}
          <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsButton} onPress={handleBackToVendor}>
            <Text style={styles.buttonText}>Back to Vendor</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  containerImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  containerCard: {
    flex: 1,
    padding: 16,
    marginTop: 500,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
  },
  category: {
    fontSize: 16,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    width: '48%', // Adjust button width as needed
  },
  detailsButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    padding: 10,
    borderRadius: 5,
    width: '48%', // Adjust button width as needed
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default ProductDetailScreen;
