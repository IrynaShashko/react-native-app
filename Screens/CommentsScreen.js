import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
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
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { id, photo } = route.params;

  useEffect(() => {
    console.log("allComents in commentScreen--->", allComents);
    getAllComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const user = useSelector((state) => state.auth.userId);

  const createPost = async () => {
    Keyboard.dismiss();
    setComment("");
    setIsShowKeyboard(false);
    const uniquePostId = await Date.now().toString();
    const createComment = await collection(db, "posts", id, "comments");
    await addDoc(createComment, {
      id,
      comment,
      user,
      time: uniquePostId,
    });
  };

  const getAllComments = async () => {
    const q = query(
      collection(db, "posts", id, "comments"),
      where("id", "==", id)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const allComents = [];
      querySnapshot.forEach((doc) => {
        allComents.push({ ...doc.data(), id: doc.id });
      });
      setAllComents(allComents);
      return allComents;
    });
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.image}>
              <Image source={{ uri: photo }} style={styles.image} />
            </View>
            <FlatList
              data={allComents}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.commentContainer}>
                  <Text>{item.comment}</Text>
                  <Text>{item.time}</Text>
                </View>
              )}
            />
            <View
              style={{
                ...styles.inputContainer,
                top: isShowKeyboard ? 40 : 250,
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Коментувати..."
                onChangeText={setComment}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
              />
              <TouchableOpacity style={styles.button} onPress={createPost}>
                <AntDesign name="arrowup" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
  commentContainer: {
    width: 299,
    maxHeight: 103,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: "#F6F6F6",
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 35,
    marginBottom: 24,
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  inputContainer: {
    // top: 250,
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
