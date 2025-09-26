import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import MainAppBottomTabs from "./MainAppBottomTabs";
import ProfileScreen from "../screens/profile/ProfileScreen";

const Drawer = createDrawerNavigator();

export default function AppDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        swipeEnabled: false, 
      }}
    >
      <Drawer.Screen name="Home" component={MainAppBottomTabs} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
