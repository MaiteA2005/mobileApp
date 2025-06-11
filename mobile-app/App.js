import React from 'react';

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from "./screens/HomeScreen.js";
import ProductDetails from "./screens/ProductDetail.js";
import BlogScreen from "./screens/BlogScreen";
import BlogDetails from './screens/BlogDetails';
import ComingSoon from "./screens/ComingSoon";


const Stack = createStackNavigator();


export default function App() {
  return (
        <NavigationContainer style={styles.container}>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={ProductDetails} />
            <Stack.Screen name="Blog" component={BlogScreen} />
            <Stack.Screen name="BlogDetails" component={BlogDetails} />
            <Stack.Screen name="ComingSoon" component={ComingSoon} />
          </Stack.Navigator>
        </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});