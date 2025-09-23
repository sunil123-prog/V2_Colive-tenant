import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import AppSafeView from "../../views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-path";
import { vs, s } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    fullName: "",
    fathersName: "",
    age: "",
    dateOfBirth: "",
    bloodGroup: "",
    roomNo: "",
    phone: "",
    email: "",
    dateOfJoining: "",
    rentPerMonth: "",
    educationQualification: "",
    employmentIn: "",
    officeAddress: "",
    permanentAddress: "",
    aadharFile: null as DocumentPicker.DocumentResult | null,
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handlePickAadhar = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
      if (result.type === "success") {
        setForm({ ...form, aadharFile: result });
      }
    } catch (err) {
      console.log("Error picking file: ", err);
    }
  };

  const handleregister = () => {
    console.log(form);
    // Call API here
  };

  return (
    <AppSafeView style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <AppTextInput
          placeholder="Full Name"
          value={form.fullName}
          onChangeText={(text) => handleChange("fullName", text)}
          style={styles.input}
        />
        <AppTextInput
          placeholder="Fathers Name"
          value={form.fathersName}
          onChangeText={(text) => handleChange("fathersName", text)}
        />
        <AppTextInput
          placeholder="Age"
          value={form.age}
          keyboardType="numeric"
          onChangeText={(text) => handleChange("age", text)}
        />
        <AppTextInput
          placeholder="Date of Birth (DD/MM/YYYY)"
          value={form.dateOfBirth}
          onChangeText={(text) => handleChange("dateOfBirth", text)}
        />
        <AppTextInput
          placeholder="Blood Group"
          value={form.bloodGroup}
          onChangeText={(text) => handleChange("bloodGroup", text)}
        />
        <AppTextInput
          placeholder="Mobile"
          value={form.phone}
          keyboardType="phone-pad"
          onChangeText={(text) => handleChange("phone", text)}
        />
        <AppTextInput
          placeholder="Email"
          value={form.email}
          keyboardType="email-address"
          onChangeText={(text) => handleChange("email", text)}
        />
        <AppTextInput
          placeholder="Date of Joining"
          value={form.dateOfJoining}
          onChangeText={(text) => handleChange("dateOfJoining", text)}
        />
        <AppTextInput
          placeholder="Rent Per Month"
          value={form.rentPerMonth}
          keyboardType="decimal-pad"
          onChangeText={(text) => handleChange("rentPerMonth", text)}
        />
        <AppTextInput
          placeholder="Employment In"
          value={form.employmentIn}
          onChangeText={(text) => handleChange("employmentIn", text)}
        />
        <AppTextInput
          placeholder="Education Qualification"
          value={form.educationQualification}
          onChangeText={(text) => handleChange("educationQualification", text)}
        />
        <AppTextInput
          placeholder="Office Address"
          value={form.officeAddress}
          onChangeText={(text) => handleChange("officeAddress", text)}
        />
        <AppTextInput
          placeholder="Permanent Address"
          value={form.permanentAddress}
          onChangeText={(text) => handleChange("permanentAddress", text)}
        />

        {/* Aadhar File Upload */}
        <TouchableOpacity
          style={styles.fileUploadButton}
          onPress={handlePickAadhar}
        >
          <Text style={{ color: AppColors.white }}>
            {form.aadharFile
              ? `Aadhar: ${form.aadharFile.name}`
              : "Upload Aadhar"}
          </Text>
        </TouchableOpacity>

        <AppTextInput
          placeholder="Password"
          value={form.password}
          onChangeText={(text) => handleChange("password", text)}
          secureTextEntry
        />
        <AppTextInput
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChangeText={(text) => handleChange("confirmPassword", text)}
          secureTextEntry
        />

        <AppButton title="Register" onPress={handleregister} />
        <TouchableOpacity
          style={styles.loginLinkContainer}
          onPress={() => {
            // Navigate to Login screen
            navigation.navigate("SignInScreen")
            console.log("Go to Login screen");
          }}
        >
          <Text style={styles.loginLinkText}>
            Already have an account?{" "}
            <Text style={styles.loginLinkHighlight}>Login</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </AppSafeView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: { width: s(250), height: s(250), marginBottom: vs(30) },
  formContainer: { paddingBottom: vs(40) },
  fileUploadButton: {
    width: "100%",
    height: vs(50),
    backgroundColor: AppColors.primary,
    borderRadius: s(25),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: vs(10),
  },
  loginLinkContainer: {
    marginTop: vs(15),
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: s(14),
    color: AppColors.black,
  },
  loginLinkHighlight: {
    color: AppColors.primary,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: vs(10),
  },
});
