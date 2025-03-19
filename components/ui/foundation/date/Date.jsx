import DateTimePicker from "@react-native-community/datetimepicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const DateInput = ({ label, date, onDateChange }) => {
  const [show, setShow] = useState(false);

  const currentDate = dayjs(date).isValid() ? dayjs(date) : dayjs();

  const onChange = (event, selectedDate) => {
    const selected = selectedDate || currentDate;
    setShow(false);
    if (onDateChange) {
      onDateChange(selected);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text
        style={styles.input}
        onPress={() => setShow(true)} 
      >
        {currentDate.format("DD/MM/YYYY")}
      </Text>
      {show && (
        <DateTimePicker
          value={currentDate.toDate()}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    color: "#333",
  },
});

export default DateInput;
