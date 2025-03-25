import React from "react";
import { View, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native";
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", 
  },
  headerImage: {
    width: 150,
    height: 40,
    resizeMode: "contain",
  },
});

export default Header;
