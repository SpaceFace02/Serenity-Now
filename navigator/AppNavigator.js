import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import DetailScreen from "../screens/DetailScreen";
import BottomNavigator from "./BottomNavigator";
import { TransitionSpecs } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}
        headerMode="screen"
      >
        <Stack.Screen name="Home" component={BottomNavigator} />
        <Stack.Screen
          name="Details"
          component={DetailScreen}
          options={{
            presentation: "modal",
            open: TransitionSpecs.RevealFromBottomAndroidSpec,
            close: TransitionSpecs.RevealFromBottomAndroidSpec,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
