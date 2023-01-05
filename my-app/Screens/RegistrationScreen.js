import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";

const images = require("../Images/background.png");

export default function RegistrationScreen() {
  return (
    <ImageBackground style={styles.image} source={images}>
      <View style={styles.container}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}></View>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}>Реєстрація</Text>
        <TextInput style={styles.input} placeholder="Логін" />
        <TextInput
          style={styles.input}
          placeholder="Адреса електронної пошти"
        />
        <TextInput
          style={styles.input}
          placeholder="Пароль"
          secureTextEntry={true}
        />
        <View style={styles.button}>
          <Button
            style={styles.button}
            color={"#fff"}
            title="Зареєструватись"
          />
        </View>
        <View style={{ padding: 16 }}>
          <Button color={"#1B4371"} title="У вас вже є акаунт? Увійти" />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    height: 549,
    width: 410,
    backgroundColor: "#fff",
    justifyContent: "center",
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
