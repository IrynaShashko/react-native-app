import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { authSignOutUser } from "../redux/auth/authOperations";

export default function ProfileScreen({ navigation }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log("posts in profile--->", posts);
    getUserPosts();
  }, []);

  const user = useSelector((state) => state.auth.userId);
  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("user", "==", user));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot in profile---->", querySnapshot);
      const posts = [];
      querySnapshot.forEach((doc) => {
        console.log("doc in profile--->", doc);
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
      return posts;
    });
  };

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
    backgroundColor: "#fff",
  },
});
