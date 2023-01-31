import { useEffect, useState } from "react";
import { Camera, CameraType } from "expo-camera";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignUpUser } from "../redux/auth/authOperations";
import Apploading from "expo-app-loading";
import * as Font from "expo-font";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";

const loadApplication = async () => {
  await Font.loadAsync({
    "OpenSans-Bold": require("../assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  });
};

const images = require("../assets/Images/background.png");

const initialSate = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

export default function RegistrationScreen({ navigation }) {
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [addAvatar, setAddAvatar] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialSate);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);
  const [type, setType] = useState(CameraType.front);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const dispatch = useDispatch();

  function toggleCameraType() {
    setType((current) => {
      current === CameraType.front ? CameraType.back : CameraType.front;
    });
  }

  const onAddAvatarButtonClick = () => {
    setAddAvatar(true);
  };

  const takePhoto = async () => {
    const photo = await camera.takePictureAsync();
    console.log("photo in registration===>", photo);
    await setPhoto(photo.uri);
  };

  const uploadPhotoToServer = async () => {
    const storage = getStorage();
    const uniquePostId = Date.now().toString();
    const storageRef = ref(storage, `avatar/${uniquePostId}`);
    const response = await fetch(photo);
    const file = await response.blob();

    await uploadBytes(storageRef, file).then(() => {
      console.log(`photo uploaded`);
    });
    const result = await getDownloadURL(storageRef).then((item) => {
      setState((prevState) => ({ ...prevState, avatar: item }));
      return item;
    });
    return result;
  };

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    // return () => {
    //   Dimensions.removeEventListener("change", onChange);
    // };
  }, []);

  const submitForm = async () => {
    const userAvatar = await uploadPhotoToServer();
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    const user = { ...state, avatar: userAvatar };
    console.log("user====>", user);
    dispatch(authSignUpUser(user));
    setState(initialSate);
    setPhoto(null);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialSate);
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
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ImageBackground style={styles.image} source={images}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableWithoutFeedback onPress={keyboardHide}>
            <View
              style={{
                ...styles.container,
                top: isShowKeyboard ? -300 : -185,
                width: dimensions,
                left: dimensions < 500 ? -205 : -368,
              }}
            >
              <View style={styles.avatarContainer}>
                <View style={styles.avatar}>
                  {addAvatar && (
                    <Camera style={styles.camera} type={type} ref={setCamera}>
                      {photo && (
                        <View style={styles.takePhotoContainer}>
                          <Image
                            style={{ height: 120, width: 120, borderRadius: 8 }}
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
                        <TouchableOpacity
                          onPress={takePhoto}
                          style={styles.photoButton}
                        >
                          <MaterialIcons
                            name="camera-alt"
                            size={30}
                            color="#e8e8e8"
                          />
                        </TouchableOpacity>
                      </View>
                    </Camera>
                  )}
                </View>
                <TouchableOpacity
                  onPress={onAddAvatarButtonClick}
                  style={styles.buttonContainer}
                >
                  {/* <View style={styles.buttonContainer}> */}
                  <AntDesign name="pluscircleo" size={25} color="#FF6C00" />
                  {/* </View> */}
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>Реєстрація</Text>
              <TextInput
                style={{ ...styles.input, width: dimensions < 500 ? 343 : 543 }}
                value={state.login}
                placeholder="Логін"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, login: value }))
                }
              />
              <TextInput
                style={{ ...styles.input, width: dimensions < 500 ? 343 : 543 }}
                value={state.email}
                placeholder="Адреса електронної пошти"
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, email: value }))
                }
              />
              <TextInput
                style={{ ...styles.input, width: dimensions < 500 ? 343 : 543 }}
                value={state.password}
                placeholder="Пароль"
                secureTextEntry={true}
                onFocus={() => {
                  setIsShowKeyboard(true);
                }}
                onChangeText={(value) =>
                  setState((prevState) => ({ ...prevState, password: value }))
                }
              />
              <View
                style={{
                  ...styles.button,
                  width: dimensions < 500 ? 343 : 543,
                }}
              >
                <Button
                  onPress={submitForm}
                  style={styles.button}
                  color={"#fff"}
                  title="Зареєструватись"
                />
              </View>
              <TouchableOpacity
                style={{
                  padding: 16,
                  justifyContent: "space-evenly",
                }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text
                  style={{
                    color: "#1B4371",
                    fontSize: 16,
                    fontFamily: "OpenSans-Light",
                  }}
                >
                  У вас вже є акаунт?{"  "}
                  <Text
                    style={{
                      color: "#1B4371",
                      fontSize: 20,
                      fontFamily: "OpenSans-Light",
                    }}
                  >
                    Увійти
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: -205,
    height: 549,
    width: 410,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 92,
    paddingBottom: 66,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  camera: {
    position: "absolute",
    height: 120,
    width: 120,
    top: -50,
    marginTop: 50,
    borderWidth: 1,
    borderColor: "#e8e8e8",
    backgroundColor: "#f6f6f6",
    borderRadius: 8,
    overflow: "hidden",
  },
  takePhotoContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    borderWidth: 1,
    borderColor: "#fff",
  },
  cameraContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    borderRadius: 8,
    justifyContent: "center",
  },
  photoButton: {
    position: "absolute",
    top: 90,
  },
  toggleContainer: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  text: {
    fontFamily: "OpenSans-Light",
    fontSize: 30,
    marginBottom: 33,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    fontFamily: "OpenSans-Light",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    padding: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    paddingVertical: 8,
  },
  avatarContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    position: "absolute",
    top: -150,
    width: 120,
    height: 120,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  buttonContainer: {
    position: "absolute",
    top: -70,
    left: 47,
    borderRadius: 50,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "OpenSans-Light",
    position: "absolute",
    top: -10,
    fontSize: 30,
    color: "#FF6C00",
  },
});
