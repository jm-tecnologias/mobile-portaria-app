import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/pages/mobile/login";
import InvitesScreen from "./src/pages/mobile/invite";
import ResidentDashboardScreen from "./src/pages/mobile/dashboard";
import ShareInviteScreen from "./src/pages/mobile/shareinvite";
import EditProfileModal from "./src/pages/mobile/editProfileModal";
import CancelInviteModal from "./src/pages/mobile/cancelInviteModal";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />

      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ResidentDashboardScreen" component={ResidentDashboardScreen} />
        <Stack.Screen name="InvitesScreen" component={InvitesScreen} />
        <Stack.Screen name="ShareInviteScreen" component={ShareInviteScreen} />
        <Stack.Screen name="CancelInviteModal" component={CancelInviteModal} />
        <Stack.Screen name="EditProfileModal" component={EditProfileModal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
