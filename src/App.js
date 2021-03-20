import React from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation.jsx';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;
  align-self: center;
`;

const HorizontalLine = styled.div`
  all: unset;
  width: 100%;
  border-radius: 1px;
  height: 2px;
  background: rgba(137, 137, 137, 1);
`;

const App = () => {
  return (
    <Root>
      <Header />
      <HorizontalLine />
      <Navigation />
      <Map />
    </Root>
  );
}

export default App;
