import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Client, Account } from 'react-native-appwrite';
import { useFocusEffect } from '@react-navigation/native';

const client = new Client()
  .setProject('675f19af00004a6f0bf8') 
  .setEndpoint('https://cloud.appwrite.io/v1'); 

const account = new Account(client);

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        try {
          const userData = await account.get(); 
          setUser(userData); 
        } catch (error) {
          console.log('User not logged in or error fetching user data:', error);
          setUser(null); 
        }
      };

      fetchUser();

      return () => {
        setUser(null); 
      };
    }, [])
  );

  const Logout = async () => {
    try {
      await account.deleteSession('current'); 
      setUser(null); 
      router.push('/login'); 
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const Login = async () => {
    router.push('/login');
  };

  const Signup = async () => {
    router.push('/signup'); 
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      {user ? (
        <Text style={styles.username}>Welcome, {user.name || 'User'}!</Text> 
      ) : (
        <Text style={styles.username}>Not logged in</Text> 
      )}

      <Text style={styles.description}>
        Welcome to your profile page! Here, you can see all your details.
      </Text>
      
      {user ? (
        <TouchableOpacity
          style={styles.button}
          onPress={Logout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      ) : (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={Login}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.button}
            onPress={Signup}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  username: {
    fontSize: 20,
    color: '#2c3e50',
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    color: '#7f8c8d',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2ecc71',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    elevation: 5,
    marginVertical: 10, 
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});