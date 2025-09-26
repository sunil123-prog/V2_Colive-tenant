import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity,
  Alert,
  Modal,
  Text,
  ImageBackground,
} from "react-native";
import React, { useState } from "react";
import AppSafeView from "../../views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-path";
import { vs, s } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppText from "../../components/texts/AppText";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASEURL } from "../../constants/url";
import { setUser } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.auth.user);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [okDisabled, setOkDisabled] = useState(true);

  // // --- Types for navigation ---
  // type RootStackParamList = {
  //   AuthStack: undefined;
  //   MainAppBottomTabs: undefined;
  //   SignUpScreen: undefined;
  // };

  // type SignInScreenNavigationProp = StackNavigationProp<
  //   RootStackParamList,
  //   "AuthStack"
  // >;
  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  // Validation Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!signIn.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signIn.email))
      newErrors.email = "Enter a valid email";

    if (!signIn.password) newErrors.password = "Password is required";
    else if (signIn.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
    console.log("Login pressed with:", signIn);

    try {
      const response = await axios.post(`${BASEURL}9491/api/v1/tenants/login`, {
        email: signIn.email,
        password: signIn.password,
      });

      if (response.status === 200) {
        const data = response.data;
        const { token, ...user } = data;

        if (!token || !user) {
          Alert.alert("Login failed", "Invalid response from server.");
          return;
        }

        await AsyncStorage.setItem("authToken", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));

        dispatch(setUser({ user, token }));
        // Alert.alert("Success", "Logged in successfully!");

        // Show success modal
        setLoginModalVisible(true);
        setOkDisabled(true);

        // Enable button after 5 sec
        setTimeout(() => {
          setOkDisabled(false);
        }, 2000);

        console.log("Login success:", user);
        navigation.navigate("MainAppBottomTabs");
      } else {
        Alert.alert("Login failed", "Please check your credentials.");
      }
    } catch (error: any) {
      console.error("Login error:", error.response?.data || error.message);
      Alert.alert(
        "Login failed",
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleSignUp = () => {
    navigation.navigate("SignUpScreen");
    console.log("SignUp pressed");
  };

  return (
    <ImageBackground
      source={IMAGES.loginBg}
      resizeMode="cover"
      style={styles.background}
    >
      <AppSafeView style={styles.contentWrapper}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <Image source={IMAGES.appLogo} style={styles.logo} />
          <AppText style={styles.appName}>Welcome to V2 Colive</AppText>
        </View>

        {/* Form Section */}
        <View style={styles.bottomSection}>
          <AppTextInput
            placeholder="Email"
            value={signIn.email}
            onChangeText={(text) =>
              setSignIn({ ...signIn, email: text.toLowerCase() })
            }
            keyboardType="email-address"
          />

          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <AppTextInput
            placeholder="Password"
            value={signIn.password}
            onChangeText={(text) => setSignIn({ ...signIn, password: text })}
            secureTextEntry
          />

          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {/* Forgot Password */}
          <TouchableOpacity
            onPress={() => console.log("Forgot Password pressed")}
            style={styles.forgotContainer}
          >
            <AppText style={styles.forgotText}>Forgot Password?</AppText>
          </TouchableOpacity>

          {/* Login Button */}
          <AppButton
            title="Login"
            onPress={handleLogin}
            style={styles.loginButton}
          />

          {/* Sign Up */}
          <View style={styles.signUpContainer}>
            <AppText style={styles.noAccountText}>New user?</AppText>
            <TouchableOpacity onPress={handleSignUp}>
              <AppText style={styles.registerText}> Register</AppText>
            </TouchableOpacity>
          </View>
        </View>
        <Modal
          transparent
          animationType="fade"
          visible={loginModalVisible}
          onRequestClose={() => setLoginModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalBox}>
              <AppText style={styles.modalText}>Login successful!</AppText>

              <AppButton
                title={okDisabled ? "Please wait..." : "OK"}
                onPress={() => {
                  setLoginModalVisible(false);
                  navigation.navigate("MainAppBottomTabs");
                }}
                style={[styles.modalButton]}
                textColor={AppColors.blue}
                disabled={okDisabled}
              />
            </View>
          </View>
        </Modal>
      </AppSafeView>
    </ImageBackground>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  errorText: {
    color: "red",
    fontSize: s(12),
    marginLeft: 10,
  },

  contentWrapper: {
    flex: 1,
    paddingHorizontal: sharedPaddingHorizontal,
    justifyContent: "space-between",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: vs(40),
  },
  logo: {
    height: s(200),
    width: s(200),
    marginBottom: vs(16),
    resizeMode: "contain",
  },
  appName: {
    fontSize: s(22),
    fontWeight: "700",
    color: AppColors.primary,
    letterSpacing: 0.5,
  },
  bottomSection: {
    paddingBottom: vs(30),
    gap: vs(14),
  },
  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: vs(12),
  },
  forgotText: {
    color: AppColors.primary,
    fontSize: s(14),
    fontWeight: "500",
  },
  loginButton: {
    marginBottom: vs(18),
    backgroundColor: AppColors.blue,
    height: vs(30),
    borderRadius: s(25),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonText: {
    color: AppColors.white,
    fontSize: s(16),
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: vs(10),
  },
  noAccountText: {
    fontSize: s(14),
    color: AppColors.medGray,
  },
  registerText: {
    fontSize: s(14),
    color: AppColors.primary,
    fontWeight: "700",
    marginLeft: s(6),
  },
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
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: s(16),
    fontWeight: "600",
    color: AppColors.white,
    marginBottom: vs(12),
  },
  modalButton: {
    backgroundColor: AppColors.white,
    height: vs(40),
    width: s(120),
    borderRadius: s(20),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
});
