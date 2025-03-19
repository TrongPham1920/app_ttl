import { Tabs } from "expo-router";
import { AntDesign, FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "../../components/ui/layout/Header";

export default function Layout() {
  return (
    <Tabs screenOptions={{ headerShown: true, header: ()=><Header/> }}>

      <Tabs.Screen
        name="hot"
        options={{
          title: "Hot",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flame" size={size} color={color} /> 
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: "Tìm Kiếm",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="search" size={size} color={color} />
          ),
        }}
      />
   
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: "Đơn đặt", 
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="hotel" size={size} color={color} /> 
          ),
        }}
      />
    
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen name="orderdetail" options={{ href: null }} />
    </Tabs>
  );
}
