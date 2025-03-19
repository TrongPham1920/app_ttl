import React from "react";
import { Modal, View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const QRModal = ({ visible, qrCode, onClose }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <Image source={{ uri: qrCode }} style={styles.modalQrImage} />
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalQrImage: {
    width: 450,
    height: 450,
    resizeMode: "contain",
    borderRadius: 10,
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default QRModal;
