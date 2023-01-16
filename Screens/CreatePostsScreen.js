import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import * as Location from "expo-location";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const initialState = {
  text: "",
  location: "",
  photo: "",
};

export default function CreatePostsScreen({ navigation }) {
  const [state, setState] = useState(initialState);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  // if (!permission) {
  //   return <View />;
  // }

  // if (!permission.granted) {
  //   return (
  //     <View style={styles.container}>
  //       <Text style={{ textAlign: "center" }}>
  //         We need your permission to show the camera
  //       </Text>
  //       <Button onPress={requestPermission} title="grant permission" />
  //     </View>
  //   );
  // }

  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }
  //   })();
  // }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    // if (status !== "granted") {
    //   setErrorMsg("Permission to access location was denied");
    //   return;
    // }
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    const location = await Location.getCurrentPositionAsync({});
    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLocation(coords);
    setState((prevState) => ({ ...prevState, photo: photo.uri }));
    setState((prevState) => ({ ...prevState, location: location.timestamp }));
    console.log("location---->", location);
    console.log("state", state);
  };

  const sendPhoto = () => {
    console.log("state", state);
    navigation.navigate("DefaultScreen", state);
    setState(initialState);
    setPhoto(null);
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        {photo && (
          <View style={styles.takePhotoContainer}>
            <Image
              style={{ height: 238, width: 380, borderRadius: 8 }}
              source={{ uri: photo }}
            />
          </View>
        )}
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.toggle} onPress={toggleCameraType}>
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
        style={{ fontSize: 14, paddingTop: 10, paddingBottom: 10 }}
        placeholder="Загрузіть фото"
      />
      <TextInput
        style={styles.input}
        value={state.text}
        placeholder="Назва..."
        onChangeText={(value) =>
          setState((prevState) => ({ ...prevState, text: value }))
        }
      />
      <View style={{ position: "relative" }}>
        <View style={styles.location}>
          <AntDesign name="enviromento" size={16} color="#bdbdbd" />
          <TextInput
            value={state.location}
            placeholder="Місцевість..."
            onChangeText={(value) =>
              setState((prevState) => ({ ...prevState, location: value }))
            }
          />
        </View>
      </View>
      <View style={styles.submitButton}>
        <Button onPress={sendPhoto} title="Опублікувати" color={"#bdbdbd"} />
      </View>
      <TouchableOpacity
        // onFocus={() => setPhoto(null)}
        style={styles.deleteButton}
      >
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
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
  },
  cameraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    // margin: 170,
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
    // height: 240,
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
