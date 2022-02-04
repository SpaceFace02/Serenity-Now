import styled from "styled-components";

import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  useWindowDimensions,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  Alert,
  Dimensions,
  Animated,
} from "react-native";

import { BlurView } from "expo-blur";
import Success from "./Success";
import Loading from "./Loading";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { toggleLoginState } from "../App";

// Firebase
import { app } from "../components/Firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Persisting data across all screens
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenHeight = Dimensions.get("window").height;
const auth = getAuth(app);

const storeUserData = async (email) => {
  try {
    console.log(email);
    await AsyncStorage.setItem("email", email);
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

export const getUserData = async () => {
  try {
    const email = await AsyncStorage.getItem("email");
    if (email != null && typeof email == "string") {
      return email;
    } else return null;
  } catch (error) {
    Alert.alert("Error", error.message);
  }
};

const LoginModal = () => {
  const windowHeight = useWindowDimensions().height;
  const toPassHeight = Math.round(windowHeight);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [top, setTop] = useState(new Animated.Value(screenHeight));
  const [scale, setScale] = useState(new Animated.Value(1.2));
  const [translateY, setTranslateY] = useState(new Animated.Value(0));

  const dispatch = useDispatch();
  // Get login state from Redux
  const loginState = useSelector((state) => state.loginModal.value);

  const login = () => {
    Keyboard.dismiss();
    setIsLoading(true);

    // Firebase login.
    signInWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        const user = userCreds.user;
        setIsLoading(false);

        if (userCreds) {
          setIsSuccessful(true);

          storeUserData(user.email);

          setTimeout(() => {
            dispatch(toggleLoginState("closed"));
            setIsSuccessful(false);
          }, 2000);
        }
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
        setIsLoading(false);
      });

    // FOR PROTOTYPING AND TESTING PURPOSES
    // setTimeout(() => {
    //   setIsLoading(false);
    //   setIsSuccessful(true);

    //   setTimeout(() => {
    //     Alert.alert("Success!", "You have successfully logged in.");
    //     dispatch(toggleLoginState("closed"));
    //     setIsSuccessful(false);
    //   }, 2000);
    // }, 2000);
  };

  // useEffect to check changes in auth object. Not needed in this use case, as we don't have a specific profile screen or such where we display suer data.
  // useEffect(() => {
  //   const unsubscribe = auth.onAuthStateChanged((user) => {});
  //   return unsubscribe
  // }, []);

  useEffect(() => {
    if (loginState === "opened") {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(scale, {
        toValue: 1,
        useNativeDriver: false,
        duration: 500,
      }).start();
      Animated.spring(translateY, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    } else if (loginState === "closed") {
      setTimeout(() => {
        Animated.timing(top, {
          toValue: screenHeight + 30,
          duration: 0,
          useNativeDriver: false,
        }).start();
        // Scale animation
        Animated.spring(scale, {
          toValue: 1.2,
          useNativeDriver: false,
        }).start();
      }, 500);

      // Translate animation
      Animated.timing(translateY, {
        toValue: 1000,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  });

  // Retreive username if it exists.
  useEffect(() => {
    getUserData();
  }, []);

  const keyboardDismiss = () => {
    Keyboard.dismiss();
    dispatch(toggleLoginState("closed"));
  };

  return (
    <AnimatedContainer style={{ minHeight: toPassHeight, top: top }}>
      <TouchableWithoutFeedback onPress={keyboardDismiss}>
        <BlurView
          tint="default"
          intensity={100}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        />
      </TouchableWithoutFeedback>
      <AnimatedModal
        style={{ transform: [{ translateY: translateY }, { scale: scale }] }}
      >
        <Logo source={require("../assets/icon.png")} />
        <Text>Book Memorable Tours at affordable prices </Text>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <IconEmail>
          <Ionicons name="mail" size={24} color="#546bfb" />
        </IconEmail>
        <IconPassword>
          <Ionicons name="lock-closed" size={24} color="#546bfb" />
        </IconPassword>
        <Pressable
          onPress={login}
          style={{ width: "100%", height: "100%", alignItems: "center" }}
        >
          <Button>
            <ButtonText>Login</ButtonText>
          </Button>
        </Pressable>
        <Loading isActive={isLoading} />
        <Success isActive={isSuccessful} />
      </AnimatedModal>
    </AnimatedContainer>
  );
};

export default LoginModal;

const Container = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const IconEmail = styled.View`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 46%;
  left: 50px;
`;
const IconPassword = styled.View`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 58%;
  left: 50px;
`;

const Modal = styled.View`
  width: 80%;
  height: 60%;
  background: white;
  border-radius: 15px;
  elevation: 40;
  align-items: center;
`;

const AnimatedModal = Animated.createAnimatedComponent(Modal);

const Logo = styled.Image`
  width: 25%;
  height: 25%;
  margin-top: 20px;
`;

const Text = styled.Text`
  margin-top: 10px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  width: 80%;
  color: #b8becd;
`;

const TextInput = styled.TextInput`
  border: 1px solid #dbdfea;
  width: 70%;
  height: 10%;
  border-radius: 10px;
  font-size: 16px;
  padding-left: 45px;
  margin-top: 10px;
`;

const Button = styled.View`
  background: #5263ff;
  width: 90%;
  height: 10%;
  justify-content: space-around;
  align-items: center;
  border-radius: 10px;
  elevation: 20;
  margin-top: 30px;
`;

const ButtonText = styled.Text`
color: white;
font-weight: 700,
font-size: 20px;
text-transform: uppercase
`;
