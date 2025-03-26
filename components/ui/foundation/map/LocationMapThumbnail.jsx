import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import LocationMap from "./LocationMap"; 

const LocationMapWithThumbnail = ({ latitude, longitude }) => {
  const [showFullMap, setShowFullMap] = useState(false);

  const toggleMap = () => {
    setShowFullMap(!showFullMap);
  };

  const closeModal = () => {
    setShowFullMap(false);
  };

  return (
    <View style={styles.container}>
      
      <TouchableOpacity onPress={toggleMap}>
        <Text style={styles.viewLocationText}>Xem bản đồ</Text>
      </TouchableOpacity>

      
      <Modal
        visible={showFullMap}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                {/* Close button */}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={closeModal}
                >
                  <Image
                    source={{
                      uri: "https://res.cloudinary.com/dqipg0or3/image/upload/v1742460482/avatars/ypfytx9gwjqvxgygi3jf.png",
                    }}
                    style={styles.closeIcon}
                  />
                </TouchableOpacity>
                {/* Location map */}
                {latitude && longitude ? (
                  <LocationMap latitude={latitude} longitude={longitude} />
                ) : (
                  <Text style={styles.noLocationText}>Vị trí không có sẵn</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  viewLocationText: {
    fontSize: 14,
    color: "#cdcbcb",
    fontStyle: "italic",
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
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 50,
    zIndex: 10,
  },
  closeIcon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  noLocationText: {
    textAlign: "center",
    fontSize: 18,
    color: "#999",
    marginTop: 20,
  },
});

export default LocationMapWithThumbnail;
