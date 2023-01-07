import { useEffect, useState } from "react";

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
} from "react-native";

const images = require("../assets/Images/background.png");

const initialSate = {
  login: "",
  email: "",
  password: "",
};

export default function RegistrationScreen({ navigation }) {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialSate);
  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

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

  const submitForm = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialSate);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setState(initialSate);
  };

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
                <View style={styles.avatar}></View>
                <TouchableOpacity style={styles.buttonContainer}>
                  <Text style={styles.buttonText}>+</Text>
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
                style={{ padding: 16, justifyContent: "space-evenly" }}
                onPress={() => navigation.navigate("Login")}
              >
                <Text
                  style={{
                    color: "#1B4371",
                    fontSize: 16,
                  }}
                >
                  У вас вже є акаунт?{"  "}
                  <Text
                    style={{
                      color: "#1B4371",
                      fontSize: 20,
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
  text: {
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
    width: 25,
    height: 25,
    top: -70,
    left: 47,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: "#fff",
    borderColor: "#FF6C00",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    position: "absolute",
    top: -10,
    fontSize: 30,
    color: "#FF6C00",
  },
});
