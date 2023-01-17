import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useRoute } from "./router";
import { Provider } from "react-redux";
import { store } from "./redux/store";

export default function App() {
  const routing = useRoute(false);
  return (
    <View style={styles.container}>
      <Provider store={store}>
        <NavigationContainer>{routing}</NavigationContainer>
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
