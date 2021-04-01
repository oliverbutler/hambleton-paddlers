import "styles/global.scss";
import React, { useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";

import Navbar from "components/Navbar";
import Footer from "components/Footer";

// Import ChatWoot dynamically, if it is enabled
const ChatWoot = dynamic(() => import("components/ChatWoot"));

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "redux/reducers";
import { useSelector, useDispatch } from "react-redux";
import actions from "redux/actions";

import { getInstance } from "utils/axios";
import axios from "axios";

const store = createStore(
  rootReducer,

  typeof window !== "undefined" && // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__ && // @ts-ignore
    window.__REDUX_DEVTOOLS_EXTENSION__()
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon";
    }
  }
}

const Wrapper = (props) => {
  const dispatch = useDispatch();

  // Load Settings
  useEffect(() => {
    getInstance()
      .get("/settings")
      .then((res) => dispatch(actions.settings.setSettings(res.data)))
      .catch((e) => console.log(e));
  }, []);

  // Check auth
  useEffect(() => {
    var accessToken = localStorage.getItem("accessToken");
    if (accessToken)
      getInstance()
        .get("/users/me")
        .then((res) => dispatch(actions.user.setUser(res.data)))
        .catch((e) => localStorage.removeItem("accessToken"));
  }, []);

  // Load Events
  useEffect(() => {
    getInstance()
      .get("/events")
      .then((res) => dispatch(actions.events.setEvents(res.data)))
      .catch((e) => console.log(e));
  }, []);

  const settings = useSelector((state) => state.settings);

  // Get Committee Members
  return (
    <>
      {props.children} {settings.liveChat && <ChatWoot />}
    </>
  );
};

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Wrapper>
        <Head>
          <title>Hambleton Paddlers</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <script
            type="module"
            src="https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.esm.js"
          ></script>
          <script
            noModule={false}
            src="https://unpkg.com/ionicons@5.1.2/dist/ionicons/ionicons.js"
          ></script>
        </Head>

        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </Wrapper>
    </Provider>
  );
};

// Wraps all components in the tree with the data provider
export default App;
