import React, {useState} from 'react';
import styled from 'styled-components';
import Navigation from './components/Navigation.jsx';
import Header from './components/Header.jsx';
import Map from './components/Map.jsx';
import Modal from './components/Modal.jsx';

// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/react-hooks';

// const client = new ApolloClient({
//   uri: 'http://localhost:5000/graphql',
//   cache: new InMemoryCache()
// });

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
  const [showModal, setShowModal] = useState(false);
  const [ulus, setUlus] = useState({id:0,name:'',population:1});

  return (
    <Root>
      <Header />
      <HorizontalLine />
      <Navigation />
      <Modal showModal={showModal} setShowModal={setShowModal} ulus={ulus}></Modal>
      <Map setShowModal={setShowModal} showModal={showModal} setUlus={setUlus} />
    </Root>
  );
}

export default App;
