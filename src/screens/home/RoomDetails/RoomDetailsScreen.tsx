import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { ICONS } from "../../../constants/images-path";
import { FontAwesome6 } from "@expo/vector-icons";
import { AppFonts } from "../../../styles/fonts";

const RoomDetails = ({ route }) => {
  const { tenant } = route.params;

  // Room info state
  const [roomInfo, setRoomInfo] = useState({
    roomNo: tenant.roomNo || "N/A",
    roomType: tenant.roomType || "N/A",
    floor: tenant.floor || "N/A",
    image: tenant.image || ICONS.roomsIcon, 
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Room Details</Text>

      <View style={styles.card}>
        {/* Room Image */}
        <Image source={roomInfo.image} style={styles.roomImage} />

        {/* Room Number */}
        <View style={styles.detailRow}>
          <FontAwesome6 name="door-open" size={20} color="#4A90E2" />
          <Text style={styles.detailText}>Room No: {roomInfo.roomNo}</Text>
        </View>

        {/* Room Type */}
        <View style={styles.detailRow}>
          <FontAwesome6 name="bed" size={20} color="#4A90E2" />
          <Text style={styles.detailText}>Room Type: {roomInfo.roomType}</Text>
        </View>

        {/* Floor */}
        <View style={styles.detailRow}>
          <FontAwesome6 name="layer-group" size={20} color="#4A90E2" />
          <Text style={styles.detailText}>Floor: {roomInfo.floor}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f5f6fa",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  roomImage: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
    resizeMode: "cover",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  detailText: {
    marginLeft: 10,
    fontFamily: AppFonts.Bold,
    fontSize: 18,
    color: "#555",
  },
});

export default RoomDetails;
