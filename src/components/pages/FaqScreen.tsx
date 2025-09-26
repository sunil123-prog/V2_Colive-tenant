import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { s } from "react-native-size-matters";
import { AppColors } from "../../styles/colors";
import { AppFonts } from "../../styles/fonts";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome6 } from "@expo/vector-icons";

// Enable LayoutAnimation on Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  {
    question: "How do I pay my rent?",
    answer:
      "You can pay your rent directly through the app using UPI, card, or net banking. A digital receipt will be generated instantly.",
  },
  {
    question: "How do I raise a maintenance request?",
    answer:
      'Go to the "Support" section and submit a maintenance request. The landlord will be notified immediately.',
  },
  {
    question: "Can I view my payment history?",
    answer:
      'Yes, you can check all your past rent and bill payments under the "Payments → History" section.',
  },
  {
    question: "How do I contact my landlord?",
    answer:
      'Use the "Call" or "Message" option from your home dashboard to directly reach your landlord.',
  },
  {
    question: "What happens if I miss a payment?",
    answer:
      "A late fee may apply depending on your rental agreement. Please contact your landlord for details.",
  },

  // Profile-related questions
  {
    question: "How do I update my profile details?",
    answer:
      "Go to the Profile section from the navigation menu. You can update your name, email, phone number, and other personal details.",
  },
  {
    question: "Can I change my password?",
    answer:
      "Yes, in the Profile section, go to 'Change Password'. Enter your current password and the new one, then save changes.",
  },
  {
    question: "How do I upload or change my profile picture?",
    answer:
      "In the Profile section, tap on your profile picture and choose a new photo from your gallery or take a new one with your camera.",
  },
];

const TenantFaqScreen = () => {

  //Redux navigation
  const navigation = useNavigation();

  const [openIndexes, setOpenIndexes] = useState([]);

  const toggleFaq = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };

  //Main Page
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Faq Tenant</Text>
      </View>

      {faqs.map((item, index) => (
        <View key={index} style={styles.faqBox}>
          <TouchableOpacity
            style={styles.questionRow}
            onPress={() => toggleFaq(index)}
          >
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.symbol}>
              {openIndexes.includes(index) ? "-" : "+"}
            </Text>
          </TouchableOpacity>

          {openIndexes.includes(index) && (
            <View style={styles.answerBox}>
              <Text style={styles.answer}>{item.answer}</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  faqBox: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#f5f5f5",
  },
  questionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  question: {
    fontSize: 16,
    fontWeight: "600",
    flex: 1,
    fontFamily: AppFonts.Bold,
  },
  symbol: {
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 10,
  },
  answerBox: {
    marginTop: 8,
  },
  answer: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    fontFamily: AppFonts.Medium,
    textAlign: "justify",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: AppColors.blue,
    padding: 8,
    borderRadius: 50,
    fontFamily: AppFonts.Bold,
    marginBottom: 16,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: s(15),
    fontFamily: AppFonts.Medium,
    color: "#fff",
    marginLeft: 10,
  },
});

export default TenantFaqScreen;
