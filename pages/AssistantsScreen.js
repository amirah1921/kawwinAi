import React from 'react';
import { View, ScrollView, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const data = [
  { id: '1', image: require('../assets/chat2.png'), title: 'Vendor Assistant', description: 'Online', text: 'En Faris', text2: 'in love', screen: 'ChatScreen' },
  { id: '2', image: require('../assets/chat12.png'), title: 'Budget Assistant', description: 'Online', text: 'En Nazri', text2: 'budget on', screen: 'ChatScreen' },
  { id: '3', image: require('../assets/chat1.png'), title: 'Relationship Assistant', description: 'Online', text: 'Cik Ema', text2: 'the best', screen: 'ChatScreen' },
  { id: '4', image: require('../assets/chat3.png'), title: 'Task Assistant', description: 'Online', text: 'Cik Sha', text2: 'will remind', screen: 'ChatScreen' },
  { id: '5', image: require('../assets/chat4.png'), title: 'Ask Anything', description: 'Online', text: 'Mr Joe', text2: 'ready anytime', screen: 'ChatScreen' },
];

const AssistantsScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleItemClick = (item) => {
    navigation.navigate(item.screen, { item });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Image source={require('../assets/back-button.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <Text style={styles.title}>Assistants</Text>
      </View>
      {data.map((item, index) => (
        <TouchableOpacity key={item.id} style={styles.box} onPress={() => handleItemClick(item)}>
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
  );
};

const getBackgroundColor = (index) => {
  const colors = ['lightblue', 'lightgreen', 'lightpink', 'lightyellow', 'lightsalmon'];
  return colors[index % colors.length];
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    marginVertical: 10,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: '600',
    color: '#EDEEFA',
    fontFamily: 'CSMedium',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: '#171826',
  },
  box: {
    width: 350,
    height: 70,
    flexDirection: 'row',
    borderRadius: 20,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#2b2e46',
  },
  goBackButton: {
    padding: 5,
    marginRight: 10,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: 'rgb(168, 163, 163)',
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

export default AssistantsScreen;