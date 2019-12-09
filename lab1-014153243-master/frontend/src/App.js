import React, { Component } from "react";
import logo from "./logo.svg";
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./components/Main";
import { BrowserRouter } from "react-router-dom";


const client = new ApolloClient({
  uri: 'http://localhost:8082/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              {/* App Component Has a Child Component called Main*/}
              <Main />
            </div>
          </BrowserRouter>
        </Provider>
      </ApolloProvider>
    );
  }
}
export default App;
