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
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                }}
              >
                <AntDesign
                  name="appstore-o"
                  size={size}
                  color={focused ? "#fff" : "#212121"}
                />
              </View>
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
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                }}
              >
                <AntDesign
                  name="plus"
                  size={size}
                  color={focused ? "#fff" : "#212121"}
                />
              </View>
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
              <View
                style={{
                  ...styles.iconContainer,
                  backgroundColor: focused ? "#FF6C00" : "#fff",
                }}
              >
                <Feather
                  name="user"
                  size={size}
                  color={focused ? "#fff" : "#212121"}
                />
              </View>
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
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
