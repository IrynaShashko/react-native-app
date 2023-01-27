import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
} from "react-native";
import {
  collection,
  addDoc,
  query,
  where,
  onSnapshot,
  doc,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";

export default function CommentsScreen({ route }) {
  const [allComents, setAllComents] = useState([]);
  const [comment, setComment] = useState("");
  const { id, photo } = route.params;
  console.log("postId--->", route.params);

  useEffect(() => {
    console.log("allComents--->", allComents);

    getAllComments();
  }, []);

  const user = useSelector((state) => state.auth.userId);
  console.log("user", user);
  const createPost = async () => {
    const createComment = await collection(db, "posts", id, "comments");
    await addDoc(createComment, {
      id,
      comment,
      user,
    });
  };

  const getAllComments = async () => {
    const q = query(
      collection(db, "posts", id, "comments"),
      where("id", "==", id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot---->", querySnapshot);
      const allComents = [];

      querySnapshot.forEach((doc) => {
        console.log("doc--->", doc.data());

        allComents.push({ ...doc.data(), id: doc.id });
      });
      setAllComents(allComents);
      console.log("allComents--->", allComents);
      return allComents;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={{ uri: photo }} style={styles.image} />
      </View>
      <FlatList
        data={allComents}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <Text>{item.comment}</Text>
          </>
        )}
      />
      <View>
        <TextInput
          style={styles.input}
          // value={text}
          placeholder="Коментувати..."
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.button} onPress={createPost}>
          <AntDesign name="arrowup" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  image: {
    height: 240,
    borderRadius: 8,
  },
  inputContainer: {
    position: "absolute",
    top: 300,
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    marginTop: 16,
    marginBottom: 16,
    borderRadius: 50,
    paddingHorizontal: 20,
  },
  button: {
    position: "absolute",
    top: 24,
    left: 340,
    backgroundColor: "#FF6C00",
    width: 34,
    height: 34,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});
