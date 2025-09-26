import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import AppSafeView from "../views/AppSafeView";
import { sharedPaddingHorizontal } from "../styles/sharedStyles";
import { vs, s } from "react-native-size-matters";
import { AppColors } from "../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AppButton from "../components/buttons/AppButton";
import { AppFonts } from "../styles/fonts";

const TermsScreen = () => {
  const navigation = useNavigation();
  const [accepted, setAccepted] = useState(false);

  return (
    <AppSafeView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: vs(40) }}
      >
        <Text style={styles.title}>Room Rental Terms & Conditions</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Rent Payment</Text>
          <Text style={styles.point}>
            • The Tenant must pay the monthly rent on or before the 5th day of
            every month.
          </Text>
          <Text style={styles.point}>
            • Delay in payment may attract penalties at the discretion of the
            Management.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Notice Period</Text>
          <Text style={styles.point}>
            a. The Tenant is required to provide a minimum of thirty (30) days’
            written notice prior to vacating the premises.
          </Text>
          <Text style={styles.point}>
            b. If the Tenant provides notice on or before the 5th of the current
            month, the notice period shall be calculated from that date, and
            rent shall be payable for 30 days accordingly.
          </Text>
          <Text style={styles.subPoint}>
            Example Scenario: Tenant clicks notice on 3rd → valid till 2nd of
            next month.
          </Text>

          <Text style={styles.point}>
            c. If the Tenant provides notice on or after the 6th of the current
            month, the Tenant shall:
          </Text>
          <Text style={styles.subPoint}>• Serve a 30-day notice period</Text>
          <Text style={styles.subPoint}>
            • Pay rent for the subsequent month on a pro-rata basis
          </Text>
          <Text style={styles.subPoint}>
            Example: Tenant clicks notice on 7th → valid till 6th next month →
            rent charged per day.
          </Text>

          <Text style={styles.warning}>
            ⚠️ Token advance and rent are non-refundable in case of
            cancellation.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Responsibility for Personal Belongings
          </Text>
          <Text style={styles.point}>
            • The Management shall not be liable for loss, theft, or damage of
            Tenant’s personal belongings.
          </Text>
          <Text style={styles.point}>
            • The Tenant is solely responsible for safeguarding their
            possessions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Maintenance Deduction</Text>
          <Text style={styles.point}>
            • A sum of ₹2,000 shall be paid from the Tenant’s security deposit
            towards maintenance charges.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Following Rules</Text>
          <Text style={styles.point}>
            • Visitors are not allowed without prior permission.
          </Text>
          <Text style={styles.point}>
            • Smoking, alcohol, and related substances are strictly prohibited.
          </Text>
          <Text style={styles.point}>
            • Use of electric stoves, kettles, irons, etc. is not allowed.
            Penalty ₹1,000 for violations.
          </Text>
          <Text style={styles.point}>
            • Avoid wasting food, power, or water.
          </Text>
          <Text style={styles.warning}>
            ⚠️ Any illegal activity will lead to immediate eviction without
            refund.
          </Text>
          <Text style={styles.warning}>
            ⚠️ PG/Management is not responsible for personal matters.
          </Text>
        </View>

        {/* Checkbox */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAccepted(!accepted)}
        >
          <Ionicons
            name={accepted ? "checkbox" : "square-outline"}
            size={24}
            color={AppColors.primary}
          />
          <Text style={styles.checkboxText}>
            I have read and agree to the Terms & Conditions
          </Text>
        </TouchableOpacity>

        {/* Accept Button */}
        <AppButton
          title="Accept"
          onPress={() => navigation.navigate("SignInScreen")}
          disabled={!accepted}
          style={{ opacity: accepted ? 1 : 0.6 }}
        />
      </ScrollView>
    </AppSafeView>
  );
};

export default TermsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
    paddingHorizontal: sharedPaddingHorizontal,
  },
  scrollContainer: {
    marginTop: vs(20),
  },
  title: {
    fontSize: s(20),
    fontWeight: "700",
    fontFamily: AppFonts.Bold,
    marginBottom: vs(20),
    color: AppColors.primary,
  },
  section: {
    marginBottom: vs(15),
  },
  sectionTitle: {
    fontSize: s(16),
    fontFamily: AppFonts.Bold,
    fontWeight: "700",
    marginBottom: vs(5),
    color: AppColors.black,
  },
  point: {
    fontSize: s(14),
    marginBottom: vs(3),
    fontFamily: AppFonts.Medium,
    color: AppColors.medGray,
  },
  subPoint: {
    fontSize: s(13),
    marginLeft: s(10),
    marginBottom: vs(3),
    fontFamily: AppFonts.Medium,

    color: AppColors.medGray,
  },
  warning: {
    fontSize: s(13),
    color: AppColors.warning,
    fontFamily: AppFonts.Medium,

    marginBottom: vs(3),
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: vs(20),
  },
  checkboxText: {
    marginLeft: s(10),
    fontSize: s(14),
    color: AppColors.black,
    fontFamily: AppFonts.Bold,

    flex: 1,
  },
});
