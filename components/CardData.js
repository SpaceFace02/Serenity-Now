// GraphQL
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { View, ActivityIndicator, Pressable, ScrollView } from "react-native";
import Card from "./Card";

const dataQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        topRated
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        caption
        rating
      }
    }
  }
`;

const CardData = ({ navigation }) => {
  // GraphQL query
  const { loading, error, data } = useQuery(dataQuery);

  if (loading)
    return (
      <CenterContainer>
        <ActivityIndicator size="large" color="#4775f2" />
      </CenterContainer>
    );
  if (error)
    return (
      <CenterContainer>
        <Text>{console.log(error)}</Text>
      </CenterContainer>
    );

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
      showsHorizontalScrollIndicator={false}
    >
      {data.cardsCollection.items ? (
        data.cardsCollection.items.map((item, index) => {
          return !item.topRated ? (
            <Pressable
              style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}
              key={index}
              onPress={() => {
                navigation.navigate("Details", {
                  details: item,
                });
              }}
            >
              <Card
                title={item.title}
                image={item.image.url}
                caption={item.caption}
                subtitle={item.subtitle}
              />
            </Pressable>
          ) : null;
        })
      ) : (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginLeft: "55%",
          }}
        >
          <ActivityIndicator size="large" color="#4775f2" />
        </View>
      )}
    </ScrollView>
  );
};

export default CardData;

const CardsContainer = styled.View``;

const CenterContainer = styled.View`
  font-weight: bold;
  font-size: 40px;
  color: #d2d2d2;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;
