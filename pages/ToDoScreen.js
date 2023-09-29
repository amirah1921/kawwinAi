import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  TextInput,
  Modal,
  ImageBackground,
} from 'react-native';
import {useRoute } from '@react-navigation/native';
import AddToDoScreen from './AddToDoScreen';

const ToDoScreen = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const [tasks, setTasks] = useState([
    {
      id: '1',
      text: 'Food Testing',
      description: 'food testing at Kuzi Catering',
      status: 'todo',
    },
    {
      id: '2',
      text: 'Relationship Advice',
      description: 'ask for advice',
      status: 'completed',
    },
    {
      id: '3',
      text: 'Survey Gift',
      description: 'cari gift on Shopee',
      status: 'todo',
    },
    {
      id: '4',
      text: 'Dress Fitting',
      description: 'meet with Kak Yang',
      status: 'todo',
    },
    {
      id: '5',
      text: 'Decorations',
      description: 'Ask Makcik Semah to survey',
      status: 'todo',
    },
    {
      id: '6',
      text: 'Visit Nilai 3',
      description: 'go to Nilai 3 on Wednesday',
      status: 'todo',
    },
    {
      id: '7',
      text: 'Balik Kampung',
      description: 'Balik kampung and meet Mak and Ayah',
      status: 'todo',
    },
  ]);

  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState('todo');
  const [isAddModalVisible, setAddModalVisible] = useState(false);

  const openEditModal = (taskId) => {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    if (taskToEdit) {
      setEditText(taskToEdit.text);
      setEditDescription(taskToEdit.description);
      setEditingTask(taskId);
      setEditModalVisible(true);
    }
  };

  const closeEditModal = () => {
    setEditingTask(null);
    setEditModalVisible(false);
  };

  const saveEditedTask = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask ? { ...task, text: editText, description: editDescription } : task
    );
    setTasks(updatedTasks);
    closeEditModal();
  };

  const moveTaskToCompleted = () => {
    const updatedTasks = tasks.map((task) =>
      task.id === editingTask ? { ...task, status: 'completed' } : task
    );
    setTasks(updatedTasks);
    closeEditModal();
  };

  const renderTaskItem = ({ item }) => (
    <TouchableOpacity style={styles.taskItem} onPress={() => openEditModal(item.id)}>
      <View style={[styles.thumb, { backgroundColor: getStatusColor(item.status) }]}>
        <Image source={getThumbImage(item.status)} style={styles.thumbImage} />
      </View>
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{item.text}</Text>
        <Text style={styles.taskDescription}>{item.description}</Text>
      </View>
      {selectedSegment === 'todo' && (
        <View style={styles.taskIcon}>
          <Text style={getIconStyle(item.status)}>✏️</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const getThumbImage = (status) => {
    switch (status) {
      case 'todo':
        return require('../assets/chat4.png');
      case 'completed':
        return require('../assets/chat4.png');
      default:
        return require('../assets/chat4.png');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return '#FF7324';
      case 'completed':
        return 'white';
      default:
        return 'white';
    }
  };

  const getIconStyle = (status) => {
    switch (status) {
      case 'todo':
        return styles.todoIcon;
      case 'completed':
        return styles.completedIcon;
      default:
        return styles.icon;
    }
  };

  const route = useRoute();
  const newTask = route.params?.newTask;

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
    }
    setAddModalVisible(false);
  };

  return (
    <ImageBackground source={require('../assets/lobg.png')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleGoBack} style={styles.goBackButton}>
          <Image source={require('../assets/back-button.png')} style={styles.backIcon} />
        </TouchableOpacity>
        <View style={styles.header}>
          <Text style={styles.title}>To Do List</Text>
        </View>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/chat12.png')} style={styles.logo} />
        </View>
        <View style={styles.segment}>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedSegment === 'todo' && styles.selectedSegment,
            ]}
            onPress={() => setSelectedSegment('todo')}
          >
            <Text style={styles.segmentText}>To Do</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.segmentButton,
              selectedSegment === 'completed' && styles.selectedSegment,
            ]}
            onPress={() => setSelectedSegment('completed')}
          >
            <Text style={styles.segmentText}>Completed</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={tasks.filter((task) => task.status === selectedSegment)}
          keyExtractor={(item) => item.id}
          renderItem={renderTaskItem}
          contentContainerStyle={styles.taskList}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={isEditModalVisible}
          onRequestClose={closeEditModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.editModal}>
              <TextInput
                style={styles.editText}
                onChangeText={(text) => setEditText(text)}
                value={editText}
                placeholder="Task Title"
              />
              <TextInput
                style={styles.editDescription}
                onChangeText={(text) => setEditDescription(text)}
                value={editDescription}
                placeholder="Task Description"
                multiline={true}
                numberOfLines={4}
              />
              <TouchableOpacity
                style={styles.saveButton}
                onPress={saveEditedTask}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              {selectedSegment === 'todo' && (
                <TouchableOpacity
                  style={styles.moveToCompletedButton}
                  onPress={moveTaskToCompleted}
                >
                  <Text style={styles.moveToCompletedButtonText}>Move to Completed</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeEditModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddModalVisible}
          onRequestClose={() => setAddModalVisible(false)}
        >
          <AddToDoScreen navigation={navigation} />
        </Modal>
        <TouchableOpacity
          style={styles.fab}
          onPress={() => setAddModalVisible(true)}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2e4633',
    paddingTop: 10,
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
  header: {
    marginTop: 20,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 100,
    height: 120,
  },
  title: {
    marginTop: 10,
    color: '#EDEEFA',
    fontFamily: 'CSMedium',
    fontSize: 15,
    marginRight: 10,
    fontWeight: '700',
  },
  segment: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },
  segmentButton: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  selectedSegment: {
    borderRadius: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  segmentText: {
    color: '#d8d9e2',
    fontFamily: 'CSMedium',
    fontSize: 15,
    fontWeight: '800',
    textTransform: 'none',
  },
  taskList: {
    paddingHorizontal: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2b2e4633',
    borderRadius: 20,
    marginBottom: 5,
    padding: 10,
  },
  thumb: {
    borderRadius: 15,
    height: 40,
    width: 40,
    margin: 10,
  },
  thumbImage: {
    height: 40,
    width: 40,
  },
  taskInfo: {
    flex: 1,
    marginLeft: 10,
  },
  taskTitle: {
    color: 'white',
    fontFamily: 'CSMedium',
    fontSize: 15,
    margin: 0,
  },
  taskDescription: {
    color: '#A5ABDD',
  },
  taskIcon: {
    color: '#A5ABDD',
  },
  editText: {
    color: 'black', // Change text color
    fontFamily: 'CSMedium',
    fontSize: 15,
    marginBottom: 5,
    backgroundColor: 'white', // Add background color
    borderRadius: 5, // Add border radius
    padding: 5, // Add padding
  },
  editDescription: {
    color: 'black', // Change text color
    backgroundColor: 'white', // Add background color
    borderRadius: 5, // Add border radius
    padding: 5, // Add padding
  },
  todoIcon: {
    color: '#f11515',
  },
  completedIcon: {
    color: '#54ce0d',
  },
  icon: {},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModal: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  backgroundImage: {
    flex: 1,
    height: '100%',
  },
  saveButton: {
    backgroundColor: '#FF7324',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#A5ABDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  moveToCompletedButton: {
    backgroundColor: '#54ce0d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  moveToCompletedButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  icon: {},
  fab: {
    position: 'absolute',
    bottom: 7,
    right: 5,
    backgroundColor: '#7F00FF',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  fabText: {
    color: 'white',
    fontSize: 30,
  },
});

export default ToDoScreen;