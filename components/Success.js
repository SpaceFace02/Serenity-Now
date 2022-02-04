import React, { createRef, useState, useEffect } from "react";
import styled from "styled-components";
import LottieView from "lottie-react-native";
import { Animated, Dimensions } from "react-native";

const screenHeight = Dimensions.get("window").height;

const Success = ({ isActive }) => {
  const [top, setTop] = useState(new Animated.Value(0));
  const [opacity, setOpacity] = useState(new Animated.Value(0));
  let animation = createRef();

  useEffect(() => {
    if (isActive) {
      Animated.timing(top, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, { toValue: 1, useNativeDriver: false }).start();

      animation.current.play();
    } else {
      Animated.timing(top, {
        toValue: screenHeight + 30,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(opacity, { toValue: 0, useNativeDriver: false }).start();

      animation.current.loop = false;
    }
  });

  return (
    <AnimatedContainer style={{ top: top, opacity: opacity }}>
      <LottieView
        source={require("../assets/lottie/59945-success-confetti.json")}
        autoPlay
        loop={false}
        ref={animation}
      />
    </AnimatedContainer>
  );
};

export default Success;

const Container = styled.View`
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.6);
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);
