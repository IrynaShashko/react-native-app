import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const AuthStack = createNativeStackNavigator();
const MainTab = createBottomTabNavigator();

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import Home from "./Screens/Home";
import CommentsScreen from "./Screens/CommentsScreen";
import MapScreen from "./Screens/MapScreen";

export const useRoute = (isAuth) => {
  if (!isAuth) {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Register"
          component={RegistrationScreen}
        />
        <AuthStack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={LoginScreen}
        />
      </AuthStack.Navigator>
    );
  }
  return (
    <MainTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              //   <View style={styles.iconContainer}>
              //     <AntDesign name="appstore-o" size={size} color="#fff" />
              //   </View>
              <AntDesign name="appstore-o" size={size} color={color} />
            );
          },
        }}
        name="Posts"
        component={PostsScreen}
      />

      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              //   <View style={styles.iconContainer}>
              //     <AntDesign name="plus" size={size} color="#fff" />
              //   </View>
              <AntDesign name="plus" size={size} color={color} />
            );
          },
        }}
        name="Create"
        component={CreatePostsScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, size, color }) => {
            return (
              <View style={styles.iconContainer}>
                <Feather name="user" size={size} color="#fff" />
              </View>
              //   <Feather name="user" size={size} color={color} />
            );
          },
        }}
        name="Profile"
        component={ProfileScreen}
      />
    </MainTab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 70,
    height: 40,
    backgroundColor: "#FF6C00",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
