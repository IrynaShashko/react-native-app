import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../firebase/config";
import { authSignOutUser } from "../redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text>ProfileScreen</Text>
      <Button title="sign out" onPress={() => dispatch(authSignOutUser())} />
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
