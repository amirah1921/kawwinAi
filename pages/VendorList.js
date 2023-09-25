import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const promotionData = [
  {
    id: 1,
    name: 'FotokahwinXpress',
    company: 'End Year Promotion',
    discount: '30% off',
    imagePath: require('../assets/imgs/vendor1.png'), // Replace with the actual image path
  },
  {
    id: 2,
    name: 'Kursus Kahwin',
    company: 'OCT-DEC Sessions',
    discount: '20% off',
    imagePath: require('../assets/imgs/vendor2.png'), // Replace with the actual image path
  },
];

const vendorData = [
  {
    id: '1',
    vendorName: 'Mak Jemah Food & Catering',
    place: 'Kuala Lumpur',
    image: require('../assets/imgs/vendor3.png'), // Replace with the actual image path
  },
  {
    id: '2',
    vendorName: 'Nana Bridal',
    place: 'Kuala Lumpur',
    image: require('../assets/imgs/vendor4.png'), // Replace with the actual image path
  },
  {
    id: '3',
    vendorName: 'The Cakescape',
    place: 'Kuala Lumpur',
    image: require('../assets/imgs/vendor5.png'), // Replace with the actual image path
  },
];

const VendorList = ({navigation, route}) => {
  const [searchTxt, onChangeText] = useState('');
  const [activeButton, setActiveButton] = useState('Trending');
  const [isHidden, setIsHidden] = useState(false);
  const [slideAnimation] = useState(new Animated.Value(0));
  const screenWidth = Dimensions.get('window').width; // Get the screen width

  const renderCategoryItem = ({item}) => (
    <TouchableOpacity style={styles.categoryBubble}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderVendorItem = ({item}) => (
    <View style={styles.vendorItem}>
    <Image source={item.image} style={styles.vendorImage} />
    <View style={styles.vendorDetails}>
    <Text style={styles.vendorName}>{item.vendorName}</Text>
    <Text style={styles.vendorPlace}>{item.place}</Text>
    </View>

  </View>
  );
  const renderPromotionCards = () => {
    if (activeButton === 'Trending') {
      const slideFromLeft = slideAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -screenWidth * promotionData.length],
      });

      return (
        <View style={styles.promotionWrapper}>
          <Text style={styles.titleText}>Promotions</Text>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={styles.promotionContainer}
            contentContainerStyle={{width: screenWidth * promotionData.length}}>
            <Animated.View
              style={[
                styles.promotionRow,
                {transform: [{translateX: slideFromLeft}]},
              ]}>
              {promotionData.map(item => (
                <View style={styles.promotionCard} key={item.id}>
                  <Image
                    source={item.imagePath} // Use the imagePath property from the promotion object
                    style={styles.promotionImage}
                  />

                  <Text style={styles.promotionName}>{item.name}</Text>
                  <Text style={styles.promotionCompany}>{item.company}</Text>
                  <Text style={styles.promotionDiscount}>{item.discount}</Text>
                </View>
              ))}
            </Animated.View>
          </ScrollView>
        </View>
      );
    } else {
      return null; // Return null to hide the promotion cards for other tabs
    }
  };

  // useEffect(() => {
  //   if (activeButton === 'Trending') {
  //     slideAnimation.setValue(0);
  //   } else {
  //     slideAnimation.setValue(0);
  //   }
  // }, [activeButton]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.searchbarContainer}>
          <Icon
            name="search"
            size={30}
            color="#000000"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchBar}
            placeholder="Search"
            onChangeText={onChangeText}
            value={searchTxt}
          />
        </View>
        <View style={styles.navBarPosition}>
          <TouchableOpacity
            style={[
              styles.containerNavBar,
              activeButton === 'Trending' && styles.activeButton,
            ]}
            onPress={() => {
              setActiveButton('Trending');
              // toggleVisibility();
            }}>
            <Text
              style={[
                styles.textNavbar,
                activeButton === 'Trending' && styles.activeText,
              ]}>
              Trending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerNavBar,
              activeButton === 'Near Me' && styles.activeButton,
            ]}
            onPress={() => setActiveButton('Near Me')}>
            <Text
              style={[
                styles.textNavbar,
                activeButton === 'Near Me' && styles.activeText,
              ]}>
              Near Me
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.containerNavBar,
              activeButton === 'Popular' && styles.activeButton,
            ]}
            onPress={() => setActiveButton('Popular')}>
            <Text
              style={[
                styles.textNavbar,
                activeButton === 'Popular' && styles.activeText,
              ]}>
              Popular
            </Text>
          </TouchableOpacity>
        </View>

        {renderPromotionCards()}
        {activeButton === 'Trending' && (
          <View style={styles.vendoWrapper}>
            <Text style={styles.titleText}>Vendors</Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
            <FlatList
              data={vendorData}
              keyExtractor={item => item.id.toString()}
              renderItem={renderVendorItem}
              style={styles.vendorList}
              initialNumToRender={3} // Limit the initial rendering to 3 items
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#171826'},
  searchbarContainer: {
    margin: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    fontSize: 16,
  },
  categoryContainer: {
    paddingHorizontal: 10,
    paddingBottom: 70, // Adjust this value as needed to make space for the navigation bar
  },
  categoryBubble: {
    backgroundColor: '#53578B',
    borderRadius: 20,
    padding: 8,
    margin: 5,
  },
  categoryText: {
    color: 'white',
    fontSize: 16,
  },
  navBarPosition: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  containerNavBar: {
    flex: 1,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  textNavbar: {
    fontSize: 16,
    color: '#505487',
    padding: 15,
  },
  activeButton: {
    borderBottomColor: 'white',
  },
  activeText: {
    color: 'white',
  },
  promotionWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    //paddingBottom: 5, // Add padding to create space between "Promotions" and the cards
  },
  promotionImage: {
    height: 100,
  },
  titleText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  viewAllButton: {
    marginBottom: 10,
    alignSelf: 'flex-end',
    // marginTop: 10, // Adjust as needed
  },
  viewAllText: {
    fontSize: 16,
    color: 'white',
  },
  promotionRow: {
    flexDirection: 'row',
    width: '100%',
  },
  promotionContainer: {
    flex: 1,
    paddingHorizontal: 2,
  },
  promotionCard: {
    height: 175,
    width: Dimensions.get('window').width - 60,
    // backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 8,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  promotionName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  promotionCompany: {
    fontSize: 16,
    color: 'white',
  },
  promotionDiscount: {
    fontSize: 16,
    color: 'yellow',
  },
  vendoWrapper: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  vendorCard: {
    height: 60,
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vendorItem: {
    width: "100%",
    marginRight: 10, // Add spacing between vendor items
    flexDirection: 'row', // Arrange image and info in a row
    alignItems: 'center', // Vertically center items in the row
    alignSelf: "flex-start",
    padding: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: "white"
  },
  vendorImage: {
    width: 120,
    height: 80,
    resizeMode: "cover",
    borderRadius: 8,
    
  },
  vendorDetails: {
    marginLeft: 20,
    flexDirection: "column",
    alignItems: "center"
  },
  vendorInfo: {
    marginLeft: 10, // Add spacing between image and info
  },
  vendorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    flexWrap: 'wrap',         // Allow text to wrap to the next line
    width: 180,              // Set a maximum width for the text container
    textAlign: 'center',     // Center-align the text
  },
  
  vendorPlace: {
    fontSize: 14,
    color: '#59E45E',
  },
});

export default VendorList;
