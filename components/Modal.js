import styled from "styled-components";
import {
  Animated,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as palette from "../constants";
import { Subtitle, Title } from "./Card";
import MenuItem from "./MenuItem";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { changeModalState } from "../App";

// Firebase logout
import { getAuth } from "firebase/auth";
import { app } from "../components/Firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import, set up animated state, create animated container, apply state to animated component, add event, like mounting, press etc.

export function Modal() {
  // Firebase auth object
  const auth = getAuth(app);

  const screenHeight = Dimensions.get("window").height;
  const [top, setTop] = useState(new Animated.Value(screenHeight));

  const modal_value = useSelector((state) => state.modal.value);
  const dispatch = useDispatch();

  const username = useSelector((state) => state.username.value);

  // // Whenever component mounts, animate.
  useEffect(() => {
    toggleModal();
  }, []);

  useEffect(() => {
    toggleModal();
  }, [modal_value]);

  const toggleModal = () => {
    if (modal_value === true) {
      Animated.spring(top, {
        toValue: 60,
        useNativeDriver: false,
      }).start();
    } else if (modal_value === false) {
      Animated.spring(top, {
        toValue: screenHeight + 50,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleLogout = () => {
    auth.signOut().then(async () => {
      await AsyncStorage.removeItem("email");
      dispatch(changeModalState());
    });
  };

  return (
    <AnimatedContainer style={{ top: top }}>
      <Cover>
        <Image source={require("../assets/background.jpg")}></Image>
        <Title>{username}</Title>
        <Subtitle>Avid Explorer</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={() => {
          dispatch(changeModalState());
        }}
        style={{
          position: "absolute",
          top: "17%",
          left: "50%",
          marginLeft: -22,
          zIndex: 2,
        }}
      >
        <CloseView>
          <Ionicons name="close" size={32} color="#546bfb" />
        </CloseView>
      </TouchableOpacity>
      <Content>
        <MenuItem name="home" title="Home" />
        <MenuItem name="settings" title="Settings" />
        <MenuItem name="cash" title="Your Bookings" />
        <MenuItem name="star" title="Your Ratings" />
        <Pressable onPress={handleLogout}>
          <MenuItem name="log-out" title="Log Out" />
        </Pressable>
      </Content>
    </AnimatedContainer>
  );
}

export default Modal;

const Cover = styled.View`
  height: 20%;
  align-items: center;
  justify-content: center;
  display: flex;
`;

const Image = styled.Image`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const Content = styled.View`
  height: ${palette.screenHeight};
  background: #f0f3f5;
  padding-top: 20%;
`;

const Container = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 100;
  border-radius: 10px;
  /* As there's an image at the beginning of the modal screen. */
  overflow: hidden;
`;

const CloseView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  background: white;
  justify-content: center;
  align-items: center;
  elevation: 5;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
