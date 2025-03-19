import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import AccommodationCard from "../card/AccommodationCard";
import Loading from "../loading/Loading";
import { useRouter } from "expo-router"; 
import { FlashList } from "@shopify/flash-list";

const CustomList = ({ data, loading, onEndReached, date, hasMore }) => {
  const router = useRouter(); 

  const renderItem = ({ item }) => (
    <AccommodationCard
      accommodation={item}
      onPress={() => 
        router.push({
          pathname: "/detail",
          params: { id: item.id, date: date },
        })
      } 
    />
  );

  const keyExtractor = (item) => item.id.toString();

  const handleEndReached = useCallback(() => {
    if (!loading && hasMore) {
      onEndReached(); 
    }
  }, [loading, hasMore, onEndReached]);

  if (loading && data.length === 0) return <Loading />;

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={loading && <Loading />}
        onEndReached={handleEndReached} 
        onEndReachedThreshold={0.9} 
        estimatedItemSize={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  listContent: {
    paddingBottom: 30,
  },
  footer: {
    height: 35,
  },
  separator: {
    height: 2,
  },
});

export default CustomList;
