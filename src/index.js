import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListingPage from "./components/listingPage/listingPage";
import DetailsPage from "./components/detailsPage/detailsPage";

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <Routes>
            <Route exact path="/" element={<ListingPage />} />
            <Route path="list" element={<ListingPage />} />
            <Route path="character/:characterId" element={<DetailsPage />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>There's nothing here!</p>
                </main>
              }
            />
        </Routes>
      </Router>
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
