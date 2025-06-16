import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={18} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={18} name="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-outfit"
        options={{
          title: "Add Outfit",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={24} name="add" color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo size={18} name="heart" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons size={18} name="search" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
