import React, { useState } from "react";
import styled from "styled-components";
import {
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  StatusBar,
  Pressable,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { toggleCardState } from "../App";

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const Deal = (props) => {
  const [cardWidth, setCardWidth] = useState(new Animated.Value(250));
  const [cardHeight, setCardHeight] = useState(new Animated.Value(370));
  const [title, setTitle] = useState(new Animated.Value(20));
  const [btn, setBtn] = useState(new Animated.Value(27));
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  // Text animation
  const [textHeight, setTextHeight] = useState(new Animated.Value(100));

  // Redux to manage preventing of drag on full screen mode.
  const dispatch = useDispatch();

  const openCard = () => {
    // If you can't open it, return early.
    if (!props.canOpen) return;

    // Toggle state of card
    dispatch(toggleCardState("opened"));

    Animated.spring(cardWidth, {
      toValue: screenWidth,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: screenHeight,
      useNativeDriver: false,
    }).start();
    Animated.spring(title, {
      toValue: 60,
      useNativeDriver: false,
    }).start();
    Animated.spring(btn, {
      toValue: 64,
      useNativeDriver: false,
    }).start();
    Animated.spring(opacity, {
      toValue: 1,
      useNativeDriver: false,
    }).start();

    // Text Animation
    Animated.spring(textHeight, {
      toValue: 1000,
      useNativeDriver: false,
    }).start();

    StatusBar.setTranslucent(true);
  };

  const closeCard = () => {
    // Toggle state of card
    dispatch(toggleCardState("closed"));

    Animated.spring(cardWidth, {
      toValue: 250,
      useNativeDriver: false,
    }).start();
    Animated.spring(cardHeight, {
      toValue: 370,
      useNativeDriver: false,
    }).start();
    Animated.spring(title, {
      toValue: 20,
      useNativeDriver: false,
    }).start();
    Animated.spring(btn, {
      toValue: 27,
      useNativeDriver: false,
    });
    Animated.spring(opacity, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    // Text Animation
    Animated.spring(textHeight, {
      toValue: 100,
      useNativeDriver: false,
    }).start();

    StatusBar.setTranslucent(false);
  };

  return (
    <TouchableWithoutFeedback onPress={openCard}>
      <AnimatedContainer
        style={{ elevation: 200, width: cardWidth, height: cardHeight }}
      >
        <Cover>
          <Image source={props.image}></Image>
          <AnimatedTitle style={{ top: title }}> {props.title}</AnimatedTitle>
          <Guide> {props.guide}</Guide>
        </Cover>
        <AnimatedText style={{ height: textHeight }}>{props.text}</AnimatedText>
        <AnimatedLinearGradient
          colors={["rgba(255,255,255,0)", "rgba(255, 255, 255, 1)"]}
          style={{
            position: "absolute",
            top: 250,
            width: "100%",
            height: textHeight,
          }}
        />
        <AnimatedPressable
          style={{ position: "absolute", top: btn, right: 20 }}
          onPress={closeCard}
        >
          <AnimatedCloseView style={{ opacity: opacity }}>
            <Ionicons name="close" size={20} color="#546bfb" />
          </AnimatedCloseView>
        </AnimatedPressable>
      </AnimatedContainer>
    </TouchableWithoutFeedback>
  );
};

export default Deal;

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const Container = styled.View`
  height: 370px;
  width: 250px;
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CloseView = styled.View`
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
`;

const AnimatedCloseView = Animated.createAnimatedComponent(CloseView);

const Cover = styled.View`
  height: 250px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 280px;
`;

const Title = styled.Text`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 300px;
`;

const AnimatedTitle = Animated.createAnimatedComponent(Title);

const Guide = styled.Text`
  position: absolute;
  bottom: 10%;
  left: 20px;
  color: rgba(255, 255, 255, 1);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;

const Text = styled.Text`
  font-size: 17px;
  margin-left: 10px;
  margin-top: 5px;
  line-height: 24px;
  color: #3c4560;
`;

const AnimatedText = Animated.createAnimatedComponent(Text);
