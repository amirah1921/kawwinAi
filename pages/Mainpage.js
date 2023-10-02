import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Moment from 'moment';
import { useNavigation } from '@react-navigation/native';

const MainPage = () => {
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const [data, setData] = useState([
    { id: '1', text: 'The Event', countdownDate: '2023-12-12T12:00:00' },
    { id: '2', text: 'Total Spend', screen: 'Screen2' },
    { id: '3', text: 'Total Budget', screen: 'Screen3' },
  ]);

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

  const highlight = [
    { id: '1', image: require('../assets/chat2.png'), title: 'Kuzi Catering', description: 'Food Testing Appoinment', text: '12 Oct 2023', text2: '10:00 AM' },
    { id: '2', image: require('../assets/chat12.png'), title: 'Budget Report', description: '1.05%', text: 'RM21,786.28', text2: 'High Budget',  },
    { id: '3', image: require('../assets/chat1.png'), title: 'Vendors Selected', description: 'Vendors Confirmed', text: '5', text2: 'Selected' },
  ];

  const handleBoxPress = (item) => {
    if (item.screen) {
      navigation.navigate(item.screen);
    }
  };

  const handleDateChange = (date) => {
    setModalVisible(false);

    const updatedData = data.map((item) => {
      if (item.countdownDate) {
        const newCountdownDate = Moment(date).format('YYYY-MM-DDTHH:mm:ss');
        return { ...item, countdownDate: newCountdownDate };
      }
      return item;
    });

    setData(updatedData);
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

  const getBackgroundColor = (index) => {
    const colors = ['lightblue', 'lightgreen', 'lightpink', 'lightyellow', 'lightsalmon'];
    return colors[index % colors.length];
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
      <View style={styles.boxContainer}>
        {/* Use flexDirection: 'row' and flexWrap: 'wrap' to wrap items into multiple rows */}
        {/* Use justifyContent: 'space-between' to evenly distribute items */}
        <View style={styles.boxRow}>
          {boxesData.map((box) => (
            <TouchableOpacity
              key={box.id}
              style={styles.box}
              onPress={() => handleBoxPress(box)}
            >
              <View style={styles.boxContent}>
                <View style={styles.emojiContainer}>
                  <Text
                    style={[
                      styles.boxEmoji,
                      { backgroundColor: '#0066FF', width: 34, height: 34, textAlign: 'center' },
                    ]}
                  >
                    {box.emoji}
                  </Text>
                </View>
                <Text style={styles.boxText}>{box.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TouchableOpacity
        style={styles.openModalButton}
        onPress={() => setModalVisible(true)}
      >
        <Text
          style={[
            styles.openModalButtonText,
            { backgroundColor: '#0066FF', width: 34, height: 34, textAlign: 'center', borderRadius: 30 },
          ]}
        >
          🗓️
        </Text>
        <Text style={styles.openModalButtonText}>Choose a Date</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.calendarContainer}>
            <CalendarPicker
              onDateChange={(date) => setSelectedDate(date)}
            />
          </ScrollView>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={() => handleDateChange(selectedDate)}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView contentContainerStyle={styles.containerHighlight}>
          <Text style={styles.titleHighlight}>Highlights</Text>
        {highlight.map((item, index) => (
          <TouchableOpacity key={item.id} style={styles.boxHighlight}>
            <View style={[styles.imageContainer, { backgroundColor: getBackgroundColor(index) }]}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.contentContainer}>
              <View style={styles.leftContent}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
              </View>
              <View style={styles.rightContent}>
                <Text style={styles.itemText}>{item.text}</Text>
                <Text style={styles.itemText2}>{item.text2}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#171826',
  },
  title: {
    marginTop: 25,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'white',
    marginLeft: 10,
  },
  item: {
    backgroundColor: '#2b2e46',
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
    color: 'white',
  },
  countdown: {
    marginTop: 25,
    color: 'white',
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
    color: 'white',
  },
  boxContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap', 
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  boxRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  box: {
    marginVertical: 5,
  },
  boxContent: {
    padding: 15,
    width: 170,
    backgroundColor: "#2b2e46",
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
  },
  openModalButton: {
    padding: 15,
    width: 170,
    backgroundColor: "#2b2e46",
    borderRadius: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 5,
    marginLeft: 10,
  },
  openModalButtonText: {
    marginRight: 8,
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  calendarContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: 400,
  },
  confirmButton: {
    backgroundColor: '#0066FF',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    margin: 10,
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 16,
  },
  titleHighlight: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white',
  },
  containerHighlight: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  boxHighlight: {
    marginLeft: 5,
    width: 350,
    height: 70,
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#2b2e46',
  },
  imageContainer: {
    width: '15%',
    height: '84%',
    marginRight: 20,
    marginLeft: 10,
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
  },
  rightContent: {
    marginLeft: 20,
    alignItems: 'flex-end',
  },
  itemTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
  },
  itemDescription: {
    fontSize: 14,
    color: '#28D157',
  },
  itemText: {
    marginTop: 10,
    fontSize: 16,
    paddingRight: 10,
    color: 'white',
    textAlign: 'right',
  },
  itemText2: {
    fontSize: 14,
    paddingRight: 10,
    color: '#A5ABDD',
    textAlign: 'right',
  },
});

export default MainPage;