import React, { useState, useCallback } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; 
import { Client, Databases, Account, ID } from 'appwrite';
import { useRouter } from 'expo-router';

const client = new Client();
client.setEndpoint('https://cloud.appwrite.io/v1').setProject('675f19af00004a6f0bf8');

const databases = new Databases(client);
const account = new Account(client);

const databaseId = '675f46cc000bf7c36679';
const collectionId = '675f46e8001a0679c21b';

const TodoApp = () => {
  const router = useRouter();
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  const fetchUserAndTasks = async () => {
    try {
      try {
        const user = await account.get();
        setUserId(user.$id);
      } catch (error) {
        
      }

      if (userId){
        const response = await databases.listDocuments(databaseId, collectionId);
        const userTasks = response.documents.filter((task) => task.userId === user.$id);
        setTasks(userTasks);
      }
    } catch (error) {
      console.error('Error fetching user or tasks:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserAndTasks();
    }, [])
  );

  const handleAddTask = async () => {
    if (task.trim()) {
      try {
        const result = await databases.createDocument(
          databaseId,
          collectionId,
          ID.unique(),
          {
            task,
            userId,
          }
        );

        setTasks([...tasks, result]);
        setTask('');
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  };

  const handleRemoveTask = async (taskId) => {
    try {
      await databases.deleteDocument(databaseId, collectionId, taskId);
      setTasks(tasks.filter((task) => task.$id !== taskId));
    } catch (error) {
      console.error('Error removing task:', error);
    }
  };

  const Login = async () => {
    router.push('/login');
  };

  const Signup = async () => {
    router.push('/signup'); 
  };

  if (!userId) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Please log in or sign up to view your tasks.</Text>
        <Button title="Login" onPress={Login} />
        <Button title="Sign Up" onPress={Signup} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a new task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.task}</Text>
            <TouchableOpacity onPress={() => handleRemoveTask(item.$id)} style={styles.removeButton}>
              <Text style={styles.removeText}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f9f9f9',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 18,
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 5,
    borderRadius: 5,
  },
  removeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default TodoApp;
