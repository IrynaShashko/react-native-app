import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../firebase/config";
import {
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  View,
  Image,
} from "react-native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { collection, addDoc } from "firebase/firestore";

export default function CreatePostsScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [text, setText] = useState("");
  const [photo, setPhoto] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [textLocation, setTextLocation] = useState("");
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const { userId, login } = useSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, [photo]);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  const sendPhoto = async () => {
    await uploadPostToServer();
    navigation.navigate("DefaultScreen");
    deletePost();
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    const createPost = await collection(db, "posts");

    await addDoc(createPost, {
      user: userId,
      latitude: latitude,
      longitude: longitude,
      text: text,
      photo: photo,
      textLocation: textLocation,
      login: login,
      like: 0,
    });
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `postImages/${uniquePostId}`);
    const response = await fetch(photo);
    const file = await response.blob();

    await uploadBytes(storageRef, file).then(() => {
      console.log(`photo uploaded`);
    });
    const result = await getDownloadURL(storageRef).then((item) => {
      return item;
    });
    return result;
  };

  const deletePost = () => {
    setPhoto(null);
    setText("");
    setLatitude("");
    setLongitude("");
    setTextLocation("");
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Camera
            style={{ ...styles.camera, marginTop: isShowKeyboard ? 20 : 50 }}
            type={type}
            ref={setCamera}
          >
            {photo && (
              <View style={styles.takePhotoContainer}>
                <Image
                  style={{ height: 238, width: 380, borderRadius: 8 }}
                  source={{ uri: photo }}
                />
              </View>
            )}
            <View style={styles.toggleContainer}>
              <TouchableOpacity
                style={styles.toggle}
                onPress={toggleCameraType}
              >
                <MaterialCommunityIcons
                  name="camera-flip"
                  size={30}
                  color="#e8e8e8"
                />
              </TouchableOpacity>
            </View>
            <View style={styles.cameraContainer}>
              <TouchableOpacity onPress={takePhoto} style={styles.button}>
                <MaterialIcons name="camera-alt" size={24} color="#e8e8e8" />
              </TouchableOpacity>
            </View>
          </Camera>
          <TextInput
            style={styles.input}
            value={text}
            placeholder="Назва..."
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
            onChangeText={(value) => setText(value)}
          />
          <View style={{ position: "relative" }}>
            <View style={styles.location}>
              <AntDesign name="enviromento" size={16} color="#bdbdbd" />
              <TextInput
                value={textLocation}
                placeholder="Місцевість..."
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) => setTextLocation(value)}
              />
            </View>
          </View>
          <View style={styles.submitButton}>
            <Button
              onPress={sendPhoto}
              title="Опублікувати"
              color={"#bdbdbd"}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
      <TouchableOpacity onPress={deletePost} style={styles.deleteButton}>
        <MaterialIcons name="delete-outline" size={24} color="#dadada" />
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  camera: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: 240,
    // marginTop: 50,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    overflow: "hidden",
  },
  cameraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderRadius: 8,
  },
  toggleContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  button: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  toggle: {
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 50,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "#f6f6f6",
    borderRadius: 50,
    paddingVertical: 8,
  },
  location: {
    flexDirection: "row",
    alignItems: "baseline",
    height: 35,
    borderColor: "#E8E8E8",
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 32,
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "#fff",
  },
  deleteButton: {
    position: "absolute",
    bottom: 20,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    width: 70,
    height: 40,
    backgroundColor: "#f6f6f6",
    borderRadius: 20,
  },
});
