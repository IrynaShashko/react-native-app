import React from "react";
import { useDispatch } from "react-redux";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { authSignOutUser } from "../redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={signOut}>
        <MaterialIcons name="logout" size={30} color="#BDBDBD" />
      </TouchableOpacity>
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
