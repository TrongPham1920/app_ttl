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
    selectedFilters,
    handleRemoveTag,
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

      <View style={styles.tagContainer}>
        {selectedFilters.map((filter, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{filter}</Text>
            <TouchableOpacity onPress={() => handleRemoveTag(filter)}>
              <FontAwesome5 name="times" size={16} color="white" />
            </TouchableOpacity>
          </View>
        ))}
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
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tag: {
    flexDirection: "row",
    backgroundColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
    alignItems: "center",
  },
  tagText: {
    color: "white",
    marginRight: 5,
  },
});

export default FindScreen;
