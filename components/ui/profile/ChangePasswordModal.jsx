import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import useProfile from "../../../hooks/profile/ProfileModal";

const ChangePasswordModal = ({ visible, onClose }) => {
  const { handleSubmitChangePassword } = useProfile();
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  
  const newPassword = watch("newPassword");

  const handleConfirm = async (data) => {
    await handleSubmitChangePassword(data.newPassword)
    reset(); 
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Đổi mật khẩu</Text>

          <Text style={styles.label}>Mật khẩu mới</Text>
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: "Mật khẩu mới là bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.newPassword && styles.inputError]}
                secureTextEntry
                placeholder="Nhập mật khẩu mới"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.newPassword && (
            <Text style={styles.errorText}>{errors.newPassword.message}</Text>
          )}

          <Text style={styles.label}>Xác nhận mật khẩu mới</Text>
          <Controller
            control={control}
            name="confirmPassword"
            rules={{
              required: "Xác nhận mật khẩu là bắt buộc",
              validate: (value) =>
                value === newPassword || "Mật khẩu xác nhận không khớp",
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  errors.confirmPassword && styles.inputError,
                ]}
                secureTextEntry
                placeholder="Xác nhận mật khẩu mới"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modalButtonConfirm}
              onPress={handleSubmit(handleConfirm)}
            >
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => {
                reset(); 
                onClose();
              }}
            >
              <Text style={[styles.modalButtonText, { color: "black" }]}>
                Đóng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputError: {
    borderColor: "red",
  },
  buttonContainer: {
    flexDirection: "row", 
    alignSelf: "flex-end", 
    marginTop: 20,
    gap: 10, 
  },
  modalButtonConfirm: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonCancel: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
  },
});

export default ChangePasswordModal;
