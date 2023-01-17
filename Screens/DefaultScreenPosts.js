import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function DefaultScreenPosts({ navigation, route }) {
  const [posts, setPosts] = useState([]);
  console.log("posts in default--->", posts);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  return (
    <View style={styles.container}>
      <MaterialIcons name="logout" size={24} color="#BDBDBD" />
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
                onPress={() => navigation.navigate("Map", posts.latitude)}
              >
                <Text style={{ fontSize: 16 }}>
                  <AntDesign name="enviromento" size={18} color="#bdbdbd" />
                  {item.location}
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
  },
  comment: {
    top: 0,
    left: -100,
  },
});
