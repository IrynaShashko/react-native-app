import React from "react";
import { View, Text, StyleSheet } from "react-native";
import PostsScreen from "./PostsScreen";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <PostsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
