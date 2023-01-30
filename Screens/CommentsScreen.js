import React, { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import {
  View,
  SafeAreaView,
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
import Apploading from "expo-app-loading";
import * as Font from "expo-font";

const loadApplication = async () => {
  await Font.loadAsync({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  });
};

export default function CommentsScreen({ route }) {
  const [allComents, setAllComents] = useState([]);
  const [comment, setComment] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const { id, photo } = route.params;

  useEffect(() => {
    getAllComments();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const { login } = useSelector((state) => state.auth);

  const createPost = async () => {
    Keyboard.dismiss();
    setComment("");
    setIsShowKeyboard(false);
    const uniquePostId = await Date.now();
    const time = await new Date(uniquePostId).toLocaleString();
    const createComment = await collection(db, "posts", id, "comments");
    await addDoc(createComment, {
      id,
      comment,
      login,
      time,
    });
  };

  const getAllComments = async () => {
    const q = query(
      collection(db, "posts", id, "comments"),
      where("id", "==", id)
    );
    await onSnapshot(q, (querySnapshot) => {
      const allComents = [];
      querySnapshot.forEach((doc) => {
        allComents.push({ ...doc.data(), id: doc.id });
      });
      setAllComents(allComents);
      return allComents;
    });
  };
  const [isReady, setIsReady] = useState(false);
  if (!isReady) {
    return (
      <Apploading
        startAsync={loadApplication}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <View style={styles.container}>
      {photo && (
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <View style={styles.image}>
              <Image source={{ uri: photo }} style={styles.image} />
              <SafeAreaView>
                <FlatList
                  data={allComents}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.commentContainer}>
                      <Text style={styles.commentText}>{item.comment}</Text>
                      <View style={{ flexDirection: "row" }}>
                        <Text
                          style={{ ...styles.commentTime, marginRight: 10 }}
                        >
                          {item.login}
                        </Text>
                        <Text style={styles.commentTime}>{item.time}</Text>
                      </View>
                    </View>
                  )}
                />
              </SafeAreaView>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                top: isShowKeyboard ? 350 : 520,
              }}
            >
              <TextInput
                style={styles.input}
                placeholder="Коментувати..."
                value={comment}
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
        </TouchableWithoutFeedback>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },

  commentContainer: {
    width: 299,
    maxHeight: 103,
    borderRadius: 6,
    borderTopLeftRadius: 0,
    backgroundColor: "#F6F6F6",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 32,
  },
  inputContainer: {
    position: "absolute",
    width: 380,
    alignSelf: "center",
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
  commentText: {
    fontFamily: "OpenSans-Light",
    fontSize: 13,
    color: "#000",
  },
  commentTime: {
    fontFamily: "OpenSans-Light",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
