import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';
import CustomButton from '../components/CustomButton';

const Introduction = () => {
  const [showIntro, setShowIntro] = useState(false);
  const navigation = useNavigation();

  const slides = [
    {
      key: 's1',
      title: 'Wedding Intelligent Assistant',
      text: 'Our intelligent AI assistant is here to guide you through every step of your journey.',
      imageAboveTitle: require('../assets/chat12.png'),
    },
    {
      key: 's2',
      title: 'Wedding Timeline and Task Tracker',
      text: 'Stay organized with a customized planning timeline.',
      imageAboveTitle: require('../assets/chat1.png'),
    },
    {
      key: 's3',
      title: 'Budget Management Tool',
      text: 'Track expenses effortlessly, stay on budget.',
      imageAboveTitle: require('../assets/chat2.png'),
    },
    {
      key: 's4',
      title: 'Vendor Recommendations and Coordinatio',
      text: ' Discover vendors, communicate, and coordinate seamlessly.',
      imageAboveTitle: require('../assets/chat3.png'),
    },
  ];

  const RenderNextButton = () => {
    return (
      <TouchableOpacity style={styles.sliderButtonContainer}>
        <View style={styles.sliderButton} />
      </TouchableOpacity>
    );
  };

  const onDone = () => {
    console.log("test");
    setShowIntro(true);
  };

  if (showIntro) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={({ item }) => (
            <View style={styles.introSlide}>
              <Image source={item.imageAboveTitle} style={styles.smallImage} />
              <View style={styles.introContent}>
                <Text style={styles.introTitle}>{item.title}</Text>
                <Text style={styles.introText}>{item.text}</Text>
              </View>
            </View>
        )}
        renderNextButton={RenderNextButton}
        onDone={() => navigation.navigate("SignUp")}
      />
    );
  }

  return (
    <View style={styles.splashContainer}>
        <Image source={require('../assets/logo.png')} style={styles.backgroundLogo} />
        <Image source={require('../assets/chat12.png')} style={styles.backgroundImage} />
        <View style={styles.introContent}>
            <Image source={require('../assets/bottombg.png')} style={styles.background} />
            <Text style={styles.splashTitle}>Hello </Text>
            <Text style={styles.introText}>Welcome to Kawwin.ai, your assistant for future plan.</Text>
            <TouchableOpacity style={styles.buttonContainer} onPress={onDone}>
                <Text style={styles.buttonText}>Let's Start</Text>
            </TouchableOpacity>
        </View>
    </View>
);
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "#ecdff0",
    },
    backgroundLogo: {
        marginTop: 90,
        width: '80%',
        height: '12%', 
    },
    backgroundImage: {
        marginTop: 150,
        position: 'absolute',
        width: '100%',
        height: '80%',
    },
    introContent: {
        marginTop: 310,
        alignItems: 'center',
        borderRadius: 60,
        backgroundColor: 'transparent', 
        height: '40%',
        width: '100%',
    },
    splashTitle: {
        marginTop: 18,
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonContainer: {
      borderWidth: 5, // Reduced border width
      borderColor: '#8247C5', // Border color
      backgroundColor: '#8247C5', // Background color
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      width: 200, // Adjust width to your preference
      height: 50, // Adjust height to your preference
      borderRadius: 10, // Adjust border radius to match the design
  },
    buttonText: {
        fontSize: 16,
        color: 'white',
        fontWeight: '500',
    },
    background: {
      position: 'absolute',
      borderRadius: 70,
      width: '100%',
      height: '100%',
      zIndex: -1,
  },
    introSlide: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    introTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    introText: {
        marginTop: 16,
        fontSize: 16,
        paddingHorizontal: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    slideContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    smallImage: {
        width: 370,
        height: 290,
    },
});

export default Introduction;
