import { StyleSheet, ImageBackground } from "react-native";

const images = require("../Images/background.png");

export default function LoginScreen() {
  return (
    <ImageBackground style={styles.image} source={images}></ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
});
