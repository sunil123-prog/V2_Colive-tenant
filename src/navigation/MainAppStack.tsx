import { createStackNavigator } from "@react-navigation/stack";
import MainAppBottomTabs from "./MainAppBottomTabs";
import AuthStack from "./AuthStack";

const Stack = createStackNavigator();

export default function MainAppStack() {
    return(
        <Stack.Navigator
         screenOptions={{
            headerShown: false,
            gestureEnabled: false
         }}
        >
            <Stack.Screen name="AuthStack" component={AuthStack} />
            <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs}
            options={{ gestureEnabled: false }}
             />
        </Stack.Navigator>
    )
}