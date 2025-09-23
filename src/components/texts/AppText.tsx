import { StyleSheet, Text, View, TextStyle, TextProps } from "react-native";
import React, { FC } from "react";
import {s} from "react-native-size-matters";
import { AppFonts } from "../../styles/fonts";


interface AppTextProps extends TextProps{
    children: React.ReactNode;
    style?: TextStyle | TextStyle[];
    variant?: "bold" | "medium"
}

const AppText :FC<AppTextProps> = ({ children, style, variant = "medium", ...rest }) => {
  return (
    <View>
      <Text {...rest} style={[styles[variant], style]}>
        {children}
      </Text>
    </View>
  );
};

export default AppText;

const styles = StyleSheet.create({
  bold: {
    fontSize: s(18),
    color: "AppColors.black",
    fontFamily: AppFonts.Bold
  },
  medium: {
    fontSize: s(16),
    color: "#000",
    fontFamily: AppFonts.Medium
  },
});
