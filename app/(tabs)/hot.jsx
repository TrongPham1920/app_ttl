import React from "react";
import { StyleSheet, View } from "react-native";
import CustomList from "../../components/ui/foundation/list/CustomList";
import useHotModal from "../../hooks/hot/HotModal";
import DateInput from "../../components/ui/foundation/date/DateHome";

const ShowAllScreen = ({ navigation }) => {
  const { accommodationData, loading, onDateChange, dates } = useHotModal();

  return (
    <View style={styles.container}> 
      <View style={styles.dateInputContainer}>
        <DateInput
          title="Ngày đặt phòng"
          startDate={dates.fromDate}
          endDate={dates.toDate}
          onDateChange={onDateChange}
        />
      </View>
      <View style={styles.listContainer}>  
        <CustomList
          loading={loading}
          data={accommodationData}
          navigation={navigation}
          date={{ fromDate: dates.fromDate, toDate: dates.toDate }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
  },
  dateInputContainer: {
    padding: 10,
  },
  listContainer: {
    flex: 1, 
  },
});

export default ShowAllScreen;
