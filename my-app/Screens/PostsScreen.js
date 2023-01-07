import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function PostsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
      <Text>PostsScreen</Text>
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
