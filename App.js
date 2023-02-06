import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import Main from "./component/main";

const loadApplication = async () => {
  await Font.loadAsync({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
  });
};

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "OpenSans-Bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "OpenSans-Light": require("./assets/fonts/OpenSans-Light.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
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
