import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';

const ChatScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.outerContainer}>
      <ImageBackground
        source={require('../assets/lobg.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.innerContainer}>
          <ImageBackground
            source={require('../assets/chat4.png')}
            style={styles.chatBackground}
            imageStyle={{ opacity: 0.5, height: '70%', marginTop: 140,}} 
          >
            <View style={styles.chatContainer}>
              <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
                <Image source={require('../assets/back-button.png')} style={styles.backIcon} />
              </TouchableOpacity>
              <View style={styles.chatboxWrapper}>
                <View style={styles.chatbox}>
                  <View style={styles.chatboxLeft}>
                    <Text style={styles.chatTextLeft}>Baik saja, Kamu ok?</Text>
                  </View>
                  <View style={styles.chatboxRight}>
                    <Text style={styles.chatText}>Apa kabar mu disana</Text>
                  </View>
                </View>
              </View>
              <View style={styles.inputItem}>
                <TextInput style={styles.input} placeholder="I need advice" />
                <TouchableOpacity style={styles.sendButton}>
                  {/* Add the paper plane icon here */}
                  <Image source={require('../assets/paper-plane.png')} style={styles.sendIcon} />
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  chatBackground: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  goBackButton: {
    padding: 5,
    marginLeft: 5,
    marginTop: 10,
  },
  backIcon: {
    width: 40, 
    height: 40, 
    resizeMode: 'contain',
    tintColor: 'rgb(168, 163, 163)', 
  },
  chatboxWrapper: {
    flex: 1,
  },
  chatbox: {
    flexDirection: 'column',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  chatboxLeft: {
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    paddingLeft: 10,
    borderRadius: 15,
    maxWidth: '100%',
    marginBottom: 5,
  },
  chatboxRight: {
    alignSelf: 'flex-end',
    backgroundColor: 'transparent',
    paddingRight: 10,
    borderRadius: 15,
    maxWidth: '70%',
    marginBottom: 5,
  },
  chatTextLeft: {
    color: 'white',
    fontWeight: '900',
    fontFamily: 'CSMedium',
    fontSize: 15,
  },
  chatText: {
    color: 'white',
    fontFamily: 'CSMedium',
    fontSize: 15,
  },
  inputItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    marginVertical: 10,
    width: '100%',
  },
  input: {
    flex: 1,
    color: 'rgb(168, 163, 163)',
    fontFamily: 'CSBook',
  },
  sendButton: {},
  sendIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: 'rgb(168, 163, 163)', 
  },
});

export default ChatScreen;