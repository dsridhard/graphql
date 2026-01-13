import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {ApolloClient,InMemoryCache} from '@apollo/client';
import {ApolloProvider} from '@apollo/client/react';
import { HttpLink } from '@apollo/client';

const link = new HttpLink({
  uri: 'http://localhost:4000',
});

const client = new ApolloClient({
  link,
  cache :new InMemoryCache()
})

createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <StrictMode>
    <App />
  </StrictMode>
  </ApolloProvider>,
)
