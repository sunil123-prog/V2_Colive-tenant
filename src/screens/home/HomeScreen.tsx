import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  FlatList,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  ActivityIndicator,
  Linking,
  Alert,
} from "react-native";
import { carouselData } from "../../data/data";
import { ICONS } from "../../constants/images-path";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import { vs, s } from "react-native-size-matters";
import AppSafeView from "../../views/AppSafeView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { fetchHome } from "../../store/slices/homeSlice";
import AppButton from "../../components/buttons/AppButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useNavigation } from "@react-navigation/native";
const { width, height } = Dimensions.get("window");

interface HomeData {
  fullName: string;
  roomNo: string;
  roomType: string;
}

export default function HomeScreen() {
  //Redux imporeted here
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const tenantHome = useSelector((state: RootState) => state.tenantHome);
  const contacts = useSelector((state: RootState) => state.contacts.list);

  //State Updating Here

  const [tenantId, setTenantId] = useState<number | null>(null);
  const [tenant, setTenant] = useState<HomeData>({
    fullName: "",
    roomNo: "",
    roomType: "",
  });

  const [loading, setLoading] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(true);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  
  //Ref importing here
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  // Carousel state
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Load tenantId from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setTenantId(parsedUser?.tenantId || null);
        }
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };
    loadUser();
  }, []);

  // Fetch tenant profile
  useEffect(() => {
    if (tenantId) dispatch(fetchHome(tenantId));
  }, [dispatch, tenantId]);

  useEffect(() => {
    if (tenantHome) {
      setTenant({
        fullName: tenantHome.fullName || "",
        roomNo: tenantHome.roomNo || "",
        roomType: tenantHome.roomType || "",
      });
    }
  }, [tenantHome]);

  // Animate guidelines modal
  useEffect(() => {
    if (showGuidelines) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 80,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showGuidelines]);

  //Close Modal For Animated
  const closeModal = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setShowGuidelines(false));
  };

  // Auto-scroll carousel
  useEffect(() => {
    const totalItems = carouselData.length;
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= totalItems) nextIndex = 0;

      setCurrentIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  // Whats App Functionality

  const openWhatsApp = (
    phone: string,
    tenant: {
      fullName: string;
      roomNo: string;
      roomType: string;
      floor?: string;
    }
  ) => {
    const message = `Hello, I am ${tenant.fullName} 👋\nRoom No: ${
      tenant.roomNo
    }\nRoom Type: ${tenant.roomType || "N/A"}\nFloor: ${tenant.floor || "N/A"}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "WhatsApp is not installed on your device");
    });
  };

  //Home Screen Code Here
  return (
    <AppSafeView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Welcome Section */}
        <View style={styles.greetingBox}>
          <Text style={styles.greetingText}>Welcome to V2 Colive,</Text>
          <Text style={styles.greetingText2}>
            {tenant.fullName || "Tenant"} 👋
          </Text>
          <Text style={styles.roomText}>
            Room: {tenant.roomNo || "N/A"} • Type: {tenant.roomType || "N/A"}
          </Text>
        </View>

        {/* Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            ref={flatListRef}
            data={carouselData}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            snapToAlignment="start"
            decelerationRate="fast"
            renderItem={({ item }) => (
              <View>
                <Image source={item.image} style={styles.carouselImage} />
                <Text style={styles.greetingText}>{item.name}</Text>
              </View>
            )}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={AppColors.primary} />
        ) : (
          <>
            {/* Row 1: Payments & Notice Policy */}

            <View style={styles.row}>
              {/* Payments */}
              <TouchableOpacity
                style={[styles.dashboardCard, { marginRight: 8 }]}
                activeOpacity={0.8}
                onPress={() => {
                  console.log("Pressed payment");

                  navigation.navigate("Payment");
                }}
              >
                <View style={styles.icon}>
                  <Text style={styles.cardTitleRow}>Payments</Text>
                  <FontAwesome6
                    name="arrow-alt-circle-right"
                    size={20}
                    color="black"
                    style={{ marginTop: vs(3) }}
                  />
                </View>
                <View style={styles.cardHeaderRow}>
                  <Image source={ICONS.paymentsIcon} style={styles.cardImage} />
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Text style={styles.cardText}>Current Due: N/A</Text>
                </View>
              </TouchableOpacity>

              {/* Notice Policy */}

              <TouchableOpacity
                style={[styles.dashboardCard, { marginLeft: 8 }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("NoticePolicy")}
              >
                <View style={styles.icon}>
                  <Text style={styles.cardTitleRow}>Notice Policy</Text>
                  <FontAwesome6
                    name="arrow-alt-circle-right"
                    size={20}
                    color="black"
                    style={{ marginTop: vs(3) }}
                  />
                </View>
                <View style={styles.cardHeaderRow}>
                  <Image source={ICONS.noticeIcon} style={styles.cardImage} />
                </View>
                <Text style={styles.cardText}>
                  Give 30-days notice to avoid charges.
                </Text>
              </TouchableOpacity>
            </View>

            {/* Row 2 */}
            <View style={styles.row}>
              {/* Room Details */}

              <TouchableOpacity
                style={[styles.dashboardCard, { marginRight: 8 }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("RoomDetails", { tenant })}
              >
                <View style={styles.icon}>
                  <Text style={styles.cardTitleRow}>Room Details</Text>
                  <FontAwesome6
                    name="arrow-alt-circle-right"
                    size={20}
                    color="black"
                    style={{ marginTop: vs(3) }}
                  />
                </View>
                <View style={styles.cardHeaderRow}>
                  <Image source={ICONS.roomsIcon} style={styles.cardImage} />
                </View>
                <Text style={styles.cardText}>
                  Room No: {tenant.roomNo || "N/A"}
                </Text>
                <Text style={styles.cardText}>
                  Room Type: {tenant.roomType || "N/A"}
                </Text>
              </TouchableOpacity>

              {/* Reminds */}

              <TouchableOpacity
                style={[styles.dashboardCard, { marginLeft: 8 }]}
                activeOpacity={0.8}
                onPress={() => navigation.navigate("Reminds")}
              >
                <View style={styles.icon}>
                  <Text style={styles.cardTitleRow}>Reminds</Text>
                  <FontAwesome6
                    name="arrow-alt-circle-right"
                    size={20}
                    color="black"
                    style={{ marginTop: vs(3) }}
                  />
                </View>
                <View style={styles.cardHeaderRow}>
                  <Image source={ICONS.remindsIcon} style={styles.cardImage} />
                </View>
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  <Text style={styles.cardText}>No new announcements</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.header}>
              <Text style={styles.headerTitle}>Help & Support</Text>
            </View>
            <View style={styles.helpImages}>
              <TouchableOpacity
                onPress={() => navigation.navigate("FaqScreen")}
              >
                <Image source={ICONS.faqIcon} style={styles.help} />
              </TouchableOpacity>

              {/* Phone */}

              <TouchableOpacity onPress={() => setShowPhoneModal(true)}>
                <Image source={ICONS.phoneIcon} style={styles.help} />
              </TouchableOpacity>

              {/*  WhatsApp Icon */}
              <TouchableOpacity onPress={() => setShowWhatsAppModal(true)}>
                <Image source={ICONS.whatsappIcon} style={styles.help} />
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Guidelines Modal */}
        <Modal visible={showGuidelines} transparent animationType="none">
          <View style={styles.modalOverlay}>
            <Animated.View
              style={[
                styles.modalContent,
                { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
              ]}
            >
              <Text style={styles.modalTitle}>📋 Tenant Guidelines</Text>
              <ScrollView style={{ maxHeight: 350 }}>
                <View
                  style={[
                    styles.ruleCard,
                    { borderLeftColor: "#007AFF", backgroundColor: "#EAF4FF" },
                  ]}
                >
                  <Text style={styles.point}>
                    💳 Pay Rent before 5th of every month
                  </Text>
                </View>
                <View
                  style={[
                    styles.ruleCard,
                    { borderLeftColor: "#FF9800", backgroundColor: "#FFF4E5" },
                  ]}
                >
                  <Text style={styles.point}>
                    📅 30 Days Notice is compulsory
                  </Text>
                  <Text style={styles.subPoint}>
                    • Notice given on/before 5th → 30 days from that date
                  </Text>
                  <Text style={styles.subPoint}>
                    • Notice given on/after 6th → 30 days + next month rent per
                    day
                  </Text>
                  <Text style={styles.point}>💡Example Scenarios:</Text>
                  <Text style={styles.subPoint}>
                    • Tenant clicks notice on 3rd Sep → Notice valid till 2nd
                    Oct.
                  </Text>
                  <Text style={styles.subPoint}>
                    • Tenant clicks notice on 7th Sep → Notice valid till 6th
                    Oct → Oct’s rent charged per day until 6th Oct .
                  </Text>
                </View>
                <View
                  style={[
                    styles.ruleCard,
                    { borderLeftColor: "#4CAF50", backgroundColor: "#E8F5E9" },
                  ]}
                >
                  <Text style={styles.point}>
                    🔒 Take care of your valuables (mobile, laptop, wallet)
                  </Text>
                </View>
                <View
                  style={[
                    styles.ruleCard,
                    { borderLeftColor: "#9C27B0", backgroundColor: "#F3E5F5" },
                  ]}
                >
                  <Text style={styles.point}>
                    💰 Maintenance Charges apply as per PG Management
                  </Text>
                </View>
              </ScrollView>
              <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                <Text style={styles.modalButtonText}>I Understand</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
        </Modal>

        {/* Modal For Phone contact Multiple Contact */}

        <Modal
          visible={showPhoneModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowPhoneModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: 300 }]}>
              <Text style={styles.modalTitle}>Select Contact</Text>
              <ScrollView>
                {contacts.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={styles.contactRow}
                    onPress={() => {
                      Linking.openURL(`tel:${c.phone}`);
                      setShowPhoneModal(false);
                    }}
                  >
                    <Text style={styles.contactName}>{c.name}</Text>
                    <Text style={styles.contactPhone}>{c.phone}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: AppColors.red }]}
                onPress={() => setShowPhoneModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Modal For WhatsApp Multiple Contact */}

        <Modal
          visible={showWhatsAppModal}
          transparent
          animationType="slide"
          onRequestClose={() => setShowWhatsAppModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={[styles.modalContent, { maxHeight: 300 }]}>
              <Text style={styles.modalTitle}>Select Contact</Text>
              <ScrollView>
                {contacts.map((c) => (
                  <TouchableOpacity
                    key={c.id}
                    style={styles.contactRow}
                    onPress={() => {
                      openWhatsApp(c.phone, tenant);
                      setShowWhatsAppModal(false);
                    }}
                  >
                    <Text style={styles.contactName}>{c.name}</Text>
                    <Text style={styles.contactPhone}>{c.phone}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: AppColors.red }]}
                onPress={() => setShowWhatsAppModal(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </AppSafeView>
  );
}

//Stylings for above components
const styles = StyleSheet.create({
  container: { flex: 1, padding: 5, backgroundColor: "#f8f8ff" },
  carouselContainer: {
    width: width,
    height: height * 0.25,
    marginBottom: vs(16),
  },
  carouselImage: {
    width: width,
    height: height * 0.25,
    borderRadius: s(12),
    resizeMode: "cover",
  },

  greetingBox: {
    padding: 16,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    marginBottom: 25,
  },
  greetingText: { fontSize: 18, fontWeight: "700", color: "#fff" },
  greetingText2: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    fontFamily: AppFonts.Bold,
  },
  roomText: { fontSize: 14, color: "#f0f0f0", marginTop: 4 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  dashboardCard: {
    backgroundColor: AppColors.white,
    padding: 16,
    borderRadius: 12,
    shadowColor: AppColors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    borderLeftWidth: 5,
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
    justifyContent: "space-evenly",
    minHeight: 150,
  },
  cardHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  cardImage: {
    width: vs(50),
    height: vs(50),
    borderRadius: 20,
    resizeMode: "contain",
  },
  icon: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardTitleRow: {
    fontSize: 18,
    marginBottom: 10,
    fontFamily: AppFonts.Bold,
    fontWeight: "600",
    color: "#333",
  },
  cardText: { fontSize: 15, color: "#555", fontFamily: AppFonts.Medium },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
    fontFamily: AppFonts.Bold,
    color: "#222",
  },
  ruleCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 5,
    // textAlign: "justify"
  },
  point: { fontSize: 15, color: "#333", fontFamily: AppFonts.Bold },
  subPoint: {
    fontSize: 14,
    color: "#555",
    fontFamily: AppFonts.Medium,
    marginLeft: 10,
    marginBottom: 2,
    textAlign: "justify",
  },
  modalButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontWeight: "600", fontSize: 16 },
  btn: {
    borderRadius: vs(100),
    height: vs(20),
    width: vs(20),
    backgroundColor: AppColors.primary,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.blue,
    padding: 14,
    borderRadius: 12,
    fontFamily: AppFonts.Bold,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: s(18),
    fontFamily: AppFonts.Medium,
    color: "#fff",
    marginLeft: 10,
  },
  help: {
    width: vs(50),
    height: vs(50),
    borderRadius: 20,
    resizeMode: "contain",
  },
  helpImages: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
  },

  contactRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },

  contactName: { 
    fontSize: 16, 
    fontFamily: AppFonts.Bold, 
    color: "#333" 
  },
  contactPhone: { 
    fontSize: 14, 
    fontFamily: AppFonts.Medium, 
    color: "#555" 
  },
});
