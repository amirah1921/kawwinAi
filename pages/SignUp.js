import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import CustomButton from "../components/CustomButton";

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handleEmailChange = (text) => {
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  return (
    <ImageBackground
      source={require('../assets/lobg.png')}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/chat1.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>Kawwinai</Text>
        <Text style={styles.text}>SignUp</Text>
        <Text style={styles.textInput}>User Name</Text>
        <CustomTextInput
          placeholder={"johndoe"}
          value={username}
          onChangeText={handleUsernameChange}
        />
        <Text style={styles.textInput}>Email Address</Text>
        <CustomTextInput
          placeholder={"johndoe@gmail.com"}
          value={email}
          onChangeText={handleEmailChange}
        />
        <Text style={styles.textInput}>Password</Text>
        <CustomTextInput
          placeholder={"********"}
          value={password}
          onChangeText={handlePasswordChange}
          secureTextEntry={true}
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("MainPage")}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <Text style={styles.accountText}>Already have an account?</Text>
        <TouchableOpacity style={styles.accountContainer} onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.account}>Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    marginTop: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 120,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  text: {
    marginRight: 260,
    fontWeight: "600",
    color: "#edeefa",
    fontSize: 25,
    marginTop: 30,
    marginBottom: 15,
  },
  textInput: {
    color: "#9496ba",
    alignSelf: "flex-start",
    marginLeft: 20,
    marginBottom: 5,
    fontWeight: "500",
    fontSize: 16,
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  accountText: {
    marginTop: 20,
    fontSize: 14,
    color: '#9496BA',
    marginBottom: 10,
  },
  accountContainer: {
    flex: 1,
  },
  account: {
    fontSize: 14,
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
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
  },
});

export default SignUp;