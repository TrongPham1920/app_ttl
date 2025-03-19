import { Stack } from "expo-router";
import Header from "../../components/ui/layout/Header";

export default function FindLayout() {
  return (
    <Stack screenOptions={{headerShown: true, header: ()=><Header/>, gestureEnabled: true, gestureDirection: "horizontal"}}>
      <Stack.Screen name="find"/>
      <Stack.Screen name="detail"/>
      <Stack.Screen name="payment"/>
      <Stack.Screen name="listroom"/>
    </Stack>
  );
}
