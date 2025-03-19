import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useForm, Controller } from "react-hook-form";
import DateTimePicker from "@react-native-community/datetimepicker";
import useProfile from "../../../hooks/profile/ProfileModal";
import dayjs from "dayjs";
import Icon from "react-native-vector-icons/FontAwesome";

const UpdateProfileModal = ({ visible, onClose, avatarUrl }) => {
  const { profile, handleUpdateProfile } = useProfile();
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    if (profile?.dateOfBirth) {
      const [day, month, year] = profile.dateOfBirth.split("/").map(Number);
      return new Date(year, month - 1, day);
    }
    return new Date();
  });

  const handleUpdate = async (data) => {
    data.avatar = avatarUrl;
    await handleUpdateProfile(data);
    reset();
    onClose();
  };

  const onDateChange = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
      setValue("dateOfBirth", dayjs(date).format("DD/MM/YYYY"));
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        reset();
        onClose();
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cập nhật thông tin</Text>

          <Text style={styles.label}>Họ và tên</Text>
          <Controller
            control={control}
            name="name"
            rules={{ required: "Họ và tên là bắt buộc" }}
            defaultValue={profile?.name || ""}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.fullName && styles.inputError]}
                placeholder="Nhập họ và tên"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName.message}</Text>
          )}

          <Text style={styles.label}>Giới tính</Text>
          <Controller
            control={control}
            name="gender"
            rules={{ required: "Giới tính là bắt buộc" }}
            defaultValue={profile?.gender}
            render={({ field: { onChange, value } }) => (
              <View
                style={[
                  styles.inputContainer,
                  errors.gender && styles.inputError,
                  { paddingLeft: 0 },
                ]}
              >
                <Picker
                  selectedValue={value}
                  style={styles.picker}
                  onValueChange={onChange}
                >
                  <Picker.Item label="Chọn giới tính" value={null} />
                  <Picker.Item label="Nam" value={0} />
                  <Picker.Item label="Nữ" value={1} />
                  <Picker.Item label="Khác" value={2} />
                </Picker>
              </View>
            )}
          />
          {errors.gender && (
            <Text style={styles.errorText}>{errors.gender.message}</Text>
          )}

          <Text style={styles.label}>Ngày sinh</Text>
          <Controller
            control={control}
            name="dateOfBirth"
            rules={{ required: "Ngày sinh là bắt buộc" }}
            defaultValue={profile?.dateOfBirth || ""}
            render={({ field: { value } }) => (
              <View
                style={[
                  styles.inputContainer,
                  errors.dateOfBirth && styles.inputError,
                ]}
              >
                <TextInput
                  style={[
                    {
                      flex: 1,
                      height: "100%",
                      paddingHorizontal: 5,
                      borderWidth: 0,
                    },
                    errors.dateOfBirth && { borderColor: "red" },
                  ]}
                  placeholder="Chọn ngày sinh"
                  value={value}
                  editable={false}
                />
                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                  <Icon
                    name="calendar"
                    size={20}
                    color="black"
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.dateOfBirth && (
            <Text style={styles.errorText}>{errors.dateOfBirth.message}</Text>
          )}

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <Text style={styles.label}>Số điện thoại</Text>
          <Controller
            control={control}
            name="phoneNumber"
            rules={{
              required: "Số điện thoại là bắt buộc",
              pattern: {
                value: /^[0-9]{10,11}$/,
                message: "Số điện thoại không hợp lệ",
              },
            }}
            defaultValue={profile?.phone || ""}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={[styles.input, errors.phoneNumber && styles.inputError]}
                placeholder="Nhập số điện thoại"
                keyboardType="numeric"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.phoneNumber && (
            <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.modalButtonConfirm}
              onPress={handleSubmit(handleUpdate)}
            >
              <Text style={styles.modalButtonText}>Cập nhật</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButtonCancel}
              onPress={() => {
                reset();
                onClose();
              }}
            >
              <Text style={[styles.modalButtonText, { color: "black" }]}>
                Đóng
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    alignSelf: "flex-start",
    marginBottom: 5,
    marginTop: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  inputContainer: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  inputError: {
    borderColor: "red",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    marginTop: 20,
  },
  modalButtonConfirm: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginRight: 10,
  },
  modalButtonCancel: {
    backgroundColor: "transparent",
    borderColor: "black",
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    fontSize: 16,
    color: "white",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: -5,
    marginBottom: 10,
  },
  calendarIcon: {
    marginLeft: 10,
  },
});

export default UpdateProfileModal;
