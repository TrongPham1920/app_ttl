import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import { AuthProvider } from "../global/AuthenticationContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Slot />
      <Toast />
    </AuthProvider>
  );
}
