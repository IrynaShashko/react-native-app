import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

export default function PostsScreen({ navigation, route }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  console.log("posts", posts);

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
              <TouchableOpacity>
                <EvilIcons name="comment" size={24} color="#bdbdbd" />
              </TouchableOpacity>
              <Text style={{ fontSize: 16 }}>
                <AntDesign name="enviromento" size={18} color="#bdbdbd" />
                {item.location}
              </Text>
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
    justifyContent: "center",
  },
});
