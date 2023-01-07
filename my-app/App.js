import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import RegistrationScreen from "./Screens/RegistrationScreen";
import LoginScreen from "./Screens/LoginScreen";
import Home from "./Screens/Home";
import PostsScreen from "./Screens/PostsScreen";
import CreatePostsScreen from "./Screens/CreatePostsScreen";
import CommentsScreen from "./Screens/CommentsScreen";
import ProfilerScreen from "./Screens/ProfileScreen";
import MapScreen from "./Screens/MapScreen";

const AuthStack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
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
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={Home}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Posts"
            component={PostsScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Create"
            component={CreatePostsScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Comment"
            component={CommentsScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Profiler"
            component={ProfilerScreen}
          />
          <AuthStack.Screen
            options={{ headerShown: false }}
            name="Map"
            component={MapScreen}
          />
        </AuthStack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
});
