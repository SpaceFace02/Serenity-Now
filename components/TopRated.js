import styled from "styled-components";
import { useState, useEffect } from "react";
import { Dimensions } from "react-native";
import { getCardWidth } from "./Card";
import {
  BottomContent,
  Image,
  ImageWrapper,
  Title,
  Subtitle,
  Caption,
  Dim,
} from "./Card";

const screenWidth = Dimensions.get("window").width;

export default function TopRated(props) {
  const [cardWidth, setCardWidth] = useState(getCardWidth(screenWidth));

  useEffect(() => {
    Dimensions.addEventListener("change", adaptLayout);
  }, []);

  const adaptLayout = (dimensions) => {
    setCardWidth(getCardWidth(dimensions.window.width));
  };

  return (
    <Container style={{ width: cardWidth }}>
      <ImageWrapper>
        <Image source={{ uri: props.image }} />
        <Title>{props.title}</Title>
        <Rating>Rating: {props.rating}</Rating>
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
  width: 90%;
  height: 220px;
  margin-left: 10px;
  margin-top: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  border-radius: 14px;
  elevation: 10;
`;

export const Rating = styled.Text`
  font-size: 16px;
  color: #fff;
  margin-left: 20px;
  margin-top: 3px;
  text-shadow: 10px 10px 40px rgba(0, 0, 0, 0.8);
`;
