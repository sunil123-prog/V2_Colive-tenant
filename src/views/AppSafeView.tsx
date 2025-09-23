import React, { FC, ReactNode } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Platform,
  ViewStyle,
  StatusBar,
} from "react-native";
import { AppColors } from "../styles/colors";
import {IS_Android} from '.././constants/constants';

interface AppSafeViewProps {
  children: ReactNode;
  style?: ViewStyle; 
}

const AppSafeView: FC<AppSafeViewProps> = ({ children, style }) => {
  return (
    <SafeAreaView style={styles.SafeArea}>
      <View style={[styles.container, style]}>{children}</View>
    </SafeAreaView>
  );
};

export default AppSafeView;

const styles = StyleSheet.create({
  SafeArea: {
    flex: 1,
    backgroundColor: AppColors.white,
    paddingTop: IS_Android ? StatusBar.currentHeight || 0 : 0,
  },
  container: {
    flex: 1,
  },
});
