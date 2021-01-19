import React, { useState } from 'react';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import DrawMap from './components/Map';  
import InfoBox from './components/InfoBox'
import MenuAppBar from './components/Header'
import Footer from './components/Footer'
import './css/App.css';

const App = () =>                 
{
  const [mapCenter] = useState({ lat: 51.242400, lng: 4.419060 });
  const [mapZoom] = useState(8);
  
  const client = new ApolloClient({ uri: 'http://localhost:4000/graphql' });

  return (
    <ApolloProvider client={client}>
      <div className="app">
          <div className="header">
            <MenuAppBar/>
          </div>
          <div className="content">
            <InfoBox />
            <DrawMap
              center={mapCenter}
              zoom={mapZoom}
              />
          </div>
          <div className="footer">
            <Footer />
          </div>
      </div>
      </ApolloProvider>
  );
}

export default App;
