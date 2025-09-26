import { StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { vs, s } from "react-native-size-matters";
import AppText from "../texts/AppText";
import { AppColors } from "../../styles/colors";

interface AppButtonProps {
  onPress: () => void;
  title: string;
  backgroundColor?: string;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean; // ✅ added
}

const AppButton: React.FC<AppButtonProps> = ({
  onPress,
  title,
  backgroundColor = AppColors.blue,

  textColor = AppColors.white,
  style,
  disabled = false, 
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
      style={[
        styles.button,
        { backgroundColor: disabled ? AppColors.medGray : backgroundColor }, 
        style,
      ]}
    >
      <AppText
        style={[
          styles.textTitle,
          { color: disabled ? AppColors.lightGray : textColor }, // ✅ lighter text when disabled
        ]}
        variant="bold"
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default AppButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: vs(30),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: s(25),
    alignSelf: "center",
  },
  textTitle: {
    fontSize: s(16),
  },
});
