import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Text,
} from "react-native";
import LocationMap from "./LocationMap";

const LocationMapWithThumbnail = ({ latitude, longitude }) => {
  const [showFullMap, setShowFullMap] = useState(false);

  const toggleMap = () => {
    setShowFullMap(!showFullMap);
  };

  return (
    <View style={styles.container}>
      {!showFullMap ? (
        <TouchableOpacity onPress={toggleMap}>
          <Image
            source={{
              uri: "https://res.cloudinary.com/dqipg0or3/image/upload/v1733261088/avatars/vponkkjvkgwq2byu5ehi.png",
            }}
            style={styles.thumbnail}
          />
        </TouchableOpacity>
      ) : (
        <Modal
          visible={showFullMap}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleMap}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              {/* Nút đóng X */}
              <TouchableOpacity style={styles.closeButton} onPress={toggleMap}>
                <Image
                  source={{
                    uri: "https://res.cloudinary.com/dqipg0or3/image/upload/v1733262958/avatars/vjlghbuynuhtinnr6jxl.png",
                  }}
                  style={styles.closeIcon}
                />
              </TouchableOpacity>
              {/* Bản đồ */}
              <LocationMap latitude={latitude} longitude={longitude} />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  thumbnail: {
    width: 40,
    height: 40,
    borderRadius: 10,
  },
  modalBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: "90%",
    height: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "white",
    borderRadius: 50,

    zIndex: 10,
  },
  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
});

export default LocationMapWithThumbnail;
