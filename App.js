import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Apploading from "expo-app-loading";
import * as Font from "expo-font";
import Main from "./component/main";

const loadApplication = async () => {
  await Font.loadAsync({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
  });
};

export default function App() {
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
    <View style={styles.container}>
      <Provider store={store}>
        <Main />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    backgroundColor: "#fff",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
});
