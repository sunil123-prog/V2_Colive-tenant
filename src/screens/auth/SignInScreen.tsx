import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
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

const SignInScreen = () => {
  const navigation = useNavigation();

  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    console.log("Login pressed with:", signIn);
    navigation.navigate("MainAppBottomTabs")
  };

  const handleSignUp = () => {
    navigation.navigate("SignUpScreen")
    console.log("SignUp pressed");
  };

  return (
    <AppSafeView style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Image source={IMAGES.appLogo} style={styles.logo} />
        <AppText style={styles.appName}>Welcome to V2 Colive</AppText>
      </View>

      {/* Bottom Form Section */}
      <View style={styles.bottomSection}>
        <AppTextInput
          placeholder="Email"
          value={signIn.email}
          onChangeText={(text) => setSignIn({ ...signIn, email: text })}
          keyboardType="email-address"
        />

        <AppTextInput
          placeholder="Password"
          value={signIn.password}
          onChangeText={(text) => setSignIn({ ...signIn, password: text })}
          secureTextEntry
        />

        {/* Forgot Password */}
        <TouchableOpacity
          onPress={() => console.log("Forgot Password pressed")}
          style={styles.forgotContainer}
        >
          <AppText style={styles.forgotText}>Forgot Password?</AppText>
        </TouchableOpacity>

        {/* Login Button */}
        <AppButton title="Login" onPress={handleLogin} style={styles.loginButton} />

        {/* Sign Up */}
        <View style={styles.signUpContainer}>
          <AppText style={styles.noAccountText}>New user?</AppText>
          <TouchableOpacity onPress={handleSignUp}>
            <AppText style={styles.registerText}> Register</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </AppSafeView>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: sharedPaddingHorizontal,
    justifyContent: "space-between",
    backgroundColor: AppColors.white,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: vs(40),
  },
  logo: {
    height: s(350),
    width: s(350),
    marginBottom: vs(20),
  },
  appName: {
    fontSize: 22,
    fontWeight: "700",
    color: AppColors.primary,
  },

  bottomSection: {
    paddingBottom: vs(30),
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: vs(10),
  },
  forgotText: {
    color: AppColors.primary,
    fontSize: 14,
  },

  loginButton: {
    marginBottom: vs(15),
  },

  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  noAccountText: {
    fontSize: 14,
    color: AppColors.medGray,
  },
  registerText: {
    fontSize: 14,
    color: AppColors.primary,
    fontWeight: "600",
  },
});
