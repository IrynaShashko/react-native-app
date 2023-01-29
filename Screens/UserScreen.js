import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import { authSignOutUser } from "../redux/auth/authOperations";
import { EvilIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";

const images = require("../assets/Images/background.png");

export default function UserScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [like, setLike] = useState(0);
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    getUserPosts();
  }, []);

  const PressLike = (id) => {
    setLike((prevState) => prevState + 1);
  };

  const user = useSelector((state) => state.auth.userId);
  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("user", "==", user));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const posts = [];
      querySnapshot.forEach((doc) => {
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
    <ImageBackground style={styles.image} source={images}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}></View>
          {/* <TouchableOpacity style={styles.buttonContainer}> */}
          <View style={styles.buttonContainer}>
            <Feather name="x" size={24} color="#BDBDBD" />
          </View>
          {/* </TouchableOpacity> */}
        </View>
        <TouchableOpacity style={styles.logout} onPress={signOut}>
          <MaterialIcons name="logout" size={30} color="#BDBDBD" />
        </TouchableOpacity>
        <Text style={styles.user}>{userId}</Text>
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
                <Text style={{ marginLeft: 20, fontSize: 16 }}>
                  {item.text}
                </Text>
                <View
                  style={{
                    paddingHorizontal: 20,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontSize: 16 }}></Text>
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
                      <Text style={styles.text}>0</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => PressLike(item.id)}
                      style={{
                        marginRight: 180,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <SimpleLineIcons name="like" size={16} color="#FF6C00" />
                      <Text style={styles.text}>{like}</Text>
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
                        <AntDesign
                          name="enviromento"
                          size={18}
                          color="#bdbdbd"
                        />
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 150,
    left: 3,
    height: 549,
    width: 410,
    backgroundColor: "#fff",
    paddingTop: 30,
    paddingBottom: 36,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logout: {
    alignSelf: "flex-end",
    marginRight: 19,
    marginBottom: 48,
  },
  user: {
    fontSize: 20,
    color: "#212121",
    alignSelf: "center",
    marginBottom: 33,
  },
  comment: {
    top: 0,
    left: -5,
    marginRight: 27,
    flexDirection: "row",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  avatarContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -90,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  buttonContainer: {
    position: "absolute",
    top: -10,
    left: 250,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    color: "#212121",
  },
});
