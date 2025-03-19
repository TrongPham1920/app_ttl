import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormatUtils from "../../../../utils/format/Format";

const OrderCard = ({ item, onPress }) => {
  const {
    totalPrice,
    accommodation,
    room,
    createdAt,
    checkInDate,
    checkOutDate,
  } = item;

  const num = room?.length || 1;

  const fullAddress = [
    accommodation?.address,
    accommodation?.ward,
    accommodation?.district,
    accommodation?.province,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: accommodation?.avatar }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{accommodation?.name}</Text>

        <Text style={styles.address}>{fullAddress}</Text>
        <Text style={styles.address}>
          Ngày đặt: {FormatUtils.formatDateYear(createdAt)}
        </Text>
        <Text style={styles.address}>
          Ngày nhận: {checkInDate} - Ngày trả: {checkOutDate}
        </Text>
        <Text style={styles.address}>Số phòng: {num}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{FormatUtils.vndPrice(totalPrice)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 10,
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  address: {
    fontSize: 14,
    color: "gray",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#bd0d0d",
    marginTop: 3,
  },
  viewMore: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E90FF",
    marginTop: 3,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 2,
    marginBottom: 2,
  },
});

export default OrderCard;
