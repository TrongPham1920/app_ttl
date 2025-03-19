import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Linking } from "react-native";

const LocationMap = ({ latitude, longitude }) => {
  const [region, setRegion] = useState({
    latitude: latitude || 37.33,
    longitude: longitude || -122,
    latitudeDelta: 0.11,
    longitudeDelta: 0.11,
  });

  useEffect(() => {
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.11,
      longitudeDelta: 0.11,
    });
  }, [latitude, longitude]);

  const openGoogleMaps = () => {
    const url = `google.maps://?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(() => {
      const webUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
      Linking.openURL(webUrl);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker coordinate={{ latitude, longitude }}>
          <TouchableOpacity onPress={openGoogleMaps}>
            <Ionicons name="location" size={36} color="blue" />
          </TouchableOpacity>
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  map: {
    flex: 1,
  },
});

export default LocationMap;
