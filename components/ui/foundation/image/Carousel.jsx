import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import ImageViewer from "react-native-image-zoom-viewer";
import { LinkingContext } from "@react-navigation/native";
const SimpleCarousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + data.length) % data.length);
  };

  // Hàm mở Modal
  const openModal = (index) => {
    setCurrentIndex(index);
    setModalVisible(true);
  };

  // Hàm đóng Modal
  const closeModal = () => {
    setModalVisible(false);
  };

  const imageUrls = useMemo(() => {
    return data.map((url) => ({ url }));
  }, [data]);

  return (
    <View style={styles.carouselContainer}>
      <TouchableOpacity
        style={[styles.navButton, { left: 10 }]}
        onPress={prevSlide}
      >
        <AntDesign name="left" size={24} color="white" />
      </TouchableOpacity>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => openModal(currentIndex)}>
          <Image
            source={{ uri: data[currentIndex] }}
            style={styles.image}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentIndex && styles.activeDot]}
          />
        ))}
      </View>

      <TouchableOpacity
        style={[styles.navButton, { right: 10 }]}
        onPress={nextSlide}
      >
        <AntDesign name="right" size={24} color="white" />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <ImageViewer
          imageUrls={imageUrls}
          onChange={(index) => setCurrentIndex(index)}
          index={currentIndex}
          onSwipeDown={closeModal}
          enableSwipeDown={true}
          renderImage={(props) => {
            return (
              <Image
                {...props}
                style={[styles.imageViewer, { width: "100%", height: "250" }]}
                resizeMode="stretch"
              />
            );
          }}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  imageContainer: {
    width: "100%",
    height: 250,
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  navButton: {
    position: "absolute",
    top: "45%",
    backgroundColor: "transparent",
    borderRadius: 20,
    padding: 2,
    zIndex: 1,
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 5,
    margin: 5,
  },
  activeDot: {
    backgroundColor: "white",
  },
  modalOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  imageViewer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SimpleCarousel;
