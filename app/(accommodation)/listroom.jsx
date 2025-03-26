import React from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import FormatUtils from "../../utils/format/Format";
import DateInput from "../../components/ui/foundation/date/Date";
import Null from "../../components/ui/foundation/nodata/Nodata";
import useListRoomModal from "../../hooks/listroom/ListRoomModal";

const getRoomType = (type) => {
  switch (type) {
    case 1:
      return "Phòng đơn";
    case 2:
      return "Phòng đôi";
    case 3:
      return "Phòng Deluxe";
    case 4:
      return "Phòng Suit";
    default:
      return "";
  }
};

const ListRoomView = () => {
  const {
    list,
    selectedKey,
    selectedRooms,
    loading,
    params,
    hotelId,
    user,
    date,
    fromDate,
    toDate,
    setToDate,
    setFromDate,
    showDateModal,
    setParams,
    setShowDateModal,
    handleBookNow,
    calculateTotalPrice,
    handleCheckboxChange,
    handleCloseDateModal,
    handleOpenDateModal,
    handleDateSelection,
  } = useListRoomModal();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  if (!list || list.length === 0) {
    return (
      <>
        <Null
          title={`${fromDate} -- ${toDate} `}
          content="Ngày bạn chọn không khả dụng hãy chọn ngày khác"
          button={{
            label: "Chọn ngày",
            onPress: handleOpenDateModal,
          }}
        />
        {showDateModal && (
          <Modal
            visible={showDateModal}
            animationType="slide"
            transparent={true}
            onRequestClose={handleCloseDateModal}
          >
            <View style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", flex: 1 }}>
              <View style={styles.datePickerContainer}>
                <Text style={styles.modalTitle}>
                  Chọn thời gian nhận/trả phòng
                </Text>
                <View style={styles.inputWrapper}>
                  <DateInput
                    label="Ngày nhận phòng"
                    date={fromDate}
                    onDateChange={setFromDate}
                  />
                </View>

                <View style={styles.inputWrapper}>
                  <DateInput
                    label="Ngày trả phòng"
                    date={toDate}
                    onDateChange={setToDate}
                  />
                </View>
                <View style={styles.button}>
                  <TouchableOpacity
                    style={styles.confirmButton}
                    onPress={() => {
                      const today = new Date();
                      today.setHours(0, 0, 0, 0);

                      if (!fromDate || !toDate) {
                        Toast.show({
                          position: "top",
                          type: "error",
                          text1: "Lỗi chọn ngày",
                          text2:
                            "Vui lòng chọn ngày nhận phòng và ngày trả phòng!",
                        });
                      } else if (fromDate < today) {
                        Toast.show({
                          type: "error",
                          text1: "Lỗi chọn ngày",
                          text2: "Ngày nhận phòng không được nhỏ hơn hôm nay!",
                        });
                      } else if (toDate <= fromDate) {
                        Toast.show({
                          type: "error",
                          text1: "Lỗi chọn ngày",
                          text2: "Ngày trả phòng phải lớn hơn ngày nhận phòng!",
                        });
                      } else {
                        handleDateSelection(fromDate, toDate);
                      }
                    }}
                  >
                    <Text style={styles.confirmButtonText}>Xác nhận</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => {
                      setShowDateModal(false);
                    }}
                  >
                    <Text style={styles.confirmButtonText}>Hủy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        )}
      </>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={list}
        keyExtractor={(item) => item?.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.roomCard}>
              <View style={styles.header}>
                <View style={styles.roomInfoHeader}>
                  <Text style={styles.roomName}>{item?.roomName}</Text>
                  <Text style={styles.roomType}>{getRoomType(item?.type)}</Text>
                </View>
                <CheckBox
                  // style={styles.checkbox}
                  checked={selectedRooms.some((room) => room.id === item.id)}
                  onPress={() => handleCheckboxChange(item?.id, item?.price)}
                  size={30}
                />
              </View>

              <Image source={{ uri: item?.avatar }} style={styles.roomImage} />
              <View style={styles.roomInfo}>
                <View style={styles.roomDetailRow}>
                  <Icon name="arrows-alt" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>
                    {FormatUtils.formatSquareMeter(item?.acreage)}
                  </Text>
                </View>

                <View style={styles.roomDetailRow}>
                  <Icon name="bed" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>{item?.numBed} Giường</Text>
                </View>

                <View style={styles.roomDetailRow}>
                  <Icon name="bath" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>
                    {item?.numTolet} Phòng tắm
                  </Text>
                </View>
              </View>
              <View style={styles.roomInfoRow}>
                <View style={styles.people}>
                  <Icon name="users" size={20} color="#004E9A" />
                  <Text style={styles.roomInfoText}>
                    Tối đa {item?.people} người
                  </Text>
                </View>

                <Text style={styles.roomPrice}>
                  {FormatUtils.vndPrice(item?.price)}
                </Text>
              </View>
          </View>
        )}
      />

      <View style={styles.footerContainer}>
        <Text style={styles.totalPriceText}>
          Tạm tính: {FormatUtils.vndPrice(calculateTotalPrice())}
        </Text>
        <TouchableOpacity
          style={[
            styles.bookNowButton,
            selectedRooms.length === 0 && styles.disabledButton,
          ]}
          onPress={handleBookNow}
          disabled={selectedRooms.length === 0}
        >
          <Text style={styles.bookNowText}>Đặt ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5", // Màu nền sáng hơn
    // paddingBottom: 60,
  },
  roomCard: {
    backgroundColor: "#FFFFFF", // Màu trắng sạch hơn
    borderRadius: 10,
    elevation: 3,
    padding: 15,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  roomCardTouchable: {
    marginBottom: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
  roomInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginVertical: 10,
  },
  roomDetailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  roomInfoText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 5,
    color: "#333", // Văn bản đậm hơn
  },
  roomName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50", // Màu sắc chuyên nghiệp
  },
  roomType: {
    fontSize: 14,
    fontWeight: "600",
    fontStyle: "italic",
    color: "#7F8C8D", // Màu sắc nhấn nhá
  },
  roomPrice: {
    textAlign: "right",
    fontSize: 20,
    fontWeight: "800",
    color: "#E74C3C", // Màu đỏ nổi bật
  },
  people: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#34495E",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ECECEC",
    backgroundColor: "#FAFAFA",
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
  },
  bookNowButton: {
    backgroundColor: "#2980B9",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#BDC3C7",
  },
  bookNowText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  datePickerContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    marginHorizontal: 20,
    marginVertical: 100,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#34495E",
    marginBottom: 15,
  },
  inputWrapper: {
    width: "100%",
    marginVertical: 10,
  },
  confirmButton: {
    backgroundColor: "#27AE60",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#E74C3C",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default ListRoomView;
