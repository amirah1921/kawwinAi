import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';

const data = [
  { id: '1', text: 'The Event', countdownDate: '2023-12-12T10:00:00',  },
  { id: '2', text: 'Total Spend', screen: 'Screen2' },
  { id: '3', text: 'Total Budget', screen: 'Screen3' },
  { id: '4', text: 'Item 4', screen: 'Screen4' },
  { id: '5', text: 'Item 5', screen: 'Screen5' },
  { id: '6', text: 'Item 6', screen: 'Sc`een6' },
  { id: '7', text: 'Item 7', screen: 'Screen7' },
  { id: '8', text: 'Item 8', screen: 'Screen8' },
];

const MainPage = () => {
  const navigation = useNavigation();
  
  const boxesData = [
    {
      id: 1,
      title: 'Assistants',
      emoji: '👥',
      screen: 'AssistantsScreen',
    },
    {
      id: 2,
      title: 'My Spending',
      emoji: '💰',
      screen: 'CaterersScreen',
    },
    {
      id: 3,
      title: 'Vendors',
      emoji: '🛍️',
      screen: 'RehearsalScreen',
    },
    {
      id: 4,
      title: 'To Do List',
      emoji: '📝',
      screen: 'ToDoScreen',
    },
  ];

  const handleBoxPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const renderItem = ({ item }) => {
    if (item.countdownDate) {
      const compareDate = Moment(item.countdownDate);
      const now = Moment();
      const duration = Moment.duration(compareDate.diff(now));
      const formattedCountdown = `${Math.floor(duration.asDays())}d:${duration.hours()}h:${duration.minutes()}m:${duration.seconds()}s`;

      const formattedDateTime = Moment(item.countdownDate).format('DD-MM-YYYY h:mm A');

      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleBoxPress(item)}
        >
          <Text style={styles.eventText}>{item.text}</Text>
          <Text style={styles.countdown}>{formattedCountdown}</Text>
          <Text style={styles.dateTime}>{formattedDateTime}</Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.item}
          onPress={() => handleBoxPress(item)}
        >
          <Text>{item.text}</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        style={styles.flatList} 
      />
      <ScrollView contentContainerStyle={styles.boxContainer}>
        {boxesData.map((box) => (
          <TouchableOpacity
            key={box.id}
            style={styles.box}
            onPress={() => handleBoxPress(box)}
          >
            <View style={styles.boxContent}>
              <View style={styles.emojiContainer}>
                <Text style={[styles.boxEmoji, { backgroundColor: '#0066FF', width: 34, height: 34, textAlign: 'center' }]}>{box.emoji}</Text>
              </View>
              <Text style={styles.boxText}>{box.title}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.highlightSection}>
        <Text style={styles.highlightTitle}>Highlights</Text> 
          <View style={styles.highlightBox}>
            <Text style={styles.highlightText}>This is a highlight section below the FlatList.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2b2e46',
  },
  title: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    marginLeft: 10,
  },
  item: {
    backgroundColor: 'lightgray',
    borderRadius: 20,
    height: 100,
    margin: 10,
    minWidth: 170,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  eventText: {
    fontSize: 12,
    fontFamily: 'CSMedium',
  },
  countdown: {
    marginTop: 25,
    textAlign: 'center', 
    justifyContent: 'center', 
    fontSize: 15,
    fontFamily: 'CSMedium',
  },
  dateTime: {
    marginTop: 20,
    fontSize: 12,
    fontFamily: 'CSMedium',
    textAlign: 'left',
  },
  boxContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  box: {
    marginVertical: 5,
  },
  boxContent: {
    padding: 15,
    width: 170,
    backgroundColor: "#9497ba",
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row', 
  },
  emojiContainer: {
    marginRight: 10,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  boxEmoji: {
    fontSize: 20,
    borderRadius: 30,
  },
  boxText: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
    marginVertical: 5,
  },
  highlightSection: {
    padding: 10,
    alignItems: 'center',
  },
  highlightBox: {
    backgroundColor: 'lightyellow',
    borderRadius: 20,
    padding: 20,
  },
  highlightText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  highlightTitle: {
    fontSize: 17,
    fontFamily: 'CSMedium',
    marginBottom: 15,
    paddingRight: 250,
    color: 'white',
  },
});

export default MainPage;