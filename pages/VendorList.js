import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  TextInput,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; 

// Sample data for products
const products = [
  { id: 1, name: 'Dry Food 1', category: 'Photography', image: require('../assets/Kawwin.png')},
  { id: 2, name: 'Dry Food 2', category: 'Registry' },
  { id: 3, name: 'Wet Food 1', category: 'Caterers' },
  { id: 4, name: 'Wet Food 2', category: 'Engagement Party' },
  { id: 5, name: 'Can Beverage 1', category: 'Rehearsal' },
  { id: 6, name: 'Bottle Beverage 1', category: 'Fashion' },
  { id: 7, name: 'Powder Beverage 1', category: 'Music' },
];

const categories = [
  'All',
  'Photography',
  'Caterers',
  'Rehearsal',
  'Wedding favors',
  'Reception',
  'Engagement Party',
  'Registry',
  'Honeymoon',
  'Music',
  'Fashion',
];

const locations = [
  'All',
  'Johor',
  'Kedah',
  'Kelantan',
  'Malacca',
  'Negeri Sembilan',
  'Pahang',
  'Penang',
  'Perak',
  'Perlis',
  'Sabah',
  'Sarawak',
  'Selangor',
  'Terengganu',
];

const prices = ['All', 'Lowest', 'Highest', 'Reasonable'];

const VendorList = ({ navigation, route }) => {
  const { category } = route.params;

  // Define the data for your boxes (10 entries)
  const boxesData = [
    {
      id: 1,
      color: 'red',
      emoji: '😀',
      title: 'Photography',
      description: 'Document the celebration through candid photos and formal pictures',
    },
    {
      id: 2,
      color: 'green',
      emoji: '😃',
      title: 'Caterers',
      description: 'Provide food and drink for a wedding reception',
    },
    {
      id: 3,
      color: 'blue',
      emoji: '😄',
      title: 'Rehearsal',
      description: 'Where the couple and the most important individuals in their ceremony do a dry run of the actual wedding day',
    },
    {
      id: 4,
      color: 'orange',
      emoji: '🙂',
      title: 'Wedding Favors',
      description: 'Serve as a thank-you token to your guests and provide a tangible memory of your celebration',
    },
    {
      id: 5,
      color: 'purple',
      emoji: '😎',
      title: 'Reception',
      description: 'A party usually held after the completion of a marriage ceremony as hospitality for those who have attended the wedding',
    },
    {
      id: 6,
      color: 'pink',
      emoji: '🥰',
      title: 'Engagement Party',
      description: 'A party to celebrate the engaged couple and their upcoming wedding.',
    },
    {
      id: 7,
      color: 'brown',
      emoji: '😊',
      title: 'Registry',
      description: 'To help ensure you cover the must-haves, fun-to-haves, and everything between7',
    },
    {
      id: 8,
      color: 'gray',
      emoji: '🙃',
      title: 'Honeymoon',
      description: 'A holiday spent together by a newly married couple following their wedding day',
    },
    {
      id: 9,
      color: 'cyan',
      emoji: '😇',
      title: 'Music',
      description: 'It sets the tone of your special day',
    },
    {
      id: 10,
      color: 'magenta',
      emoji: '😍',
      title: 'Fashion',
      description: 'Signifies the end of singlehood to a new commitment and partnership',
    },
  ];

  // Filter products based on the selected category
  const filteredProducts = products.filter((product) => product.category === category);
  const [selectedFilters, setSelectedFilters] = useState([]); // Store selected filters
  const [isFilterVisible, setIsFilterVisible] = useState(false); // State to control the filter popup visibility
  const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false); // State to control the burger menu visibility
  const [searchText, setSearchText] = useState(''); // State to store search text

  const uniqueCategories = [...new Set(boxesData.map((box) => box.category))];

  const toggleFilterModal = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const toggleBurgerMenu = () => {
    setIsBurgerMenuVisible(!isBurgerMenuVisible);
  };

  const applyFilter = (filter) => {
    // Check if the filter is already selected, and toggle its selection
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter((item) => item !== filter));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };
  const renderProductCard = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <View>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productCategory}>{item.category}</Text>
      </View>
      <Text>Add</Text>
    </TouchableOpacity>
  );

  const filterProductsByAlphabet = () => {
    return searchText === ''
      ? products // Return all products if the search text is empty
      : products.filter((product) =>
          product.name.toLowerCase().startsWith(searchText.toLowerCase())
        ); // Filter products by matching the search text with the product names
  };

  const renderFilterColumn = (filterType, filterArray) => (
    <View style={styles.columnContainer}>
      <View style={styles.column}>
        <Text style={styles.filterLabel}>{filterType}:</Text>
        {filterArray.slice(0, Math.ceil(filterArray.length / 2)).map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => applyFilter(filter)}
            style={[
              styles.filter,
              selectedFilters.includes(filter) && styles.selectedFilter,
            ]}
          >
            <Text>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.column}>
        {filterArray.slice(Math.ceil(filterArray.length / 2)).map((filter) => (
          <TouchableOpacity
            key={filter}
            onPress={() => applyFilter(filter)}
            style={[
              styles.filter,
              selectedFilters.includes(filter) && styles.selectedFilter,
            ]}
          >
            <Text>{filter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBurgerMenu = () => (
    <Modal
      visible={isBurgerMenuVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.burgerMenuContainer}>
        <TouchableOpacity
          style={styles.burgerMenuItem}
          onPress={() => {
            setIsBurgerMenuVisible(false);
            navigation.navigate('MainPage');
          }}
        >
          <Text>Profile</Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={styles.burgerMenuItem}
          onPress={() => {
            setIsBurgerMenuVisible(false);
          }}
        >
          <Text>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.burgerMenuItem}
          onPress={() => {
            // Handle Registration logic
            setIsBurgerMenuVisible(false);
          }}
        >
          <Text>Register</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search by name..."
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
        />
        <TouchableOpacity onPress={toggleBurgerMenu}>
          <Text style={styles.burgerMenuButton}>☰</Text>
        </TouchableOpacity>
 </View>
      <TouchableOpacity onPress={toggleFilterModal}>
        <Text style={styles.filterButton}>🔍</Text>
      </TouchableOpacity>

      {renderBurgerMenu()}

      <Modal visible={isFilterVisible} animationType="slide">
        <View style={styles.filterContainer}>
          <ScrollView>
            {/* Category Filter */}
            {renderFilterColumn('Category', categories)}

            {/* Divider Line */}
            <View style={styles.divider}></View>

            {/* Location Filter */}
            {renderFilterColumn('Location', locations)}

            {/* Divider Line */}
            <View style={styles.divider}></View>

            {/* Price Filter */}
            {renderFilterColumn('Price', prices)}
          </ScrollView>

          <Button title="Pick Filter" onPress={toggleFilterModal} />
        </View>
      </Modal>

      <FlatList
        data={filteredProducts} // Use filtered products here
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    flex: 1,
    padding: 15,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 0.5,
  },
  searchBar: {
    flex: 1,
    height: 30,
    borderColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 12,
  },
  burgerMenuButton: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 0.2,
  },
  filterButton: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
  },
  filterContainer: {
    marginTop: 40,
    flex: 1,
    padding: 20,
  },
  columnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  filter: {
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 0, // Remove border
  },
  selectedFilter: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    backgroundColor: 'lightblue',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    marginBottom: 16,
  },
  // Styles for burger menu
  burgerMenuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  burgerMenuItem: {
    backgroundColor: 'white',
    padding: 10,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
    borderRadius: 5,
  },
  productCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    borderWidth: 0, // Remove border
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productCategory: {
    fontSize: 16,
  },
});

export default VendorList;