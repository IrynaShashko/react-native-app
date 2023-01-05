import { useState } from "react";

import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  ImageBackground,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";

const images = require("../Images/background.png");

export default function LoginScreen() {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  console.log("isShowKeyboard", isShowKeyboard);
  return (
    <ImageBackground style={styles.image} source={images}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{ ...styles.container, top: isShowKeyboard ? -240 : -120 }}
        >
          <Text style={styles.text}>Увійти</Text>
          <TextInput
            style={styles.input}
            placeholder="Адреса електронної пошти"
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry={"true"}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <View style={styles.button}>
            <Button
              onPress={keyboardHide}
              style={styles.button}
              color={"#fff"}
              title="Увійти"
            />
          </View>
          <View style={{ padding: 16 }}>
            <Button color={"#1B4371"} title="Немає акаунта? Зареєструватись" />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: -205,
    height: 489,
    width: 410,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 32,
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
    width: 343,
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
    width: 343,
    borderRadius: 50,
    paddingVertical: 8,
  },
});
