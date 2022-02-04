import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

export default function Tag(props) {
  return (
    <Container>
      <Ionicons color={props.color} size={36} name={props.name} />
      <Text>{props.text}</Text>
    </Container>
  );
}

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  elevation: 3;
  padding: 12px 16px 12px;
  border-radius: 10px;
  height: 60px;
  margin: 0px 5px;
`;

const Text = styled.Text`
  font-weight: bold;
  font-size: 17px;
  margin-left: 8px;
`;
