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
  const { avatar, name, num, price, type, benefits } = accommodation;

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={onPress}>
        <Image
          source={{ uri: avatar }}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.name} numberOfLines={1}>
          {name}
        </Text>
        <Stars num={num} />
        <Text style={styles.benefits}>
          {Array.isArray(benefits)
            ? `${benefits.length} tiện ích sở hữu`
            : "Không có tiện ích"}
        </Text>
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
    width: 180,
    height: 270,
    padding: 10,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  name: {
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 10,
  },
  price: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#bd0d0d",
    marginTop: 3,
  },
  benefits: {
    fontSize: 14,
    fontWeight: "bold",
    color: "gray",
    marginTop: 3,
  },
  viewMore: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1E90FF",
    marginTop: 3,
  },
  footer: {
    flexDirection: "row",
    marginTop: 2,
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 2,
  },
});

export default AccommodationCard;
