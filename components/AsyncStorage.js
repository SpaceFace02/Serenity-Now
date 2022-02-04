import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveStates = async (state) => {
  try {
    const stringState = JSON.stringify(state);
    await AsyncStorage.setItem("state", stringState);
  } catch (err) {}
};
