import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

function MenuItem({ name, title }) {
  return (
    <Container>
      {/* Must not overlap with Container */}
      <IconView>
        <Ionicons name={name} size={32} color="#546bfb" />
      </IconView>
      <Content>
        <Title>{title}</Title>
      </Content>
    </Container>
  );
}

export default MenuItem;

const Container = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 30%;
  margin-top: 20px;
`;

const IconView = styled.View`
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  margin-right: 7px;
`;

const Content = styled.View`
  margin-top: 10px;
`;

const Title = styled.Text`
  color: #3c4560;
  font-weight: 700;
  font-size: 24px;
`;
