// Styling and React Native Components
import styled from "styled-components";
import { useEffect, useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  Animated,
  Easing,
  StatusBar,
} from "react-native";

// Components
import { NotificationIcon } from "../components/Icons";
import Tag from "../components/Tag";
import Modal from "../components/Modal";

// Redux
import { changeModalState, updateUsername, toggleLoginState } from "../App";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native";
import CardData from "../components/CardData";
import TopRatedScrollView from "../components/TopRatedScrollView";
import LoginModal, { getUserData } from "../components/LoginModal";

function HomeScreen({ navigation }) {
  // Functions
  const toggleHomeScreen = () => {
    if (modal_value == true) {
      Animated.timing(scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 0.5,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("light-content", true);
    } else if (modal_value == false) {
      Animated.timing(scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: false,
      }).start();
      Animated.spring(opacity, {
        toValue: 1,
        useNativeDriver: false,
      }).start();

      StatusBar.setBarStyle("dark-content", true);
    }
  };

  const fetchData = () => {
    return fetch("https://randomuser.me/api/?nat=us,dk,fr,gb")
      .then((response) => response.json())
      .then((json) => {
        setImageURL(json.results[0]["picture"]["medium"]);
        dispatch(
          updateUsername(
            `${json.results[0]["name"]["first"]} ${json.results[0]["name"]["last"]}`
          )
        );
      })
      .catch((error) => {});
  };

  // Hooks and states
  useEffect(() => {
    toggleHomeScreen();
  }, [modal_value]);

  useEffect(() => {
    StatusBar.setBarStyle("dark-content", true);
    fetchData();
  }, []);

  const [scale, setScale] = useState(new Animated.Value(1));
  const [opacity, setOpacity] = useState(new Animated.Value(1));
  const [imageURL, setImageURL] = useState("");
  const [cardsData, setCardData] = useState([]);

  // Redux
  const modal_value = useSelector((state) => state.modal.value);
  const username = useSelector((state) => state.username.value);
  const loginState = useSelector((state) => state.loginModal.value);
  const dispatch = useDispatch();

  const handleLoginAndModal = async () => {
    const email = await getUserData();
    if (email != null) {
      dispatch(changeModalState());
    } else {
      dispatch(toggleLoginState("opened"));
    }
  };

  return (
    <GlobalView>
      <Modal />
      <AnimatedContainer
        style={{ transform: [{ scale: scale }], opacity: opacity }}
      >
        <SafeAreaView>
          <ScrollView>
            <AppBar>
              <TouchableOpacity
                onPress={() => {
                  handleLoginAndModal();
                }}
                style={{ position: "absolute", top: 10, left: 0 }}
              >
                <Avatar source={{ uri: imageURL }} />
              </TouchableOpacity>
              <Title>Welcome back,</Title>
              <Name>{username}</Name>
              <NotificationIcon
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </AppBar>

            <ScrollView
              horizontal={true}
              style={{
                flexDirection: "row",
                paddingRight: 12,
                paddingTop: 30,
              }}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 30 }}
            >
              <Tag name="happy" text="Happy" color="#f5cb42" />
              <Tag name="sad" text="Sad" color="#2e62ff" />
              <Tag name="leaf" text="Nature" color="#00bd26" />
            </ScrollView>
            <Subtitle>Explore new places</Subtitle>
            <CardData navigation={navigation} />
            <Subtitle>Top Rated Places</Subtitle>
            <TopRatedScrollView navigation={navigation} />
          </ScrollView>
        </SafeAreaView>
      </AnimatedContainer>
      <LoginModal />
    </GlobalView>
  );
}

export default HomeScreen;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  /* border-top-left-radius: 10px;
  border-top-right-radius: 10px; */
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

export const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
`;

const GlobalView = styled.View`
  background: black;
  flex: 1;
`;

const Subtitle = styled.Text`
  color: #b8bece;
  font-size: 15px;
  font-weight: 600;
  margin-left: 20px;
  text-transform: uppercase;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const AppBar = styled.View`
  width: 100%;
  margin-top: 30px;
  padding-left: 80px;
  margin-top: 60px;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background-color: #3c4560;
  border-radius: 22px;
  margin-left: 20px;
`;
