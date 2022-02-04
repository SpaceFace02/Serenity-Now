import React from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import AppNavigator from "./navigator/AppNavigator";

// Suppress warnings
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

// GraphQL
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

// GraphQL client.
const client = new ApolloClient({
  uri: "https://graphql.contentful.com/content/v1/spaces/6dc331jz77a2/",
  credentials: "same-origin",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer <YOUR_ACCESS_TOKEN>`,
  },
  cache: new InMemoryCache(),
});

// In redux, when we update the state of one slice, the other states also get reset. Its a bug, which we can fix by using the spread operator before the updating the state, to add that to the state, instead of resetting other values. A bug I noticed in the docs, but not very significant.

// Like state.value = state.value = {...state, action.payload}
export const counterSlice = createSlice({
  name: "modal",
  initialState: {
    value: false,
  },
  reducers: {
    changeModalState: (state) => {
      state.value = !state.value;
    },
  },
});

export const nameSlice = createSlice({
  name: "username",
  initialState: {
    value: "User",
  },
  reducers: {
    // Update username withe the value passed while dispatching.
    updateUsername: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const cardSlice = createSlice({
  name: "cardState",
  initialState: {
    value: "closed",
  },
  reducers: {
    toggleCardState: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const loginSlice = createSlice({
  name: "loginModal",
  initialState: {
    value: "closed",
  },
  reducers: {
    toggleLoginState: (state, action) => {
      state.value = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    modal: counterSlice.reducer,
    username: nameSlice.reducer,
    cardState: cardSlice.reducer,
    loginModal: loginSlice.reducer,
  },
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    </ApolloProvider>
  );
};

export const { changeModalState } = counterSlice.actions;
export const { updateUsername } = nameSlice.actions;
export const { toggleCardState } = cardSlice.actions;
export const { toggleLoginState } = loginSlice.actions;

export default App;
