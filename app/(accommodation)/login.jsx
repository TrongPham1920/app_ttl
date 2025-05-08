import React from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "../../hooks/login/LoginModal";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { isLoading, handleLogin } = useLogin();
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/backgroundLogin.jpg")}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Đăng nhập</Text>

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Email/ số điện thoại"
              onChangeText={onChange}
              value={value}
            />
          )}
          name="Identifier"
          rules={{ required: "Hãy nhập Email/ số điện thoại" }}
          defaultValue=""
        />
        {errors.Identifier && (
          <Text style={styles.errorText}>{errors.Identifier.message}</Text>
        )}

        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Mật khẩu"
              secureTextEntry
              onChangeText={onChange}
              value={value}
            />
          )}
          name="password"
          rules={{ required: "Hãy nhập mật khẩu" }}
          defaultValue=""
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <TouchableOpacity onPress={() => router.push("/receiveCode")}>
          <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
        </TouchableOpacity>

        <Button
          title={isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
          onPress={handleSubmit((data) => handleLogin(data, reset))}
          disabled={isLoading}
        />

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
          <TouchableOpacity onPress={() => router.replace("/register")}>
            <Text style={styles.registerLink}>Đăng ký ngay</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => router.replace("/")}
          style={styles.backToHome}
        >
          <Text style={styles.backToHomeText}>Quay về Trang Chủ</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  formContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    color: "black",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: "white",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
    color: "#000",
  },
  registerLink: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#007BFF",
    textAlign: "right",
    marginBottom: 10,
  },
  backToHome: {
    marginTop: 20,
    alignItems: "center",
  },
  backToHomeText: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
  },
});

export default LoginScreen;
