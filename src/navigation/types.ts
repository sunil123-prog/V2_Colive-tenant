// Define all routes and their params
export type RootStackParamList = {
  HomeScreen: undefined;
  SignInScreen: undefined;
  RegisterScreen: undefined;
  MainAppBottomTabs: undefined;
};


// pickerStyleIOS={{
//           backgroundColor: AppColors.primary,
//           borderRadius: 12,
//         }}


{/* Date Picker Modal */}
      // <DateTimePickerModal
      //   isVisible={isDatePickerVisible}
      //   mode="date"
      //   onConfirm={handleConfirmDate}
      //   onCancel={() => setDatePickerVisible(false)}
      //   headerTextIOS="Select Date"
      //   cancelTextIOS="Cancel"
      //   confirmTextIOS="Done"
      //   pickerStyleIOS={{
      //     backgroundColor: AppColors.primary,
      //     borderRadius: 12,
      //   }}
      //   customHeaderIOS={
      //     Platform.OS === "ios"
      //       ? () => (
      //           <View
      //             style={{
      //               backgroundColor: AppColors.primary,
      //               paddingVertical: 12,
      //               borderTopLeftRadius: 12,
      //               borderTopRightRadius: 12,
      //             }}
      //           >
      //             <Text
      //               style={{
      //                 color: "#fff",
      //                 fontSize: 16,
      //                 textAlign: "center",
      //                 fontFamily: AppFonts.Bold,
      //               }}
      //             >
      //               Select Date
      //             </Text>
      //           </View>
      //         )
      //       : undefined
      //   }
      // />