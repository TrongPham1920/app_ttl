// components/Loading.jsx
import React from "react";
import { ActivityIndicator, View, Text, StyleSheet } from "react-native";

const Loading = () => {
  return (
    <View style={styles.centered}>
      <ActivityIndicator size={60} color="#1E90FF" />
      <Text style={styles.loadingText}>Đang tải...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 14,
    color: "#1E90FF",
    fontWeight: "600",
  },
});

export default Loading;
