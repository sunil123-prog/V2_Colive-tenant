import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { vs, s, ms } from "react-native-size-matters";
import { AppColors } from "../../../styles/colors";

// Example tenant reminders from owner
const initialReminders = [
  {
    id: "1",
    title: "Rent Due",
    message: "Your rent for September is due on 30th.",
    time: "2025-09-26 09:00 AM",
    read: false,
    priority: "high",
  },
  {
    id: "2",
    title: "Maintenance Notice",
    message: "Water supply will be shut down on 27th 10 AM - 2 PM.",
    time: "2025-09-25 05:00 PM",
    read: false,
    priority: "medium",
  },
  {
    id: "3",
    title: "Community Meeting",
    message: "Monthly community meeting scheduled on 28th 6 PM.",
    time: "2025-09-24 04:00 PM",
    read: true,
    priority: "low",
  },
];

export default function TenantRemindsScreen() {
  const [reminders, setReminders] = useState(initialReminders);

  const markAsRead = (id: string) => {
    setReminders((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const renderItem = ({ item }: { item: typeof initialReminders[0] }) => {
    const priorityColor =
      item.priority === "high"
        ? AppColors.danger
        : item.priority === "medium"
        ? AppColors.warning
        : AppColors.primary;

    return (
      <TouchableOpacity
        style={[styles.card, item.read && styles.readCard]}
        onPress={() => markAsRead(item.id)}
      >
        <View style={styles.cardHeader}>
          <Text style={[styles.title, item.read && styles.readText]}>{item.title}</Text>
          <View style={[styles.priorityDot, { backgroundColor: priorityColor }]} />
        </View>
        <Text style={[styles.message, item.read && styles.readText]}>{item.message}</Text>
        <Text style={styles.time}>{item.time}</Text>
        {!item.read && <Ionicons name="mail-unread-outline" size={20} color={AppColors.primary} style={styles.unreadIcon} />}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Reminders from Owner</Text>
      <FlatList
        data={reminders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: vs(20) }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: vs(16),
    backgroundColor: AppColors.background,
  },
  header: {
    fontSize: s(22),
    fontWeight: "bold",
    color: AppColors.textPrimary,
    marginBottom: vs(12),
  },
  card: {
    backgroundColor: AppColors.cardBackground,
    padding: vs(12),
    borderRadius: ms(12),
    marginBottom: vs(10),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  readCard: {
    backgroundColor: AppColors.cardCompleted,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: vs(6),
  },
  title: {
    fontSize: s(16),
    fontWeight: "600",
    color: AppColors.textPrimary,
  },
  readText: {
    color: AppColors.textSecondary,
    textDecorationLine: "line-through",
  },
  message: {
    fontSize: s(14),
    color: AppColors.textPrimary,
    marginBottom: vs(4),
  },
  time: {
    fontSize: s(12),
    color: AppColors.textSecondary,
  },
  unreadIcon: {
    position: "absolute",
    top: vs(12),
    right: vs(12),
  },
  priorityDot: {
    width: vs(12),
    height: vs(12),
    borderRadius: vs(6),
  },
});
