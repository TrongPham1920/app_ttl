import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const NoData = ({ title = "Chưa có đơn", content = "", button = null }) => {
  return (
    <View style={styles.centered}>
      <Text style={styles.noDataText}>{title}</Text>
      <Image
        source={{
          uri: "https://res.cloudinary.com/dqipg0or3/image/upload/v1735137166/avatars/itqo3at1b1jyt5d21uxb.jpg",
        }}
        style={styles.noDataImage}
        resizeMode="contain"
      />
      <Text style={styles.noDataText}>{content}</Text>
      {button && (
        <TouchableOpacity style={styles.button} onPress={button.onPress}>
          <Text style={styles.buttonText}>{button.label}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  noDataImage: {
    width: 450,
    height: 400,
  },
  noDataText: {
    marginTop: 16,
    fontSize: 16,
    color: "#1E90FF",
    fontWeight: "600",
  },
  button: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#1E90FF",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NoData;
