import React, { useCallback, useState, useEffect } from "react";
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
  updateDoc,
} from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function CommentsScreen({ route }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [allComents, setAllComents] = useState([]);
  const [comment, setComment] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [commentsLength, setCommentsLength] = useState(0);
  const { id, photo } = route.params;
  const { userId, login, avatar } = useSelector((state) => state.auth);

  useEffect(() => {
    async function prepare() {
      try {
        await getAllComments();

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
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

  const createPost = async () => {
    Keyboard.dismiss();
    setComment("");
    setIsShowKeyboard(false);
    setCommentsLength(allComents.length + 1);
    const uniquePostId = await Date.now();
    const createComment = await collection(db, "posts", id, "comments");
    await addDoc(createComment, {
      id,
      comment,
      login,
      time: uniquePostId,
      avatar,
      userId,
    });
    const updatePosts = doc(db, "posts", id);
    await updateDoc(updatePosts, {
      commentLength: allComents.length + 1,
    });
  };

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontFamily: "OpenSans-Light", fontSize: 25 }}>
          Зачекайте...
        </Text>
      </View>
    );
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      {photo && (
        <TouchableWithoutFeedback onPress={keyboardHide}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : ""}
          >
            <View style={styles.image}>
              <Image source={{ uri: photo }} style={styles.image} />
              <SafeAreaView>
                <FlatList
                  data={allComents}
                  keyExtractor={(item, index) => item.id}
                  renderItem={({ item }) => (
                    <View>
                      <View
                        style={{
                          flexDirection:
                            item.userId === userId ? "row-reverse" : "row",
                        }}
                      >
                        <Image
                          source={{ uri: item.avatar }}
                          style={styles.avatar}
                        />
                        <View
                          style={{
                            ...styles.commentContainer,
                            marginLeft: item.userId === userId ? 0 : 6,
                            marginRight: item.userId === userId ? 6 : 0,
                            borderTopLeftRadius: item.userId === userId ? 6 : 0,
                            borderTopRightRadius:
                              item.userId === userId ? 0 : 6,
                          }}
                        >
                          <Text
                            style={{
                              ...styles.commentText,
                              color: "#000",
                            }}
                          >
                            {item.comment}
                          </Text>
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{ ...styles.commentTime, marginRight: 10 }}
                            >
                              {item.login}
                            </Text>
                            <Text style={styles.commentTime}>
                              {new Date(item.time).toLocaleString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </SafeAreaView>
            </View>
            <View
              style={{
                ...styles.inputContainer,
                top: isShowKeyboard ? 310 : 520,
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
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 24,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  image: {
    height: 240,
    borderRadius: 8,
    marginBottom: 10,
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
    // color: "#000",
  },
  commentTime: {
    fontFamily: "OpenSans-Light",
    fontSize: 10,
    color: "#BDBDBD",
  },
});
