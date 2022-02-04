import React from "react";
import styled from "styled-components";

const BucketList = () => {
  return (
    <Container>
      <Text>Your Bucket List</Text>
    </Container>
  );
};

export default BucketList;

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text``;
