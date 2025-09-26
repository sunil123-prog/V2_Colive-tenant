import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/home/HomeScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { AppColors } from "../styles/colors";
import { Platform } from "react-native";
import { vs, s } from "react-native-size-matters";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const IS_Android = Platform.OS === "android";

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}
      
      />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreen}
      options={{
        gestureEnabled: false
       }}
      />
    </Stack.Navigator>
  );
}

export default function MainAppBottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: AppColors.primary,
        tabBarLabelStyle: {
          marginTop: vs(4),
          fontSize: s(10),
        },
        tabBarStyle: IS_Android ? { height: vs(50) } : undefined,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
        }}
      />
      
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
