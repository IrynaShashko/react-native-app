import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "@react-native-async-storage/async-storage";
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  doc,
  updateDoc,
} from "firebase/firestore";
import { AntDesign, EvilIcons, SimpleLineIcons } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function DefaultScreenPosts({ navigation, route }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [posts, setPosts] = useState([]);

  console.log(posts);

  useEffect(() => {
    async function prepare() {
      try {
        await getAllPosts();

        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push({ ...doc.data(), id: doc.id });
      });
      setPosts(posts);
      return posts;
    });
  };

  const PressLike = async (like, id) => {
    const newLike = like + 1;
    const updatePosts = doc(db, "posts", id);
    await updateDoc(updatePosts, {
      like: newLike,
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
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <>
            <View style={{ marginBottom: 20 }}>
              <Image
                source={{ uri: item.photo }}
                style={{ height: 200, marginHorizontal: 20, borderRadius: 8 }}
              />
              <Text
                style={{
                  marginLeft: 20,
                  marginTop: 8,
                  marginBottom: 11,
                  fontSize: 16,
                }}
              >
                {item.text}
              </Text>
              <View
                style={{
                  paddingHorizontal: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <TouchableOpacity
                    style={styles.comment}
                    onPress={() =>
                      navigation.navigate("Comments", {
                        id: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    <EvilIcons name="comment" size={24} color="#FF6C00" />
                    <Text style={styles.text}>
                      {item.commentLength ? item.commentLength : 0}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => PressLike(item.like, item.id)}
                    style={{
                      marginRight: 150,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <SimpleLineIcons name="like" size={16} color="#FF6C00" />
                    <Text style={styles.text}>{item.like ? item.like : 0}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", {
                        latitude: item.latitude,
                        longitude: item.longitude,
                      })
                    }
                  >
                    <Text style={{ fontSize: 16 }}>
                      <AntDesign name="enviromento" size={18} color="#bdbdbd" />
                      {item.textLocation}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    justifyContent: "center",
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  comment: {
    top: 0,
    left: -5,
    marginRight: 27,
    flexDirection: "row",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#212121",
  },
});
