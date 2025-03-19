import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import FormatUtils from "../../../../utils/format/Format";
import AntDesign from "@expo/vector-icons/AntDesign";

const Stars = ({ num }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    const color = i < num ? "gold" : "#cdcbcb73";
    stars.push(<AntDesign key={i} name="star" size={15} color={color} />);
  }
  return <View style={styles.starsContainer}>{stars}</View>;
};

const AccommodationCard = ({ accommodation, onPress }) => {
  const { avatar, name, num, address, ward, district, province, price, type } =
    accommodation;

  const fullAddress = [address, ward, district, province]
    .filter(Boolean)
    .join(", ");

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: avatar }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name}>{name}</Text>
        <Stars num={num} />
        <Text style={styles.address}>{fullAddress}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{FormatUtils.vndPrice(price)}</Text>
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
    height: 150,
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

export default AccommodationCard;
