import React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { Tabs, Redirect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const RootLayout = () => {
  return (
    <>
      <Redirect href="/home" />
      <Tabs>
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="person" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="todoList"
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="list" color={color} size={size} />,
          }}
        />

        <Tabs.Screen
          name="login"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="signup"
          options={{
            href: null,
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
});

export default RootLayout;
