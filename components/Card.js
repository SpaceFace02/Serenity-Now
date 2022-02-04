import { useEffect, useState } from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;

export function getCardWidth(screenWidth) {
  var cardWidth = screenWidth - 40;
  if (screenWidth >= 768) {
    cardWidth = (screenWidth - 60) / 2;
  }
  if (screenWidth >= 1024) {
    cardWidth = (screenWidth - 80) / 3;
  }
  return cardWidth;
}

export default function Card(props) {
  // The following commented code is for code dynamism on various platforms. Theres a small bug in this, that's why its commented.
  const [cardWidth, setCardWidth] = useState(getCardWidth(screenWidth));

  useEffect(() => {
    Dimensions.addEventListener("change", adaptLayout);
  }, []);

  const adaptLayout = (dimensions) => {
    setCardWidth(getCardWidth(dimensions.window.width));
  };

  return (
    // <Container style= {{width: cardWidth}}>
    <Container>
      <ImageWrapper>
        <Image source={{ uri: props.image }} />
        <Title>{props.title}</Title>
      </ImageWrapper>
      <BottomContent>
        <Caption>{props.caption}</Caption>
        <Subtitle>{props.subtitle}</Subtitle>
      </BottomContent>
    </Container>
  );
}

const Container = styled.View`
  background-color: white;
  width: 240px;
  height: 220px;
  margin-left: 20px;
  margin-top: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 14px;
  elevation: 10;
`;

export const Caption = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

export const Subtitle = styled.Text`
  font-size: 14px;
  color: #b8bece;
`;

export const BottomContent = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 20px;
  padding-top: 7px;
`;

export const ImageWrapper = styled.View`
  width: 100%;
  height: 150px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Title = styled.Text`
  font-size: 25px;
  color: #fff;
  font-weight: bold;
  margin-left: 20px;
  margin-top: 15px;
`;
