import React from 'react';
import { StyleSheet } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Screens
import HomeScreen from "./screens/HomeScreen.js";
import ProductDetails from "./screens/ProductDetail.js";
import BlogScreen from "./screens/BlogScreen";
import BlogDetails from './screens/BlogDetails';
import ComingSoon from "./screens/ComingSoon";
import Favorieten from "./screens/Favorieten.js";

import { FavorietenProvider } from "./context/FavorietenContext";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Drawer Navigator: Alleen hoofdschermen
function DrawerNavigation() {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Blog" component={BlogScreen} />
      <Drawer.Screen name="ComingSoon" component={ComingSoon} />
      <Drawer.Screen name="Favorieten" component={Favorieten} />
    </Drawer.Navigator>
  );
}

// App: Stack omvat ook detailpagina's
export default function App() {
  return (
    <FavorietenProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Main"
            component={DrawerNavigation}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Details" component={ProductDetails} />
          <Stack.Screen name="BlogDetails" component={BlogDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </FavorietenProvider>
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
