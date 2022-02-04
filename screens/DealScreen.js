import React, { useRef, useState } from "react";
import { PanResponder, Animated } from "react-native";
import styled from "styled-components";
import Deal from "../components/Deal";

// Redux
import { useSelector } from "react-redux";

const DealScreen = () => {
  const pan = useRef(new Animated.ValueXY()).current;
  const scale = useRef(new Animated.Value(0.9)).current;
  const translate = useRef(new Animated.Value(43)).current;
  const thirdScale = useRef(new Animated.Value(0.8)).current;
  const thirdTranslate = useRef(new Animated.Value(-50)).current;

  const [currentIndex, setCurrentIndex] = useState(0);

  // Overlay animation
  const [opacity, setOpacity] = useState(new Animated.Value(0));

  const cardState = useSelector((state) => state.cardState.value);

  const getNextIndex = (currentIndex) => {
    return (currentIndex + 1) % 3;
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (event, gestureState) => {
        if (gestureState.dx == 0 && gestureState.dy == 0) return false;
        else {
          if (cardState === "opened") return false;
          return true;
        }
      },
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translate, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        // Third card
        Animated.spring(thirdScale, {
          toValue: 0.9,
          useNativeDriver: true,
        }).start();

        Animated.spring(thirdTranslate, {
          toValue: 43,
          useNativeDriver: true,
        }).start();

        Animated.timing(opacity, {
          toValue: 1,
          useNativeDriver: false,
        }).start();

        return true;
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
      onPanResponderRelease: () => {
        const positionY = pan.y._value;
        Animated.timing(opacity, {
          toValue: 0,
          useNativeDriver: false,
        }).start();

        if (positionY > 200) {
          Animated.spring(pan, {
            toValue: {
              // x: pan.x.value also works, I am doing 0
              x: 0,
              y: 1000,
            },
            useNativeDriver: false,
          }).start();

          // Reset the pan card. useRef is OP.
          pan.setValue({ x: 0, y: 0 });
          scale.setValue(0.9);
          translate.setValue(43);
          thirdScale.setValue(0.8);
          thirdTranslate.setValue(-50);

          setCurrentIndex((currentIndex) => getNextIndex(currentIndex));
        } else {
          Animated.spring(pan, {
            toValue: {
              x: 0,
              y: 0,
            },
            useNativeDriver: false,
          }).start();

          // Second Card
          Animated.spring(scale, {
            toValue: 0.9,
            useNativeDriver: true,
          }).start();
          Animated.spring(translate, {
            toValue: 43,
            useNativeDriver: true,
          }).start();

          // Third card
          Animated.spring(thirdScale, {
            toValue: 0.8,
            useNativeDriver: true,
          }).start();

          Animated.spring(thirdTranslate, {
            toValue: -50,
            useNativeDriver: true,
          }).start();
        }

        return true;
      },
    })
  ).current;

  return (
    <Container>
      <AnimatedOverlay style={{ opacity: opacity }} />
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        }}
        {...panResponder.panHandlers}
      >
        <Deal
          title={offers[currentIndex].title}
          image={offers[currentIndex].image}
          guide={offers[currentIndex].guide}
          text={offers[currentIndex].text}
          canOpen={true}
        />
      </Animated.View>

      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          transform: [
            {
              scale: scale,
            },
            {
              translateY: translate,
            },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <Deal
          title={offers[getNextIndex(currentIndex)].title}
          image={offers[getNextIndex(currentIndex)].image}
          guide={offers[getNextIndex(currentIndex)].guide}
          text={offers[getNextIndex(currentIndex)].text}
        />
      </Animated.View>
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          zIndex: -3,
          transform: [
            {
              scale: thirdScale,
            },
            {
              translateY: thirdTranslate,
            },
          ],
        }}
      >
        <Deal
          title={offers[getNextIndex(currentIndex + 1)].title}
          image={offers[getNextIndex(currentIndex + 1)].image}
          guide={offers[getNextIndex(currentIndex + 1)].guide}
          text={offers[getNextIndex(currentIndex + 1)].text}
        />
      </Animated.View>
    </Container>
  );
};

export default DealScreen;

const Container = styled.View`
  justify-content: center;
  align-items: center;
  background: #f0f3f5;
  flex: 1;
`;

const offers = [
  {
    title: "Buy 2 Get 1 Free",
    image: require("../assets/Deals/img2.png"),
    guide: "",
    text: "You can't miss this one. Avail now by visiting out website and reap the benefits of our benevolence.",
  },
  {
    title: "",
    image: require("../assets/Deals/img3.jpg"),
    guide: "",
    text: "What are you waiting for? This is a once in a lifetime offer you can't afford to miss.",
  },
  {
    title: "25% Cashback*",
    image: require("../assets/Deals/img1.png"),
    guide: "Deal 3",
    text: "Make your vacation count. Cashback on orders above 10000. *Terms and conditions apply xD",
  },
];

const Overlay = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: -3;
`;

const AnimatedOverlay = Animated.createAnimatedComponent(Overlay);
