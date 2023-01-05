import {
  StyleSheet,
  View,
  Button,
  Text,
  TextInput,
  ImageBackground,
} from "react-native";

const images = require("../Images/background.png");

export default function LoginScreen() {
  return (
    <ImageBackground style={styles.image} source={images}>
      <View style={styles.container}>
        <Text style={styles.text}>Увійти</Text>
        <TextInput
          style={styles.input}
          placeholder="Адреса електронної пошти"
        />
        <TextInput style={styles.input} placeholder="Пароль" />
        <View style={styles.button}>
          <Button style={styles.button} color={"#fff"} title="Увійти" />
        </View>
        <View style={{ padding: 16 }}>
          <Button color={"#000"} title="Немає акаунта? Зареєструватись" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
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
