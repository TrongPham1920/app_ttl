import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import HorizontalList from "../../components/ui/foundation/list/HorizontalList";
import useHomeModal from "../../hooks/home/HomeModal";
import { useRouter } from "expo-router";
import DateInput from "../../components/ui/foundation/date/DateHome";

const HomeScreen = () => {
  const router = useRouter();
  const {
    dates,
    list,
    generalLoading,
    villa,
    homestay,
    hotels,
    hotelLoading,
    homestayLoading,
    villaLoading,
    onDateChange,
  } = useHomeModal();

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.listContent}>
        <View style={styles.inputWrapper}>
          <DateInput
            title="Ngày đặt phòng"
            startDate={dates.fromDate}
            endDate={dates.toDate}
            onDateChange={onDateChange}
          />
        </View>

        <View style={styles.boxHeader}>
          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              router.push({
                pathname: "/find",
                params: {
                  type: 0,
                  fromDate: dates.fromDate,
                  toDate: dates.toDate,
                },
              });
            }}
          >
            <Image
              source={{
                uri: "https://vcdn1-dulich.vnecdn.net/2023/05/26/hotel-overview-1685095339.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=VYD32gvGA3DdEBQaNk6_BQ",
              }}
              style={styles.image}
            />
            <Text style={styles.boxText}>Khách sạn</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              router.push({
                pathname: "/find",
                params: {
                  type: 2,
                  fromDate: dates.fromDate,
                  toDate: dates.toDate,
                },
              });
            }}
          >
            <Image
              source={{
                uri: "https://www.cet.edu.vn/wp-content/uploads/2019/02/villa-khong-gian-sang-trong.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.boxText}>Villa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.box}
            onPress={() => {
              router.push({
                pathname: "/find",
                params: {
                  type: 1,
                  fromDate: dates.fromDate,
                  toDate: dates.toDate,
                },
              });
            }}
          >
            <Image
              source={{
                uri: "https://motogo.vn/wp-content/uploads/2023/05/homestay-kon-tum-40.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.boxText}>Homestay</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 8,
          }}
        >
          <EvilIcons name="location" size={24} color="#1E90FF" />
          <Text style={{ fontSize: 16, fontWeight: "bold", marginLeft: 5 }}>
            Địa điểm nổi tiếng
          </Text>
        </View>

        <View style={styles.boxRow}>
          {[
            {
              province: "Hồ Chí Minh",
              image:
                "https://wallpapers.com/images/featured/ho-chi-minh-city-souznxe6xnmwb70j.jpg",
            },
            {
              province: "Đà Nẵng",
              image:
                "https://res.cloudinary.com/dqipg0or3/image/upload/v1736306105/avatars/fn38tjh8gqoyksfivpa2.jpg",
            },
            {
              province: "Đà Lạt",
              image:
                "https://haycafe.vn/wp-content/uploads/2022/01/Hinh-anh-Da-Lat-o-quang-truong.jpg",
            },
            {
              province: "Vũng Tàu",
              image:
                "https://c1.wallpaperflare.com/preview/868/808/843/vung-tau-panorama-scenery-the-sea.jpg",
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.box_img}
              onPress={() => {
                router.push({
                  pathname: "/find",
                  params: {
                    province: item.province,
                    fromDate: dates.fromDate,
                    toDate: dates.toDate,
                  },
                });
              }}
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <Text style={styles.boxText}>{item.province}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <HorizontalList
          title={
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons
                name="local-fire-department"
                size={24}
                color={"#ff0000c7"}
              />
              <Text style={{ fontSize: 18, fontWeight: "bold", marginLeft: 5 }}>
                Hot
              </Text>
            </View>
          }
          type={-1}
          data={list}
          date={{ fromDate: dates.fromDate, toDate: dates.toDate }}
          loading={generalLoading}
        />

        <HorizontalList
          title={<Text style={styles.listTitle}>Khách sạn</Text>}
          type={0}
          data={hotels}
          date={{ fromDate: dates.fromDate, toDate: dates.toDate }}
          loading={hotelLoading}
        />

        <HorizontalList
          title={<Text style={styles.listTitle}>HomeStay</Text>}
          type={1}
          data={homestay}
          date={{ fromDate: dates.fromDate, toDate: dates.toDate }}
          loading={homestayLoading}
        />

        <HorizontalList
          title={<Text style={styles.listTitle}>Villa</Text>}
          type={2}
          data={villa}
          date={{ fromDate: dates.fromDate, toDate: dates.toDate }}
          loading={villaLoading}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white", padding: 5 },
  listContent: { paddingBottom: 35 },
  boxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  box: {
    width: "32%",
    height: 150,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
  },
  boxRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  box_img: {
    width: "49%",
    height: 150,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 5,
  },
  image: { width: "100%", height: "100%", resizeMode: "cover" },
  boxText: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.24)",
  },
  listTitle: { fontSize: 18, fontWeight: "bold", marginLeft: 5 },
});

export default HomeScreen;
