import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { Card } from "react-native-elements";
import DateInput from "../../components/ui/foundation/date/Date";

const SearchScreen = () => {
  const router = useRouter();
  const [people, setPeople] = useState("");
  const [numBed, setNumBed] = useState("");
  const [province, setProvince] = useState("");

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

  const onOk = () => {
    const rawParams = {
      province,
      people,
      numBed,
      fromDate: fromDate ? dayjs(fromDate).format("DD/MM/YYYY") : null,
      toDate: toDate ? dayjs(toDate).format("DD/MM/YYYY") : null,
    };
  
    const params = Object.fromEntries(
      Object.entries(rawParams).filter(([_, v]) => v)
    );
  
    router.push({
      pathname: "/find",
      params,
    });
  };
  

  return (
    <LinearGradient colors={["#3B5284", "#5BA8A0"]} style={styles.container}>
      <Card containerStyle={styles.card}>
        <Text style={styles.title}>Tìm lưu trú</Text>
        <Card.Divider />

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Thành phố</Text>
          <View style={styles.inputContainer}>
            <FontAwesome6
              name="location-arrow"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập thành phố"
              placeholderTextColor="#aaa"
              value={province}
              onChangeText={setProvince}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Số người</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="people"
              size={24}
              color="black"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập số người"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={people}
              onChangeText={setPeople}
            />
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Số phòng</Text>
          <View style={styles.inputContainer}>
            <Ionicons name="bed" size={24} color="black" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Nhập số phòng"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={numBed}
              onChangeText={setNumBed}
            />
          </View>
        </View>
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
        <Button title="Xác nhận" onPress={onOk} />
      </Card>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
    justifyContent: "center"
  },
  card: {
    marginTop: 40,
    width: "90%",
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
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
});

export default SearchScreen;
