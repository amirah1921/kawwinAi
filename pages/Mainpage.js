import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Background from '../components/Background';

const MainPage = () => {
  const navigation = useNavigation();

  const [isBurgerMenuVisible, setIsBurgerMenuVisible] = useState(false);

  // Define the data for your boxes (10 entries)
  const boxesData = [
    {
      id: 1,
      emoji: '😀',
      title: 'Photography',
      description: 'Document the celebration through candid photos and formal pictures',
    },
    {
      id: 2,
      emoji: '😃',
      title: 'Caterers',
      description: 'Provide food and drink for a wedding reception',
    },
    {
      id: 3,
      emoji: '😄',
      title: 'Rehearsal',
      description: 'Where the couple and the most important individuals in their ceremony do a dry run of the actual wedding day',
    },
    {
      id: 4,
      emoji: '🙂',
      title: 'Wedding Favors',
      description: 'Serve as a thank-you token to your guests and provide a tangible memory of your celebration',
    },
    {
      id: 5,
      emoji: '😎',
      title: 'Reception',
      description: 'A party usually held after the completion of a marriage ceremony as hospitality for those who have attended the wedding',
    },
    {
      id: 6,
      emoji: '🥰',
      title: 'Engagement Party',
      description: 'A party to celebrate the engaged couple and their upcoming wedding.',
    },
    {
      id: 7,
      emoji: '😊',
      title: 'Registry',
      description: 'To help ensure you cover the must-haves, fun-to-haves, and everything between7',
    },
    {
      id: 8,
      emoji: '🙃',
      title: 'Honeymoon',
      description: 'A holiday spent together by a newly married couple following their wedding day',
    },
    {
      id: 9,
      emoji: '😇',
      title: 'Music',
      description: 'It sets the tone of your special day',
    },
    {
      id: 10,
      emoji: '😍',
      title: 'Fashion',
      description: 'Signifies the end of singlehood to a new commitment and partnership',
    },
  ];
const handleBoxPress = (boxData) => {
    navigation.navigate('VendorList', { category: boxData.title });
  };

  const toggleBurgerMenu = () => {
    setIsBurgerMenuVisible(!isBurgerMenuVisible);
  };

  const { width } = Dimensions.get('window');
  const boxWidth = (width - 40) / 2;

  return (
    <Background>
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleBurgerMenu} style={styles.burgerButton}>
        <Text style={styles.burgerButtonText}>☰</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Image
          source={require('../assets/Robot.png')}
          style={styles.characterImage}
        />
        <Text style={styles.title}>Welcome to My App</Text>

        <ScrollView contentContainerStyle={styles.boxContainer}>
          {boxesData.map((box) => (
            <TouchableOpacity
              key={box.id}
              style={styles.box}
              onPress={() => handleBoxPress(box)}
            >
              <View style={[styles.boxContent, { backgroundColor: box.color, width: boxWidth }]}>
                <Text style={styles.boxEmoji}>{box.emoji}</Text>
                <Text style={styles.boxTitle}>{box.title}</Text>
                <Text style={styles.boxDescription}>{box.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <Modal
        visible={isBurgerMenuVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleBurgerMenu}
      >
        <View style={styles.burgerMenuContainer}>
          <TouchableOpacity
            style={styles.burgerMenuItem}
            onPress={() => {
              // Handle Profile logic
              toggleBurgerMenu();
            }}
          >
            <Text>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.burgerMenuItem}
            onPress={() => {
              // Handle Chat logic
              toggleBurgerMenu();
            }}
          >
            <Text>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.burgerMenuItem}
            onPress={() => {
              // Handle To-Do List logic
              toggleBurgerMenu();
            }}
          >
            <Text>To-Do List</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
     </Background>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    flex: 1,
    // backgroundColor: '#fff',
  },
  content: {
    marginTop: 60,
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 25, // Set the font size to 20
    fontWeight: 'bold',
    marginBottom: 20,
  },
  characterImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  boxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  box: {
    marginBottom: 20,
    borderColor: 'black',
    backgroundColor: '#E1E5EC',
    borderRadius: 8,
  },
  boxContent: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
  },
  boxEmoji: {
    fontSize: 30, // Font size for the emoji
  },
  boxTitle: {
    fontSize: 16, // Font size for the title
    fontWeight: 'bold',
    marginBottom: 5,
  },
  boxDescription: {
    fontSize: 14, // Font size for the description
    textAlign: 'left',
  },
  // Styles for burger button
  burgerButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 20,
    zIndex: 1, // Ensure it's above other content
  },
  burgerButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
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
    padding: 20,
    marginVertical: 5,
    width: 200,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default MainPage;