import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Platform,
} from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AppTextInput from "../../../components/inputs/AppTextInput";
import AppButton from "../../../components/buttons/AppButton";
import { AppColors } from "../../../styles/colors";
import { AppFonts } from "../../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { s, vs } from "react-native-size-matters";

const NoticePolicyScreen = () => {
  const navigation = useNavigation();

  const [noticePeriod, setNoticePeriod] = useState("");
  const [proposedExitDate, setProposedExitDate] = useState("");
  const [reason, setReason] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleConfirmDate = (date: Date) => {
    setProposedExitDate(date.toISOString().split("T")[0]);
    setDatePickerVisible(false);
  };

  const handleSubmit = () => {
    if (!noticePeriod || !proposedExitDate || !reason || !isConfirmed) {
      Alert.alert("Error", "Please fill all fields and confirm details.");
      return;
    }
    Alert.alert("Success", "Notice period submitted successfully!");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notice Period</Text>
      </View>

      {/* Notice Guidelines with Icons */}
      <View style={styles.noticeCard}>
        <View style={styles.noticeRow}>
          <FontAwesome6 name="exclamation-circle" size={18} color="#FF9800" style={{ marginRight: 8 }} />
          <Text style={styles.noticeText}>30 Days Notice is compulsory</Text>
        </View>

        <View style={styles.noticeRow}>
          <FontAwesome6 name="circle" size={10} color="#FF9800" style={{ marginRight: 8, marginTop: 6 }} />
          <Text style={styles.noticeSubText}>Notice given on/before 5th → 30 days from that date</Text>
        </View>

        <View style={styles.noticeRow}>
          <FontAwesome6 name="circle" size={10} color="#FF9800" style={{ marginRight: 8, marginTop: 6 }} />
          <Text style={styles.noticeSubText}>Notice given on/after 6th → 30 days and next month rent charged per day (pro-rata)</Text>
        </View>

        <Text style={[styles.noticeText, { marginTop: 8 }]}>Example Scenarios:</Text>

        <View style={styles.noticeRow}>
          <FontAwesome6 name="calendar" size={16} color="#4CAF50" style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={styles.noticeSubText}>Tenant clicks notice on 3rd Sep → Notice valid till 2nd Oct.</Text>
        </View>

        <View style={styles.noticeRow}>
          <FontAwesome6 name="calendar" size={16} color="#4CAF50" style={{ marginRight: 8, marginTop: 2 }} />
          <Text style={styles.noticeSubText}>Tenant clicks notice on 7th Sep → Notice valid till 6th Oct → Oct’s rent charged per day until 6th Oct.</Text>
        </View>
      </View>

      {/* Notice Period Input */}
      <AppTextInput
        placeholder="Notice Period (days)"
        value={noticePeriod}
        onChangeText={setNoticePeriod}
        keyboardType="numeric"
        style={styles.input}
      />

      {/* Proposed Exit Date */}
      <View style={{ marginBottom: 15 }}>
        <AppTextInput
          placeholder="Proposed Exit Date"
          value={proposedExitDate}
          editable={false}
          style={styles.input}
        />
        <TouchableOpacity
          style={[StyleSheet.absoluteFill, { backgroundColor: "transparent" }]}
          onPress={() => setDatePickerVisible(true)}
        />
      </View>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisible(false)}
        headerTextIOS="Select Date"
        cancelTextIOS="Cancel"
        confirmTextIOS="Done"
        pickerStyleIOS={{
          backgroundColor: AppColors.primary,
          borderRadius: 12,
        }}
      />

      {/* Reason / Notes */}
      <TextInput
        placeholder="Reason / Notes"
        value={reason}
        onChangeText={setReason}
        style={styles.textArea}
        multiline
        numberOfLines={4}
      />

      {/* Confirmation Checkbox */}
      <TouchableOpacity
        style={styles.checkboxContainer}
        onPress={() => setIsConfirmed(!isConfirmed)}
      >
        <View style={[styles.checkbox, isConfirmed && styles.checkedBox]}>
          {isConfirmed && <Ionicons name="checkmark" size={18} color="#fff" />}
        </View>
        <Text style={styles.checkboxText}>I confirm the above details</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <AppButton
        title="Submit"
        disabled={!isConfirmed}
        onPress={handleSubmit}
        style={{ backgroundColor: isConfirmed ? "#4CAF50" : "#aaa" }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f7f8fa",
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.blue,
    padding: 8,
    borderRadius: 50,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: s(15),
    fontFamily: AppFonts.Medium,
    color: "#fff",
    marginLeft: 10,
  },
  noticeCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
  },
  noticeRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },
  noticeText: {
    fontSize: 16,
    color: "#333",
    fontFamily: AppFonts.Bold,
  },
  noticeSubText: {
    fontSize: 14,
    color: "#555",
    fontFamily: AppFonts.Medium,
    flex: 1,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
  },
  textArea: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    textAlignVertical: "top",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: "#777",
    borderRadius: 4,
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: "#4CAF50",
    borderColor: "#4CAF50",
  },
  checkboxText: {
    fontSize: vs(16),
    color: "#555",
    fontFamily: AppFonts.Medium,
  },
});

export default NoticePolicyScreen;
