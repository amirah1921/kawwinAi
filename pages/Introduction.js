import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AppIntroSlider from 'react-native-app-intro-slider';

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
      title: 'Vendor Recommendations and Coordination',
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

  const renderSlide = ({ item, index }) => (
    <View style={styles.slideContainer}>
      <TouchableOpacity style={styles.backContainer} onPress={onDone}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <Image source={require('../assets/lobg.png')} style={styles.backgroundImage1} />
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Image source={item.imageAboveTitle} style={styles.smallImage} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
      <TouchableOpacity style={styles.skipButton} onDone={() => navigation.navigate("SignIn")}>
      <Text style={styles.skipButtonText}>Skip </Text>
      </TouchableOpacity>
    </View>
  );

  const onDone = () => {
    console.log("test");
    setShowIntro(true);
  };

  if (showIntro) {
    return (
      <AppIntroSlider
        data={slides}
        renderItem={renderSlide}
        renderNextButton={RenderNextButton}
        onDone={() => navigation.navigate("SignIn")}
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
    marginTop: 70,
    width: '80%',
    height: '15%',
  },
  backgroundImage1: {
    marginTop: 150,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
    marginTop: 150,
    position: 'absolute',
    width: '100%',
    height: '80%',
  },
  logo: {
    width: '70%',
    height: '10%',
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
    borderWidth: 5,
    borderColor: '#8247C5',
    backgroundColor: '#8247C5',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    width: 200,
    height: 50,
    borderRadius: 10,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  introText: {
    marginTop: 16,
    fontSize: 15,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color:'white',
  },
  backContainer: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  backText: {
    fontSize: 16,
    color: 'white',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  smallImage: {
    width: '75%',
    height: '50%',
    marginBottom: 20,
  },
  skipButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    fontSize: 16,
    color: 'white',
  },
});

export default Introduction;