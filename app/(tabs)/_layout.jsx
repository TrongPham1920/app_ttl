import { Tabs, usePathname } from "expo-router";
import {
  AntDesign,
  FontAwesome,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import Header from "../../components/ui/layout/Header";

export default function Layout() {
  const pathname = usePathname();

  // Danh sách các trang không hiển thị tab bar
  const hideTabBarRoutes = ["/(tabs)/orderdetail", "/(tabs)/payment"];
  const shouldShowTabBar = !hideTabBarRoutes.includes(pathname);

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        header: () => <Header />,
        headerStyle: {
          backgroundColor: "#fff",
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTransparent: false,
        tabBarStyle: {
          display: shouldShowTabBar ? "flex" : "none",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
      />

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
