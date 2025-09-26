import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useDispatch, useSelector } from "react-redux";
import { restoreAuth } from "../store/slices/authSlice";
import { RootState } from "../store/store";

// Screens
import SignInScreen from "../screens/auth/SignInScreen";
import SignUpScreen from "../screens/auth/SignUpScreen";
import MainAppBottomTabs from "./MainAppBottomTabs";
import TermsScreen from "../screens/TermsScreen";
import PaymentScreen from "../screens/home/payments/PaymentScreen";
import NoticePolicyScreen from "../screens/home/noticepolicy/NoticePolicyScreen";
import RoomDetailsScreen from "../screens/home/RoomDetails/RoomDetailsScreen";
import RemindsScreen from "../screens/home/Reminds/RemindsScreen";
import FaqScreen from "../components/pages/FaqScreen";
import TenantPaymentDetailsScreen from "../screens/home/payments/TenantPaymentDetailsScreen";

const Stack = createStackNavigator();

export default function RootNavigator() {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  const [authChecked, setAuthChecked] = useState(false); // Track restore completion

  useEffect(() => {
    const checkAuth = async () => {
      await dispatch(restoreAuth());
      setAuthChecked(true); // Done restoring
    };
    checkAuth();
  }, [dispatch]);

  // Show loading/spinner while restoring
  if (!authChecked || loading) {
    return null; // or a loading spinner
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        // Logged-in stack
        <>
          <Stack.Screen
            name="MainAppBottomTabs"
            component={MainAppBottomTabs}
          />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="NoticePolicy" component={NoticePolicyScreen} />
          <Stack.Screen name="RoomDetails" component={RoomDetailsScreen} />
          <Stack.Screen name="Reminds" component={RemindsScreen} />
          <Stack.Screen name="FaqScreen" component={FaqScreen} />
          <Stack.Screen
            name="TenantPaymentDetails"
            component={TenantPaymentDetailsScreen}
          />
        </>
      ) : (
        // Auth stack
        <>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="TermsScreen" component={TermsScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
