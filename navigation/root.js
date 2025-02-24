import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../screens/HomeScreen/index";
import FavoritesScreen from "../screens/FavoriteScreen";
import DetailScreen from "../screens/DetailScreen";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Planets') {
              iconName = focused ? 'public' : 'planet-outline';
            } else if (route.name === 'Favorites') {
              iconName = focused ? 'star' : 'start';
            }

            // You can return any component that you like here!
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Planets"
          component={HomeScreen}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
        />
        <Tab.Screen
          name="Detail"
          component={DetailScreen}
          options={{ tabBarButton: () => null }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}