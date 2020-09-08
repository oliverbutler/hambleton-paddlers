import React from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import withData from "../utils/apollo";
import "bulma";
import "styles/App.scss";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

// Redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "redux/reducers";

const store = createStore(
  rootReducer
  // @ts-ignore
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "ion-icon";
    }
  }
}

const App = ({ Component, pageProps, apollo }) => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apollo}>
        <Head>
          <title>Hambleton Paddlers</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <script src="https://unpkg.com/ionicons@5.1.2/dist/ionicons.js"></script>
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </Provider>
  );
};

// Wraps all components in the tree with the data provider
export default withData(App);
