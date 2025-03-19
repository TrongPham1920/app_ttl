import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomList from "../../components/ui/foundation/list/CustomList";
import useFindModal from "../../hooks/find/FindModal"; 
import FilterModal from "../../components/ui/find/FilterModal";

const FindScreen = () => {
    
  const {
    accommodationData,
    hasMore,
    loading,
    isModalVisible,
    inputValue,
    fromDate,
    toDate,
    setInputValue,
    toggleModal,
    onOK,
    handleSearch,
    handleEndReached,
  } = useFindModal(); 

  const dates = { fromDate, toDate };

  return (
    <View style={styles.container}>
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa..."
          placeholderTextColor="#aaa"
          value={inputValue}
          onChangeText={setInputValue}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.buttonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterButtonContent}>
        <Text style={styles.filterButtonText}>Kết quả</Text>
        <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <FontAwesome5 name="sliders-h" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <CustomList
        loading={loading}
        data={accommodationData}
        onEndReached={handleEndReached}
        date={dates}
        hasMore={hasMore}
      />

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}
        >
          <FilterModal onClose={toggleModal} onOK={onOK} />
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    paddingBottom: 30,
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    marginRight: 10,
    flex: 1,
  },
  searchButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  buttonText: {
    color: "#007BFF",
    fontSize: 16,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  filterButtonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
});

export default FindScreen;
