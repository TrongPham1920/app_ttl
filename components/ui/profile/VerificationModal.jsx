import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form"; 
import useProfile from "../../../hooks/profile/ProfileModal";

const VerificationModal = ({ visible, onClose }) => {
  const { handleClickResend, profile, handleSendVerificationEmail } = useProfile();
  const [countdown, setCountdown] = useState(0);
  const [canResend, setCanResend] = useState(true);

  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const handleResendCode = async () => {
    await handleClickResend(profile.email);
    setCountdown(30);
    setCanResend(false);
  };

  const onSubmit = async(data) => {
    await handleSendVerificationEmail(data.verificationCode)
    reset();
    onClose();
  };

  useEffect(() => {
    if (visible) {
      setCountdown(30);
      setCanResend(false);
    }
  }, [visible]);

  useEffect(() => {
    let timer;
    if (!canResend && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }

    return () => clearInterval(timer);
  }, [canResend, countdown]);

  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Xác thực tài khoản</Text>

          <Text style={styles.label}>Hãy nhập mã xác thực</Text>

          <Controller
            control={control}
            name="verificationCode"
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChange}
                defaultValue=""
                placeholder="Nhập mã"
              />
            )}
            rules={{
              required: "Mã xác thực là bắt buộc", 
            }}
          />
          {errors.verificationCode && (
            <Text style={styles.errorText}>{errors.verificationCode.message}</Text>
          )}

          <View style={styles.resendContainer}>
            <TouchableOpacity
              style={styles.resendButton}
              onPress={handleResendCode}
              disabled={!canResend}
            >
              <Text
                style={[
                  styles.resendButtonText,
                  { color: canResend ? "#007BFF" : "rgba(0, 0, 0, 0.25)" },
                ]}
              >
                {canResend ? "Gửi lại mã" : `Gửi lại mã sau ${countdown}s`}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.noteText}>
            Lưu ý: Nếu bạn không thấy email, hãy kiểm tra trong thư mục Hộp Thư Rác hoặc Spam.
          </Text>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.modalButtonSubmit} onPress={handleSubmit(onSubmit)}>
              <Text style={styles.modalButtonText}>Gửi mã</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButtonCancel} onPress={() => {
                reset(); 
                onClose();
              }}>
              <Text style={[styles.modalButtonText, { color: "black" }]}>Đóng</Text>
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
    alignItems: "flex-start",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  resendContainer: {
    marginBottom: 5,
    marginTop: 5,
    width: "100%",
  },
  resendButton: {
    backgroundColor: "transparent",
  },
  resendButtonText: {
    fontSize: 16,
    textAlign: "left",
  },
  noteText: {
    fontSize: 14,
    color: "#FF5722",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 10,
  },
  modalButtonSubmit: {
    backgroundColor: "#375e97",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
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
    color: "white",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
});

export default VerificationModal;
