import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { Card } from "react-native-elements";

const FilterModal = ({ onClose, onOK }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [district, setDistrict] = useState("");

  const categoryOptions = [
    { label: "Hotel", value: 0 },
    { label: "Homestay", value: 1 },
    { label: "Villa", value: 2 },
  ];

  const starOptions = [
    { value: 5 },
    { value: 4 },
    { value: 3 },
    { value: 2 },
    { value: 1 },
    { value: 0 },
  ];

  const handleSelectCategory = (value) => {
    setSelectedType(value);
  };

  const handleSelectRating = (value) => {
    setSelectedRating(value);
  };

  const handleConfirm = () => {
    const filters = {};

    if (selectedType !== null) {
      filters.type = selectedType;
    }
    if (selectedRating !== null) {
      filters.num = selectedRating;
    }
    if (district.trim() !== "") {
      filters.district = district;
    }

    if (Object.keys(filters).length > 0) {
      if (onOK) {
        onOK(filters);
      }
      if (onClose) {
        onClose();
        setSelectedType(null);
        setSelectedRating(null);
        setDistrict("");
      }
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Card containerStyle={styles.cardContainer}>
        <View style={styles.header}>
          <Text style={styles.cardTitle}>Bộ lọc</Text>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Card.Divider />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Quận huyện</Text>
          <View style={styles.inputContainer}>
            <FontAwesome6
              name="location-arrow"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập quận huyện"
              placeholderTextColor="#aaa"
              value={district}
              onChangeText={setDistrict}
            />
          </View>
        </View>

        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Loại lưu trú</Text>
          <View style={styles.radioGroup}>
            {categoryOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.radioOption}
                onPress={() => handleSelectCategory(option.value)}
              >
                <View style={styles.radioCircle}>
                  {selectedType === option.value && (
                    <View style={styles.radioDot} />
                  )}
                </View>
                <Text style={styles.radioLabel}>{option.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.filterOption}>
          <Text style={styles.filterLabel}>Xếp hạng sao</Text>
          <View style={styles.ratingGroup}>
            {starOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={styles.ratingOption}
                onPress={() => handleSelectRating(option.value)}
              >
                <View style={styles.radioCircle}>
                  {selectedRating === option.value && (
                    <View style={styles.radioDot} />
                  )}
                </View>
                <Text style={styles.star}>
                  {option.value === 0 ? (
                    <Text>Chưa có xếp hạng</Text>
                  ) : (
                    [...Array(option.value)].map((_, i) => (
                      <AntDesign key={i} name="star" size={15} color="gold" />
                    ))
                  )}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.buttonText}>Xác nhận</Text>
        </TouchableOpacity>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cardContainer: {
    borderRadius: 10,
    padding: 20,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 5,
  },
  inputWrapper: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  filterOption: {
    marginVertical: 10,
    width: "100%",
  },
  filterLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  radioGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    marginRight: 15,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#007BFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  star: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  radioDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "#007BFF",
  },
  radioLabel: {
    fontSize: 16,
  },
  ratingGroup: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  ratingOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    width: "48%",
  },
  confirmButton: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "#007BFF",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FilterModal;
