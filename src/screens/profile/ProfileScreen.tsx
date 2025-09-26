import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  Image,
  Animated,
  Modal,
} from "react-native";
import AppSafeView from "../../views/AppSafeView";
import AppText from "../../components/texts/AppText";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { vs, s } from "react-native-size-matters";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { fetchProfile, setProfileField } from "../../store/slices/profileSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BASEURL } from "../../constants/url";
import { logout } from "../../store/slices/authSlice";

interface ProfileFormData {
  fullName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
}



const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const profile = useSelector((state: RootState) => state.profile);
  const [tenantId, setTenantId] = useState<number | null>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [okDisabled, setOkDisabled] = useState(true);

  const [formData, setFormData] = useState<ProfileFormData>({
    fullName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Fade-in animation
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Load tenantId from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setTenantId(parsedUser?.tenantId || null);
          if (parsedUser.profilePic) setPhotoUri(parsedUser.profilePic);
        }
      } catch (err) {
        console.error("Error loading user from AsyncStorage:", err);
      }
    };
    loadUser();
  }, []);

  // Fetch profile from backend
  useEffect(() => {
    if (tenantId) dispatch(fetchProfile(tenantId));
  }, [dispatch, tenantId]);

  // Populate form when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        fullName: profile.fullName || "",
        email: profile.email || "",
        mobile: profile.mobile || "",
        password: "",
        confirmPassword: "",
      });
      if (profile.profilePic) setPhotoUri(profile.profilePic);
    }
  }, [profile]);

  const handleChange = (key: keyof ProfileFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));

    // Only dispatch fields that exist in Redux
    const allowedKeys: Array<keyof typeof profile> = [
      "fullName",
      "email",
      "mobile",
      "profilePic",
    ];
    if (allowedKeys.includes(key as keyof typeof profile)) {
      dispatch(setProfileField({ key: key as keyof typeof profile, value }));
    }
  };

  const handleSubmit = async () => {
    if (formData.password && formData.password !== formData.confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }

    if (!tenantId) {
      Alert.alert("Error", "Tenant ID not found.");
      return;
    }

    const payload: any = {
      fullName: formData.fullName,
      profilePic: photoUri,
    };

    if (formData.password) {
      payload.password = formData.password;
      payload.confirmPassword = formData.confirmPassword;
    }

    try {
      const res = await fetch(`${BASEURL}9491/api/v1/tenants/${tenantId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const updatedProfile = await res.json();
      dispatch(
        setProfileField({ key: "fullName", value: updatedProfile.fullName })
      );
      await AsyncStorage.setItem("user", JSON.stringify(updatedProfile));

      Alert.alert("Success", "Profile updated successfully!");
      navigation.navigate("Home");
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.message || "Failed to update profile.");
    }
  };

  const isUpdateDisabled =
    !formData.password ||
    !formData.confirmPassword ||
    formData.password !== formData.confirmPassword;

  // Handle logout
  const handleLogout = () => {
    dispatch(logout());
    setLogoutModalVisible(true);
    setOkDisabled(true);

    // Enable OK button after 5 seconds
    setTimeout(() => setOkDisabled(false), 2000);
  };

  return (
    <AppSafeView style={styles.container}>
      <Modal
        transparent={true}
        visible={logoutModalVisible}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <AppText style={styles.modalText}>Logout successfully!</AppText>

            <AppButton
              title={okDisabled ? "Please wait..." : "OK"}
              onPress={() => {
                setLogoutModalVisible(false);
                navigation.navigate("SignInScreen");
              }}
              style={styles.modalButton}
              textColor={AppColors.blue}
              disabled={okDisabled}
            />
          </View>
        </View>
      </Modal>

      <ScrollView contentContainerStyle={styles.content}>
        <Animated.View style={[styles.headerContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.profilePicContainer}>
            {photoUri ? (
              <Image source={{ uri: photoUri }} style={styles.profilePic} />
            ) : (
              <AppText style={styles.profileEmoji}>📝</AppText>
            )}
          </TouchableOpacity>
          <AppText style={styles.header}>👤 Profile</AppText>
        </Animated.View>

        <AppTextInput
          placeholder="Full Name"
          value={formData.fullName}
          onChangeText={(text) => handleChange("fullName", text)}
          style={styles.input}
          editable={false}
        />

        <AppTextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => handleChange("email", text)}
          style={styles.input}
          editable={false}
        />
        <AppTextInput
          placeholder="Mobile"
          value={formData.mobile}
          onChangeText={(text) => handleChange("mobile", text)}
          style={styles.input}
          editable={false}
        />

        {!showPasswordFields ? (
          <AppButton
            title="🔑 Change Password"
            onPress={() => setShowPasswordFields(true)}
            style={[styles.fullButton, styles.updateButton]}
          />
        ) : (
          <>
            <AppTextInput
              placeholder="New Password"
              value={formData.password}
              onChangeText={(text) => handleChange("password", text)}
              style={styles.input}
              secureTextEntry
            />
            <AppTextInput
              placeholder="Confirm New Password"
              value={formData.confirmPassword}
              onChangeText={(text) => handleChange("confirmPassword", text)}
              style={styles.input}
              secureTextEntry
            />

            <View style={styles.buttonRow}>
              <AppButton
                title="Cancel"
                onPress={() => {
                  setShowPasswordFields(false);
                  setFormData((prev) => ({
                    ...prev,
                    password: "",
                    confirmPassword: "",
                  }));
                }}
                style={[styles.button, styles.backButton]}
              />

              <AppButton
                title="Update Password"
                onPress={handleSubmit}
                style={[styles.button, styles.updateButton]}
                disabled={isUpdateDisabled}
              />
            </View>
          </>
        )}

        <View style={styles.buttonRow}>
          <AppButton
            title="⬅ Go Back"
            onPress={() => navigation.navigate("Home")}
            style={[styles.fullButton, styles.backButton]}
          />
        </View>
        <View style={styles.buttonRow}>
          <AppButton
            title="Logout"
            onPress={handleLogout}
            style={styles.logOutButton}
          />
        </View>
      </ScrollView>
    </AppSafeView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: AppColors.white },
  content: { padding: s(16), alignItems: "center" },
  headerContainer: { alignItems: "center", marginBottom: vs(20) },
  profilePicContainer: {
    backgroundColor: AppColors.lightGray,
    width: s(100),
    height: s(100),
    borderRadius: s(50),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: vs(12),
    overflow: "hidden",
  },
  profileEmoji: { fontSize: s(50) },
  profilePic: { width: "100%", height: "100%" },
  header: { fontSize: s(22), fontWeight: "700", color: AppColors.primary },
  input: { width: "100%", marginBottom: vs(12) },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: vs(20),
  },
  button: {
    flex: 0.48,
    height: vs(50),
    borderRadius: s(25),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: AppColors.red,
  },
  fullButton: {
    width: "100%",
    height: vs(50),
    borderRadius: s(25),
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(12),
  },
  backButton: { backgroundColor: AppColors.blue, height: vs(30) },
  updateButton: { backgroundColor: AppColors.blue, height: vs(30) },
  logOutButton: { backgroundColor: AppColors.red },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    backgroundColor: AppColors.blue,
    padding: vs(20),
    borderRadius: s(12),
    alignItems: "center",
  },
  modalText: {
    color: AppColors.white,
    fontSize: s(16),
    marginBottom: vs(16),
  },
  modalButton: {
    backgroundColor: AppColors.white,
    height: vs(40),
    width: s(120),
    borderRadius: s(20),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: vs(10),
  },
  modalButtonText: {
    color: AppColors.blue,
    fontWeight: "700",
    fontSize: s(16),
  },
});
