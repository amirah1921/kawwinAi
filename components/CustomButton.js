import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

const CustomButton = ({ title, onPress, width, height, backgroundColor }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonTouchable}>
      <View
        style={[styles.buttonContainer, { width, height, backgroundColor }]}
      >
        <Text style={styles.buttonText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 1,
    borderColor: "#000000", // Corrected border color code
    borderWidth: 1, // Border width
    marginTop: 10, // Add spacing between text and buttons
    alignItems: "center", // Center the buttons horizontally
    padding: 10, // Add padding to the container
},
  buttonTouchable: {
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 18,
  },
});

export default CustomButton;