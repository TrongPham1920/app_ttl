import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
} from "react-native";
import Format from "../../utils/format/Format";
import Loading from "../../components/ui/foundation/loading/Loading";
import useOrderDetailModal from "../../hooks/detailorder/DetailOrderModal";

const DetailOrder = () => {
  const { id } = useLocalSearchParams();
  const { detail, loading, onOk } = useOrderDetailModal({ id });

  const [isModalVisible, setModalVisible] = useState(false);

  const handleCancelOrder = () => {
    setModalVisible(false);
    onOk();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Loading />
      </View>
    );
  }

  if (!detail) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Không tìm thấy chi tiết đơn hàng</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{detail?.accommodation?.name}</Text>
        <Text
          style={[
            styles.totalPrice,
            { color: detail?.status === 2 ? "#e74c3c" : "#2ecc71" },
          ]}
        >
          Trạng thái: {detail?.status === 2 ? "Đã hủy" : "Đã đặt"}
        </Text>
        <Image
          source={{ uri: detail?.accommodation?.avatar }}
          style={styles.accommodationImage}
        />
        <Text>
          {detail?.accommodation?.address}, {detail?.accommodation?.ward},{" "}
          {detail?.accommodation?.district}, {detail?.accommodation?.province}
        </Text>

        <Text style={styles.sectionTitle}>Thông tin khách hàng</Text>
        <Text>Tên: {detail?.user?.name}</Text>
        <Text>Email: {detail?.user?.email}</Text>
        <Text>Số điện thoại: {detail?.user?.phoneNumber}</Text>

        {detail?.accommodation?.type === 0 && (
          <>
            <Text style={styles.sectionTitle}>Danh sách phòng</Text>
            {detail?.room?.map((r) => (
              <View key={r.id} style={styles.roomItem}>
                <Text>Phòng: {r.roomName}</Text>
                <Text>Giá: {Format.vndPrice(r.price)} </Text>
              </View>
            ))}
          </>
        )}

        <Text style={styles.sectionTitle}>Chi tiết khác</Text>
        <Text>Ngày nhận phòng: {detail?.checkInDate}</Text>
        <Text>Ngày trả phòng: {detail?.checkOutDate}</Text>
        <Text>Giá: {Format.vndPrice(detail?.price)}</Text>
        <Text>Giá lễ: {Format.vndPrice(detail?.holidayPrice)} </Text>
        <Text>
          Giá checkin gấp: {Format.vndPrice(detail?.checkInRushPrice)}
        </Text>
        <Text>Giá giảm: {Format.vndPrice(detail?.discountPrice)} </Text>
        <Text style={styles.totalPrice}>
          Tổng tiền: {Format.vndPrice(detail?.totalPrice)}
        </Text>
        {detail?.status !== 2 && (
          <>
            <Button
              title="Hủy đơn"
              onPress={() => setModalVisible(true)}
              color="#e74c3c"
            />
          </>
        )}
      </View>

      {/* Modal xác nhận hủy đơn */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Xác nhận hủy đơn</Text>
            <Text style={styles.modalMessage}>
              Bạn có chắc chắn muốn hủy đơn hàng này không?
            </Text>
            <View style={styles.modalActions}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Hủy</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={handleCancelOrder}
              >
                <Text style={styles.buttonText}>Xác nhận</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  section: {
    marginBottom: 5,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  accommodationImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  roomItem: {
    marginBottom: 8,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  loadingText: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
  },
  errorText: {
    fontSize: 16,
    textAlign: "center",
    color: "#e74c3c",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  cancelButton: {
    backgroundColor: "#bdc3c7",
  },
  confirmButton: {
    backgroundColor: "#e74c3c",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default DetailOrder;
