import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import FormatUtils from "../../utils/format/Format";
import DateInput from "../../components/ui/foundation/date/Date";
import SimpleCarousel from "../../components/ui/foundation/image/Carousel";
import LocationMapWithThumbnail from "../../components/ui/foundation/map/LocationMapThumbnail";
import DetailModal from "../../hooks/detail/DetailModal";

const tagColors = [
  "#F2D5DA",
  "#BFBFE3",
  "#C4E2E4",
  "#F3D2C9",
  "#F8E3D0",
  "#CFE9E8",
  "#F0D8BC",
  "#F7D0B1",
];

const getTagColor = (index) => tagColors[index % tagColors.length];

const Stars = ({ num }) => {
  if (num === 0 || num === undefined) {
    return <Text style={styles.noRatingText}>Chưa có đánh giá</Text>;
  }

  const stars = [];
  for (let i = 0; i < 5; i++) {
    const color = i < num ? "gold" : "#cdcbcb73";
    stars.push(<AntDesign key={i} name="star" size={15} color={color} />);
  }
  return <View style={styles.starsContainer}>{stars}</View>;
};

const DetailView = () => {
  const { id, date } = useLocalSearchParams();
  const {
    loading,
    detailData,
    isDescriptionLong,
    showDateModal,
    setShowDateModal,
    goToRoomList,
    setSelectedDate,
    handleDateSelection,
    handleToggleDescription,
  } = DetailModal({ id, date });

  const [fromDate, setFromDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
  });

  const [toDate, setToDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow;
  });

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#6200ea" />
      </View>
    );
  }

  const fullAddress = `${detailData?.address}, ${detailData?.ward}, ${detailData?.district}, ${detailData?.province}`;

  return (
    <View style={styles.container}>
      {/* Modal chọn ngày */}
      <Modal visible={showDateModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.datePickerContainer}>
            <Text style={styles.modalTitle}>Chọn thời gian nhận/trả phòng</Text>
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
                      text2: "Vui lòng chọn ngày nhận phòng và ngày trả phòng!",
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
                  setSelectedDate({ fromDate: null, toDate: null });
                }}
              >
                <Text style={styles.confirmButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollcontainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{detailData?.name?.toUpperCase()}</Text>
        </View>

        <Text style={styles.address}>{fullAddress}</Text>
        <SimpleCarousel data={detailData?.img} />

        <View style={styles.infoContainer}>
          {/* Vị trí bản đồ */}
          <View>
            <Text style={styles.ratingText}>Vị trí bản đồ</Text>
            {detailData?.latitude && detailData?.longitude && !loading && (
              <LocationMapWithThumbnail
                latitude={detailData?.latitude}
                longitude={detailData?.longitude}
              />
            )}
          </View>

          {/* Đánh giá sao */}
          <View style={styles.rating}>
            <Text style={styles.ratingText}>Đánh giá</Text>
            <Stars num={detailData?.num} />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Tiện ích</Text>
        <View style={styles.tagContainer}>
          {detailData?.benefits?.map((item, index) => (
            <Text
              key={index}
              style={[styles.tag, { backgroundColor: getTagColor(index) }]}
            >
              {item?.name}
            </Text>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Mô tả</Text>
        <Text style={[styles.descriptionText, { textAlign: "justify" }]}>
          {isDescriptionLong
            ? detailData?.description.trim()
            : detailData?.description?.slice(0, 250).trim() + "..."}
        </Text>
        <TouchableOpacity
          onPress={handleToggleDescription}
          style={styles.expandButton}
        >
          <Text style={styles.expandText}>
            {isDescriptionLong ? "Thu gọn" : "Xem thêm "}
            <AntDesign
              name={isDescriptionLong ? "up" : "down"}
              size={16}
              color="#015C92"
            />
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <LinearGradient
        colors={["#FFFFFF", "#D3E7EE", "#ABD1DC"]}
        style={[styles.fixedButton]}
        start={{ x: 0, y: 0 }}
      >
        <TouchableOpacity onPress={goToRoomList} style={styles.buttonContainer}>
          <View style={styles.priceContainer}>
            {detailData?.type === 0 ? (
              <>
                <Text style={styles.startingText}>Khởi điểm</Text>
                <Text style={styles.priceText}>
                  {FormatUtils.vndPrice(detailData?.price || 0)}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.startingText}>Giá ưu đãi</Text>
                <Text style={styles.priceText}>
                  {FormatUtils.vndPrice(detailData?.price || 0)}
                </Text>
              </>
            )}
          </View>
          <View>
            {detailData?.type === 0 ? (
              <Text style={styles.buttonText}>Xem mọi phòng</Text>
            ) : (
              <Text style={styles.buttonText}>Đặt ngay</Text>
            )}
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingBottom: 60,
  },
  scrollcontainer: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  address: {
    marginVertical: 4,
    fontSize: 14,
    color: "#1261A6",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    borderRadius: 5,
    padding: 4,
    margin: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  rating: {
    width: "48%",
    alignItems: "flex-end",
  },
  ratingText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  starsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  noRatingText: {
    fontSize: 14,
    color: "#cdcbcb",
    fontStyle: "italic",
  },
  expandButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  expandText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#015C92",
  },

  fixedButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  priceContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginRight: 10,
  },
  startingText: {
    fontSize: 14,
    color: "#666",
    fontWeight: "400",
  },
  priceText: {
    fontSize: 18,
    color: "#9d0000",
    fontWeight: "700",
  },
  buttonText: {
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    flexDirection: "row",
  },
  confirmButton: {
    textAlign: "center",
    width: 80,
    marginTop: 20,
    marginRight: 10,
    padding: 10,
    backgroundColor: "#33539E",
    borderRadius: 5,
  },
  confirmButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    width: 80,
    marginTop: 20,
    padding: 10,
    backgroundColor: "#8B0000",
    borderRadius: 5,
  },
  inputWrapper: {
    width: "80%",
    marginBottom: 5,
  },
});

export default DetailView;
