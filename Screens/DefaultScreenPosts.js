import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function DefaultScreenPosts({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  const user = useSelector((state) => state.auth.userId);

  const getAllPosts = async () => {
    const q = query(collection(db, "posts"), where("user", "==", user));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
        posts.push(doc.data());
      });
      setPosts(posts);
      return posts;
    });
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Image
              source={{ uri: item.photo }}
              style={{ height: 200, marginHorizontal: 20, borderRadius: 8 }}
            />
            <Text style={{ marginLeft: 20, fontSize: 16 }}>{item.text}</Text>
            <View
              style={{
                paddingHorizontal: 20,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ fontSize: 16 }}></Text>
              <TouchableOpacity
                style={styles.comment}
                onPress={() => navigation.navigate("Comments")}
              >
                <EvilIcons name="comment" size={24} color="#bdbdbd" />
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
  },
  comment: {
    top: 0,
    left: -135,
  },
});
