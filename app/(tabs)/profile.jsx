import React, {useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useProfile from "../../hooks/profile/ProfileModal";
import FormatUtils from "../../utils/format/Format";
import ChangePasswordModal from "../../components/ui/profile/ChangePasswordModal";
import VerificationModal from "../../components/ui/profile/VerificationModal";
import UpdateProfileModal from "../../components/ui/profile/UpdateProfileModal";
import { router } from "expo-router";

const Profile = () => {
  const {
    profile,
    loading,
    avatarUrl,
    showChangePasswordModal,
    setShowChangePasswordModal,
    showVerificationModal,
    setShowVerificationModal,
    showUpdateModal,
    setShowUpdateModal,
    handleLogout,
    pickImage,
    handleClickResend,
  } = useProfile();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Đang tải thông tin...</Text>
      </View>
    );
  }

  if (!profile) {
    return null; 
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Thông tin cá nhân</Text>
        </View>

        <View style={styles.groupContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.label}>Ảnh đại diện</Text>
            <View style={styles.avatarRow}>
              <Image
                source={{ uri: avatarUrl || profile.avatar }}
                style={styles.avatar}
              />
              <TouchableOpacity onPress={pickImage} style={styles.uploadButton}>
                <Ionicons name="cloud-upload" size={20} color="white" />
                <Text style={styles.uploadText}>Tải lên</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Họ và tên</Text>
            <Text style={styles.input}>{profile.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Giới tính</Text>
            <Text style={styles.input}>
              {profile.gender === 0
                ? "Nam"
                : profile.gender === 1
                ? "Nữ"
                : "Khác"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Ngày sinh</Text>
            <Text style={styles.input}>
              {profile.dateOfBirth || "Không có thông tin"}
            </Text>
          </View>
          <View style={[styles.row]}>
            <View style={styles.dateGroup}>
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Ngày tạo</Text>
                <Text style={styles.input}>
                  {profile.createdAt
                    ? FormatUtils.formatDateYear(profile.createdAt)
                    : "Không có thông tin"}
                </Text>
              </View>
              <View style={styles.dateContainer}>
                <Text style={styles.label}>Ngày cập nhật</Text>
                <Text style={styles.input}>
                  {profile.updatedAt
                    ? FormatUtils.formatDateYear(profile.updatedAt)
                    : "Không có thông tin"}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Xác thực tài khoản</Text>
            <Text
              style={[
                styles.unverifiedText,
                {
                  textAlign: "center",
                  color: profile.isVerified ? "green" : "red",
                },
              ]}
            >
              {profile.isVerified ? "Đã bảo mật" : "Tài khoản chưa xác thực"}
            </Text>
            <TouchableOpacity
              style={[
                styles.authButton,
                { backgroundColor: profile.isVerified ? "#007BFF" : "#DC3545" },
              ]}
              onPress={async () => {
                if (profile.isVerified) {
                  setShowChangePasswordModal(true);
                } else {
                  await handleClickResend(profile.email);
                  setShowVerificationModal(true);
                }
              }}
            >
              <Text style={styles.authButtonText}>
                {profile.isVerified ? "Đổi mật khẩu" : "Xác thực ngay"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.groupContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Số điện thoại</Text>
            <Text style={styles.input}>
              {profile.phone || "Không có thông tin"}
            </Text>
          </View>
        </View>

        <View style={styles.groupContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.input}>
              {profile.email || "Không có thông tin"}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setShowUpdateModal(true)}
        >
          <Text style={styles.editButtonText}>Chỉnh sửa thông tin</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Đăng xuất</Text>
        </TouchableOpacity>

        <ChangePasswordModal
          visible={showChangePasswordModal}
          onClose={() => setShowChangePasswordModal(false)}
        />
        <VerificationModal
          visible={showVerificationModal}
          onClose={() => setShowVerificationModal(false)}
        />
        <UpdateProfileModal
          visible={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          avatarUrl={avatarUrl ? avatarUrl : profile.avatar}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 10,
    paddingBottom: 35,
  },
  headerContainer: {
    width: "100%",
    paddingVertical: 5,
    alignItems: "flex-start",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  avatarContainer: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#375e97",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginBottom: 20,
    marginLeft: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  uploadText: {
    color: "white",
    fontSize: 16,
    marginLeft: 8,
  },
  groupContainer: {
    width: "100%",
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  row: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
    fontSize: 16,
    color: "#333",
  },
  dateGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  dateContainer: {
    width: "48%",
  },
  editButton: {
    width: "100%",
    backgroundColor: "#007BFF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  editButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "white",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DC3545",
  },
  logoutButtonText: {
    color: "#DC3545",
    fontSize: 16,
    fontWeight: "bold",
  },
  authButton: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  authButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  unverifiedText: {
    marginBottom: 15,
    marginTop: 10,
    fontSize: 16,
    backgroundColor: "transparent",
  },
});

export default Profile;
