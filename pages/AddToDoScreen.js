import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity, 
  StyleSheet,
  Modal,
  Image,
} from 'react-native';

const AddToDoScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };
  const [title, setTitle] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [description, setDescription] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  const options = [
    'Venue',
    'Wedding Dress',
    'Decoration',
    'Photographer',
    'MUA',
    'Entertainment',
    'Door Gift',
  ];

  const handleAddTask = () => {
    if (title.trim() === '' || !selectedOption) {
      return;
    }

    const newTask = {
      id: Date.now().toString(),
      text: title,
      description: description,
      status: 'todo',
    };

    navigation.navigate('ToDoScreen', { newTask });
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
        <Image source={require('../assets/back-button.png')} style={styles.backIcon} />
      </TouchableOpacity>
      <Text style={styles.title}>Add Task</Text>
      <View style={styles.middleContainer}>
        <TextInput
          style={[styles.input, { width: '50%', color: 'white' }]}
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
          placeholderTextColor="white"
        />
        <TouchableOpacity
          style={[styles.input, { width: '50%', color: 'white' }]}
          onPress={toggleModal}
        >
          <Text style={{ color: 'white' }}>{selectedOption || 'Select an option'}</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.input, { width: '50%', color: 'white' }]}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
          placeholderTextColor="white"
        />
        {/* Custom-styled button with a border */}
        <TouchableOpacity onPress={handleAddTask} style={styles.addButton}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            {options.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => handleOptionSelect(option)}
              >
                <Text style={{ color: 'black' }}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#301934',
  },
  goBackButton: {
    position: 'absolute',
    top: 30,
    left: 10,
  },
  backIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    tintColor: 'rgb(168, 163, 163)',
  },
  title: {
    fontSize: 20,
    marginTop: 40,
    color: 'white',
  },
  middleContainer: {
    marginTop: 200,
    width: '120%',
    alignItems: 'center',
  },
  input: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#7F00FF',
    padding: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#8424FF',
    borderRadius: 10,
    marginTop: 160,
    borderWidth: 1,
    borderColor: '#7F00FF',
    padding: 10,
    width: '50%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default AddToDoScreen;