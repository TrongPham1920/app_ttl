import React from "react";
import {
  View,
  StyleSheet,
  Image,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image
            source={require("../../../assets/images/header.png")}
            style={styles.headerImage}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    paddingTop: 25,
    paddingBottom: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000", // Màu của bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch của bóng
    shadowOpacity: 0.2, // Độ trong suốt của bóng
    shadowRadius: 4, // Độ mờ của bóng
    elevation: 4, // Bóng trên Android
  },
  headerImage: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
});

export default Header;
