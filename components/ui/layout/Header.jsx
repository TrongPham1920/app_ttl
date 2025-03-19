import React from "react";
import { View, StyleSheet, Image, StatusBar, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";

const Header = () => {
  const router = useRouter();

  return (
    <>
      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.push("/")}>
          <Image source={require("../../../assets/images/logo.png")} style={styles.headerImage} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push("/search")}>
          <AntDesign name="search1" size={24} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "white",
    paddingLeft: 5,
    paddingRight: 20,
    paddingBottom: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImage: {
    width: 150,
    height: 40,
    resizeMode: "contain",
    alignSelf: "flex-start",
  },
  icon: {
    marginLeft: 10,
  },
});

export default Header;
