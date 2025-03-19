import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GuestModal from "../../components/ui/payment/GuestModal";
import usePaymentModal from "../../hooks/payment/PaymentModal";
import Loading from "../../components/ui/foundation/loading/Loading";
import Feather from "@expo/vector-icons/Feather";

const Payment = () => {
  const params = useLocalSearchParams();
  const {
    qr,
    guestName,
    guestPhone,
    isModalVisible,
    loading,
    isImageLoading,
    setIsImageLoading,
    handleConfirm,
    handleCancel,
    setIsModalVisible,
    setGuestPhone,
    setGuestName,
    handleDownloadImage,
    handleCcheck,
  } = usePaymentModal({ params });

  if (!loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.downloadButton]}
        onPress={handleDownloadImage}
      >
        <Feather name="download" size={22} color="black" />
      </TouchableOpacity>

      <View style={styles.qrTouchable}>
        <Image
          source={{ uri: qr }}
          style={styles.qrImage}
          onLoad={() => setIsImageLoading(false)}
          onError={() => setIsImageLoading(false)}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.confirmButton]}
          onPress={handleCcheck}
        >
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.qrText2}>Quét mã QR để được xác nhận nhanh hơn</Text>

      <GuestModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        guestName={guestName}
        setGuestName={setGuestName}
        guestPhone={guestPhone}
        setGuestPhone={setGuestPhone}
        onConfirm={() => {
          setIsModalVisible(false);
          handleConfirm();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  downloadButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  qrTouchable: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: 400,
  },
  qrImage: {
    width: 500,
    height: 450,
    resizeMode: "contain",
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 10,
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-between",
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
  qrText2: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 10,
    textAlign: "center",
    color: "gray",
  },
});

export default Payment;
