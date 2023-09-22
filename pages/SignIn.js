import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Image, ScrollView } from "react-native";
import CustomTextInput from "../components/CustomTextInput";
import Icon from "react-native-vector-icons/FontAwesome";
import CustomButton from "../components/CustomButton";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (email) => {
    setEmail(email);
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
        <Text style={styles.text}>Login</Text>
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
        <TouchableOpacity style={styles.forgetPasswordContainer}>
          <Text style={styles.forgetPassword}>Forget Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate("MainPage")}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.lineContainer}>
          <View style={styles.line} />
        </View>
        <View style={styles.iconRow}>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Icon name="google" size={30} color="#DB4437" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Icon name="apple" size={30} color="black" style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("LogIn")}>
            <Icon name="facebook" size={30} color="blue" style={styles.icon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.accountText}>You don't have an account?</Text>
        <TouchableOpacity style={styles.accountContainer} onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.account}>Sign Up</Text>
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
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  iconRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  icon: {
    marginHorizontal: 10,
  },
  forgetPasswordContainer: {
    position: "absolute",
    top: 460,
    right: 20,
  },
  forgetPassword: {
    color: "#9497ba",
    fontWeight: "500",
    fontSize: 14,
  },
  accountText: {
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
    marginTop: 30,
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

export default SignIn;