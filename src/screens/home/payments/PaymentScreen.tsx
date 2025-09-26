import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
} from "react-native";
import AppSafeView from "../../../views/AppSafeView";
import { FontAwesome6 } from "@expo/vector-icons";
import { vs, s } from "react-native-size-matters";
import { AppColors } from "../../../styles/colors";
import { AppFonts } from "../../../styles/fonts";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import AppTextInput from "../../../components/inputs/AppTextInput";

const TenantPaymentScreen = () => {
  const navigation = useNavigation();

  const [payments, setPayments] = useState([
    { id: "1", date: "2025-09-01", amount: 8000, status: "Paid", mode: "UPI" },
    { id: "2", date: "2025-08-01", amount: 8000, status: "Paid", mode: "Cash" },
    {
      id: "3",
      date: "2025-07-01",
      amount: 8000,
      status: "Pending",
      mode: "Cash",
    },
    {
      id: "4",
      date: "2025-05-01",
      amount: 7800,
      status: "Failed",
      mode: "Bank",
    },
  ]);

  const [filter, setFilter] = useState("All");
  const [filteredPayments, setFilteredPayments] = useState(payments);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [customDate, setCustomDate] = useState<Date | null>(null);

  const [payNowAmount, setPayNowAmount] = useState("");

  // Quick Pay handler
  const handleQuickPay = () => {
    if (!payNowAmount) return Alert.alert("Enter amount to pay");
    Alert.alert("Payment Success", `₹ ${payNowAmount} paid successfully!`);
    setPayNowAmount("");
  };

  // Filter payments
  const applyFilter = (type: string) => {
    setFilter(type);
    const today = new Date();
    let filtered = payments;

    if (type === "This Month") {
      filtered = payments.filter(
        (p) => new Date(p.date).getMonth() === today.getMonth()
      );
    } else if (type === "Last 3 Months") {
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(today.getMonth() - 3);
      filtered = payments.filter(
        (p) => new Date(p.date) >= threeMonthsAgo && new Date(p.date) <= today
      );
    } else if (type === "This Year") {
      filtered = payments.filter(
        (p) => new Date(p.date).getFullYear() === today.getFullYear()
      );
    }

    setFilteredPayments(filtered);
  };

  const handleConfirmDate = (date: Date) => {
    setDatePickerVisible(false);
    setCustomDate(date);
    const filtered = payments.filter(
      (p) => new Date(p.date).getMonth() === date.getMonth()
    );
    setFilteredPayments(filtered);
  };

  const handleDownloadPDF = (payment: any) => {
    Alert.alert("Download PDF", `Download invoice for ₹ ${payment.amount}`);
  };

  const renderPaymentItem = ({ item }: any) => {
    const today = new Date();
    const paymentDate = new Date(item.date);
    const isOverdue = item.status === "Pending" && paymentDate < today;
    const isUpcoming = item.status === "Pending" && paymentDate > today;

    const modeIcon =
      item.mode === "UPI"
        ? "mobile-screen"
        : item.mode === "Cash"
        ? "money-bill"
        : "building-columns";

    const modeColor =
      item.mode === "UPI"
        ? "#007AFF"
        : item.mode === "Cash"
        ? "#FF9800"
        : "#4CAF50";

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("TenantPaymentDetails", { payment: item })
        }
      >
        <View style={styles.paymentCard}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={styles.paymentDate}>{item.date}</Text>
            <Text
              style={[
                styles.paymentStatus,
                {
                  color:
                    item.status === "Paid"
                      ? "green"
                      : isOverdue
                      ? "red"
                      : "#FFA500",
                },
              ]}
            >
              {isOverdue ? "Overdue" : item.status}
            </Text>
          </View>

          <Text style={styles.paymentAmount}>₹ {item.amount}</Text>

          <View style={styles.paymentFooter}>
            <FontAwesome6
              name={modeIcon}
              size={16}
              color="#fff"
              style={{
                backgroundColor: modeColor,
                padding: 4,
                borderRadius: 4,
              }}
            />
            <Text style={styles.paymentMode}> {item.mode}</Text>

            {isUpcoming && (
              <FontAwesome6
                name="bell"
                size={18}
                color="#FFA500"
                style={{ marginLeft: 8 }}
              />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <AppSafeView style={styles.container}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <FontAwesome6 name="arrow-left" size={22} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tenant Payments</Text>
        </View>

        {/* Quick Pay Section */}
        {/* <View style={styles.quickPayCard}>
          <Text style={styles.sectionTitle}>Quick Pay</Text>
          <AppTextInput
            placeholder="Enter Amount"
            value={payNowAmount}
            onChangeText={setPayNowAmount}
            keyboardType="numeric"
            style={styles.input}
          />
          <TouchableOpacity style={styles.payNowBtn} onPress={handleQuickPay}>
            <Text style={styles.payNowText}>Pay Now</Text>
          </TouchableOpacity>
        </View> */}

        {/* Payment History Section */}
        <View style={{ marginTop: 16 }}>
          <Text style={styles.sectionTitle}>Payment History</Text>

          {/* Filter Row */}
          <View style={styles.filterRow}>
            {["All", "This Month", "Last 3 Months", "This Year"].map((type) => (
              <TouchableOpacity
                key={type}
                style={[
                  styles.filterBtn,
                  filter === type && styles.filterBtnActive,
                ]}
                onPress={() => applyFilter(type)}
              >
                <Text style={styles.filterText}>{type}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={styles.calendarBtn}
              onPress={() => setDatePickerVisible(true)}
            >
              <FontAwesome6 name="calendar-days" size={16} color="#fff" />
            </TouchableOpacity>
          </View>

          <FlatList
            data={filteredPayments}
            keyExtractor={(item) => item.id}
            renderItem={renderPaymentItem}
            ListEmptyComponent={
              <Text style={{ textAlign: "center", marginTop: 20 }}>
                No payments found.
              </Text>
            }
          />
        </View>

        {/* Date Picker */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirmDate}
          onCancel={() => setDatePickerVisible(false)}
          headerTextIOS="Select Date"
          cancelTextIOS="Cancel"
          confirmTextIOS="Done"
          pickerStyleIOS={{
            backgroundColor: AppColors.medGray,
            borderRadius: 12,
          }}
          customHeaderIOS={
            Platform.OS === "ios"
              ? () => (
                  <View
                    style={{
                      backgroundColor: AppColors.white,
                      paddingVertical: 12,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      marginBottom: vs(10),
                    }}
                  >
                    <Text
                      style={{
                        color: AppColors.primary,
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: AppFonts.Bold,
                      }}
                    >
                      Select Date
                    </Text>
                  </View>
                )
              : undefined
          }
          customHeaderAndroid={
            Platform.OS === "android"
              ? () => (
                  <View
                    style={{
                      backgroundColor: AppColors.white,
                      paddingVertical: 12,
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                    }}
                  >
                    <Text
                      style={{
                        color: AppColors.primary,
                        fontSize: 16,
                        textAlign: "center",
                        fontFamily: AppFonts.Bold,
                      }}
                    >
                      Select Date
                    </Text>
                  </View>
                )
              : undefined
          }
        />
      </View>
    </AppSafeView>
  );
};

export default TenantPaymentScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f8ff", padding: vs(3) },
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
    fontFamily: AppFonts.Bold,
    color: "#fff",
    marginLeft: 10,
  },
  quickPayCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Bold,
    color: "#444",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 8,
    fontSize: s(14),
  },
  payNowBtn: {
    backgroundColor: AppColors.blue,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  payNowText: { color: "#fff", fontFamily: AppFonts.Bold, fontSize: s(14) },
  filterRow: { flexDirection: "row", marginBottom: 12, alignItems: "center" },
  filterBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: "#eee",
    borderRadius: 6,
    marginRight: 8,
  },
  filterBtnActive: { backgroundColor: AppColors.blue },
  filterText: {
    fontSize: s(12),
    color: AppColors.primary,
    fontFamily: AppFonts.Bold,
  },
  calendarBtn: {
    backgroundColor: AppColors.blue,
    padding: 8,
    borderRadius: 6,
    marginLeft: "auto",
  },
  paymentCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  paymentDate: { fontSize: s(13), fontFamily: AppFonts.Medium, color: "#555" },
  paymentAmount: {
    fontSize: s(15),
    fontFamily: AppFonts.Bold,
    color: "#333",
    marginTop: 6,
  },
  paymentStatus: { fontSize: s(13), fontFamily: AppFonts.Bold },
  paymentFooter: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  paymentMode: { fontSize: s(12), color: "#555", marginLeft: 5 },
});
