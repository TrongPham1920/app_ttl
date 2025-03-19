import React from "react";
import { StyleSheet, View } from "react-native";
import OrderCard from "../card/OrderCard";
import Loading from "../loading/Loading";
import { useRouter } from "expo-router";
import { FlashList } from "@shopify/flash-list";

const OrderList = ({ data, loading, onEndReached }) => {
  const router = useRouter(); 

  const renderItem = ({ item }) => (
    <OrderCard
      item={item}
      onPress={() => router.push({pathname:"/orderdetail", params:{id: item.id}})} 
    />
  );

  const keyExtractor = (item) => item.id.toString();

  if (loading) return <Loading />;

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListFooterComponent={<View style={styles.footer} />}
        onEndReached={onEndReached}
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

export default OrderList;
