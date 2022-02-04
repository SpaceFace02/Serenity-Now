import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import { TransitionSpecs } from "@react-navigation/stack";
import DealScreen from "../screens/DealScreen";
import BucketList from "../screens/BucketList";

const Tab = createMaterialBottomTabNavigator();

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

function BottomNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false, presentation: "modal" }}
      barStyle={{ backgroundColor: "#f0f3f5" }}
      tabBarOptions={{ showIcon: true }}
      mode="modal"
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="home"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Deals"
        component={DealScreen}
        options={{
          animationEnabled: true,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="wallet"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Bucket List"
        component={BucketList}
        options={{
          animationEnabled: true,
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name="logo-bitbucket"
              size={24}
              color={focused ? activeColor : inactiveColor}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigator;
