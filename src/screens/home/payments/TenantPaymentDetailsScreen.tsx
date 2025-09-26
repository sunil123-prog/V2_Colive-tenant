import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import { s, vs } from "react-native-size-matters";

const TenantPaymentDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { payment } = route.params;

  const handleDownloadPDF = () => {
    Alert.alert("Download PDF", `Invoice for ₹ ${payment.amount} downloaded!`);
  };

  const statusColor =
    payment.status === "Paid" ? "#4CAF50" :
    payment.status === "Pending" ? "#FFA500" :
    "#E53935";

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Details</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Payment Card */}
        <View style={styles.detailCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>{payment.date}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Amount</Text>
            <Text style={styles.value}>₹ {payment.amount}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <View style={[styles.statusBadge, { backgroundColor: statusColor }]}>
              <Text style={styles.statusText}>{payment.status}</Text>
            </View>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Payment Mode</Text>
            <Text style={styles.value}>{payment.mode}</Text>
          </View>

          {payment.transactionId && (
            <View style={styles.row}>
              <Text style={styles.label}>Transaction ID</Text>
              <Text style={styles.value}>{payment.transactionId}</Text>
            </View>
          )}

          {/* Download Button */}
          {payment.status === "Paid" && (
            <TouchableOpacity style={styles.downloadBtn} onPress={handleDownloadPDF}>
              <FontAwesome6 name="file-pdf" size={18} color="#fff" />
              <Text style={styles.downloadText}>Download Invoice</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default TenantPaymentDetailsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f7",padding: 16, },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: s(8),
    marginTop: s(20),
    borderRadius: 50
  },
  headerTitle: {
    color: "#fff",
    fontSize: s(15),
    fontWeight: "bold",
    marginLeft: s(10),
  },
  content: {
    padding: s(16),
  },
  detailCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: s(16),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: vs(8),
  },
  label: {
    fontSize: s(14),
    fontWeight: "600",
    color: "#555",
  },
  value: {
    fontSize: s(16),
    fontWeight: "500",
    color: "#333",
  },
  statusBadge: {
    paddingVertical: vs(4),
    paddingHorizontal: s(8),
    borderRadius: 8,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: s(13),
  },
  downloadBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E53935",
    paddingVertical: vs(10),
    borderRadius: 8,
    marginTop: vs(20),
  },
  downloadText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: s(8),
    fontSize: s(14),
  },
});
