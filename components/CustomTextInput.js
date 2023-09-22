import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextInput = ({ value, onChangeText, placeholder, secureTextEntry }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      placeholderTextColor='rgba(255,255,255,0.10)' 
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)', 
    width: 340,
    marginRight: 5,
    height: 45,
    borderWidth: 0.5,
    borderWidth: 1,
    borderColor: "transparent",
    marginBottom: 20,
    padding: 10,
    borderRadius: 20,
    fontFamily: 'Roboto',
    fontSize: 16,
  },
});

export default CustomTextInput;
