import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function App() {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

  console.log("photo----->", photo);

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={setCamera}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <MaterialCommunityIcons
              name="camera-flip"
              size={24}
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
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  camera: {
    position: "relative",
    alignItems: "center",
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
    margin: 160,
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
});
