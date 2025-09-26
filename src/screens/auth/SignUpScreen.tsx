import {
  StyleSheet,
  Image,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Alert,
  ImageBackground,
  Platform,
} from "react-native";
import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AppSafeView from "../../views/AppSafeView";
import { sharedPaddingHorizontal } from "../../styles/sharedStyles";
import { IMAGES } from "../../constants/images-path";
import { vs, s } from "react-native-size-matters";
import AppTextInput from "../../components/inputs/AppTextInput";
import AppButton from "../../components/buttons/AppButton";
import { AppColors } from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASEURL } from "../../constants/url";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [form, setForm] = useState({
    fullName: "",
    fathersName: "",
    age: "",
    dateOfBirth: "",
    bloodGroup: "",
    // roomNo: "",
    mobile: "",
    email: "",
    dateOfJoining: "",
    // rentPerMonth: "",
    educationQualification: "",
    employmentIn: "",
    officeAddress: "",
    permanentAddress: "",
    aadharFile: null as DocumentPicker.DocumentResult | null,
    password: "",
    confirmPassword: "",
  });

  const [showPicker, setShowPicker] = useState<{
    field: string | null;
    visible: boolean;
  }>({ field: null, visible: false });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (event.type === "set" && selectedDate && showPicker.field) {
      // User picked a date
      const formatted = selectedDate.toLocaleDateString("en-GB"); // DD/MM/YYYY
      handleChange(showPicker.field, formatted);
    }
    // Close after action (cancel or confirm)
    setShowPicker({ field: null, visible: false });
  };

  const validateForm = () => {
    let newErrors: { [key: string]: string } = {};

    if (!form.fullName) newErrors.fullName = "Full name is required";
    if (!form.fathersName) newErrors.fathersName = "Father's name is required";
    if (!form.age) newErrors.age = "Age is required";
    if (!form.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!form.bloodGroup) newErrors.bloodGroup = "Blood group is required";
    if (!form.mobile) newErrors.mobile = "Mobile number is required";
    else if (form.mobile.length < 10)
      newErrors.mobile = "Enter a valid mobile number";

    if (!form.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Enter a valid email";
        if (!form.employmentIn) newErrors.employmentIn = "Employment In is required";

        if (!form.officeAddress) newErrors.officeAddress = "Office Address is required";
        if (!form.permanentAddress) newErrors.permanentAddress = "Permanent Address is required";
        if (!form.educationQualification) newErrors.educationQualification = "Education Qualification is required";
        if (!form.confirmPassword) newErrors.confirmPassword = "Confirm Password is required";
        if (!form.aadharFile) newErrors.aadharFile = "Aadhar File is required";



        

    if (!form.dateOfJoining)
      newErrors.dateOfJoining = "Date of Joining is required";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
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

  const handleregister = async () => {
    if (!validateForm()) return;
    try {
      const payload = { ...form };

      const response = await axios.post(
        `${BASEURL}9491/api/v1/tenants`,
        payload
      );

      if (response.status === 200) {
        Alert.alert("Success", "Registered successfully!", [
          {
            text: "OK",
            onPress: () => navigation.navigate("TermsScreen"),
          },
        ]);
      } else {
        Alert.alert("Registration Failed", "Please try again");
      }
    } catch (error) {
      console.log("Register Error: ", error);
      Alert.alert("Error", "Something went wrong, please try again.");
    }
  };

  return (
    <ImageBackground
      source={IMAGES.loginBg}
      resizeMode="cover"
      style={styles.background}
    >
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
          />

          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}

          <AppTextInput
            placeholder="Fathers Name"
            value={form.fathersName}
            onChangeText={(text) => handleChange("fathersName", text)}
          />
          {errors.fathersName && (
            <Text style={styles.errorText}>{errors.fathersName}</Text>
          )}
          <AppTextInput
            placeholder="Age"
            value={form.age}
            keyboardType="numeric"
            onChangeText={(text) => handleChange("age", text)}
          />
          {errors.age && <Text style={styles.errorText}>{errors.age}</Text>}

          {/* DOB */}
          <TouchableOpacity
            onPress={() =>
              setShowPicker({ field: "dateOfBirth", visible: true })
            }
          >
            <View pointerEvents="none">
              <AppTextInput
                placeholder="Date of Birth"
                value={form.dateOfBirth}
                editable={false}
              />
              {errors.dateOfBirth && (
                <Text style={styles.errorText}>{errors.dateOfBirth}</Text>
              )}
            </View>
          </TouchableOpacity>

          <AppTextInput
            placeholder="Blood Group"
            value={form.bloodGroup}
            onChangeText={(text) => handleChange("bloodGroup", text)}
          />
          {errors.bloodGroup && (
            <Text style={styles.errorText}>{errors.bloodGroup}</Text>
          )}
          <AppTextInput
            placeholder="Mobile"
            value={form.mobile}
            keyboardType="phone-pad"
            onChangeText={(text) => handleChange("mobile", text)}
          />
          {errors.mobile && (
            <Text style={styles.errorText}>{errors.mobile}</Text>
          )}
          <AppTextInput
            placeholder="Email"
            value={form.email}
            keyboardType="email-address"
            onChangeText={(text) => handleChange("email", text)}
          />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          {/* Date of Joining */}
          <TouchableOpacity
            onPress={() =>
              setShowPicker({ field: "dateOfJoining", visible: true })
            }
          >
            <View pointerEvents="none">
              <AppTextInput
                placeholder="Date of Joining"
                value={form.dateOfJoining}
                editable={false}
              />
              {errors.dateOfJoining && (
                <Text style={styles.errorText}>{errors.dateOfJoining}</Text>
              )}
            </View>
          </TouchableOpacity>

          {/* Disabled Room No */}
          {/* <AppTextInput
            placeholder="Room No"
            value={form.roomNo}
            editable={false}
          /> */}

          {/* Disabled Rent Per Month */}
          {/* <AppTextInput
            placeholder="Rent Per Month"
            value={form.rentPerMonth}
            editable={false}
          /> */}

          <AppTextInput
            placeholder="Employment In"
            value={form.employmentIn}
            onChangeText={(text) => handleChange("employmentIn", text)}
          />
          {errors.employmentIn && (
            <Text style={styles.errorText}>{errors.employmentIn}</Text>
          )}
          <AppTextInput
            placeholder="Education Qualification"
            value={form.educationQualification}
            onChangeText={(text) =>
              handleChange("educationQualification", text)
            }
          />
          {errors.educationQualification && (
            <Text style={styles.errorText}>
              {errors.educationQualification}
            </Text>
          )}
          <AppTextInput
            placeholder="Office Address"
            value={form.officeAddress}
            onChangeText={(text) => handleChange("officeAddress", text)}
          />
          {errors.officeAddress && (
            <Text style={styles.errorText}>{errors.officeAddress}</Text>
          )}
          <AppTextInput
            placeholder="Permanent Address"
            value={form.permanentAddress}
            onChangeText={(text) => handleChange("permanentAddress", text)}
          />
          {errors.permanentAddress && (
            <Text style={styles.errorText}>{errors.permanentAddress}</Text>
          )}

          {/* Aadhar File Upload */}
          <TouchableOpacity
            style={styles.fileUploadButton}
            onPress={handlePickAadhar}
          >
            <Text style={styles.fileUploadText}>
              {form.aadharFile
                ? `Aadhar: ${form.aadharFile.name}`
                : "Upload Aadhar"}
            </Text>
          </TouchableOpacity>
          {errors.aadharFile && (
            <Text style={styles.errorText}>{errors.aadharFile}</Text>
          )}

          <AppTextInput
            placeholder="Password"
            value={form.password}
            onChangeText={(text) => handleChange("password", text)}
            secureTextEntry
          />
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <AppTextInput
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChangeText={(text) => handleChange("confirmPassword", text)}
            secureTextEntry
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <AppButton title="Register" onPress={handleregister} />

          <TouchableOpacity
            style={styles.loginLinkContainer}
            onPress={() => navigation.navigate("SignInScreen")}
          >
            <Text style={styles.loginLinkText}>
              Already have an account?{" "}
              <Text style={styles.loginLinkHighlight}>Login</Text>
            </Text>
          </TouchableOpacity>
        </ScrollView>

        {/* Date Pickers */}
        {showPicker.visible && (
          <DateTimePicker
            value={new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            maximumDate={new Date()}
            onChange={handleDateChange}
          />
        )}
      </AppSafeView>
    </ImageBackground>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: sharedPaddingHorizontal,
    backgroundColor: "transparent",
  },
  errorText: {
    color: "red",
    fontSize: s(12),
    marginTop: 2,
    marginBottom: 8,
    marginLeft: 10,
  },

  logo: {
    width: s(200),
    height: s(200),
    marginBottom: vs(25),
    resizeMode: "contain",
  },
  formContainer: {
    width: "100%",
    gap: vs(12),
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  fileUploadButton: {
    width: "100%",
    height: vs(30),
    backgroundColor: AppColors.blue,
    borderRadius: s(25),
    justifyContent: "center",
    alignItems: "center",
    marginBottom: vs(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  fileUploadText: {
    color: AppColors.white,
    fontSize: s(16),
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  loginLinkContainer: {
    marginTop: vs(20),
    alignItems: "center",
  },
  loginLinkText: {
    fontSize: s(14),
    color: AppColors.medGray,
  },
  loginLinkHighlight: {
    color: AppColors.primary,
    fontWeight: "700",
  },
});
