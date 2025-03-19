import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

const GuestModal = ({
  isVisible,
  onClose,
  onConfirm,
  guestName,
  setGuestName,
  guestPhone,
  setGuestPhone,
}) => {

  console.log("setGuestName:", setGuestName);  
  console.log("guestName:", guestName);
  
  const handleConfirm = () => {
    if (!guestName || !guestPhone) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Thông tin không hợp lệ",
        text2: "Vui lòng điền đầy đủ thông tin trước khi xác nhận.",
      });
      return;
    }

    const phoneRegex = /^(0\d{9}|\d{10,11})$/;
    if (!phoneRegex.test(guestPhone)) {
      Toast.show({
        type: "error",
        position: "top",
        text1: "Số điện thoại không hợp lệ",
        text2: "Vui lòng nhập số điện thoại có 10 hoặc 11 chữ số.",
      });
      return;
    }

    onConfirm();
  };

  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Thông tin khách hàng</Text>

          <TextInput
            style={styles.input}
            placeholder="Họ và tên"
            value={guestName}
            onChangeText={(text) => {
              console.log("Nhập tên:", text);
              setGuestName(text);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Số điện thoại"
            value={guestPhone}
            onChangeText={setGuestPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.modalButtonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.confirmButton]}
              onPress={handleConfirm}
            >
              <Text style={styles.buttonText}>Xác nhận</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: "#1E90FF",
  },
  cancelButton: {
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default GuestModal;
