import React from 'react';
import styled from 'styled-components'; 
import './modal.css';
import Modal from 'react-modal';
import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu
} from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import types from './types';


Modal.setAppElement('#root');

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 10%;
  width: 90%;
`;

const BackReq = styled.button`
  all: unset;
  align-items: flex-end;
  color:#898989;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
`;

const Title = styled.h1`
  all: unset;
  font-size: 36px;
  font-weight: 600;

`;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  height: 80%;
  display: flex;
  flex-direction: column;
  padding-top: 39px;
  width: 90%;
`;

const Column = styled.div`
  flex-direction: row;
  display: flex;
  margin-bottom: 10px;
`;
const Bald = styled.div`
  font-size: 18px;
  font-weight: 600;
`;
const Value = styled.div`
  margin-left: 10px;
  font-weight: 500;
  font-size: 18px;
  flex-grow: 1;
`;

const Results = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50%;
  margin-top: 20px;
`;
const Num = styled.div`
  width: 30%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 10px 2px rgba(160, 160, 160, 0.25);
`;
const NumTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Number = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  color:#E38C3B;
  font-size: 64px;
  
`;

const Modal_ = ({showModal, setShowModal, ulus }) => {
  const closeModal = () => { setShowModal(false) }
  
  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="sdlkfsdfl"
    >
      <Wrap>
        <Header>
          <Title>{ulus.name}</Title>
          <div style={{alignItems: 'flex-end'}}>
            <BackReq onClick={closeModal}>Назад</BackReq>
          </div>
        </Header>
        <Content>
          <Column>
            <Bald>Население:</Bald>
            <Value>{ulus.population}</Value>
          </Column>
          <Column>
            <Bald>Плотность предпринимательства:</Bald>
            <Value>{randomInteger(25,50)} на 1000 человек</Value>
          </Column>
          <Menu menuButton={<MenuButton styles={menuButton}>Все категории</MenuButton>}
            overflow="auto" position="initial">
            {types.map(value => {
              return <MenuItem key={value} style={menuItem}>{value}</MenuItem>
            })}
          </Menu>
          <Results>
            <Num>
              <NumTitle style={{textAlign:'center'}}>Микро</NumTitle>
              <Number>26</Number>
            </Num>
            <Num>
              <NumTitle style={{textAlign:'center'}}>Малые</NumTitle>
              <Number>17</Number>
            </Num>
            <Num>
              <NumTitle style={{textAlign:'center'}}>Средние</NumTitle>
              <Number>14</Number>
            </Num>
          </Results>
        </Content>
      </Wrap>
    </Modal>
  );
}

const menuButton = {
  all: 'unset',
  background: '#fff',
  border: 4,
  borderStyle: 'solid',
  borderColor: '#e8e8e8',
  height: 50,
  borderRadius: 10,

  fontFamily: 'Montserrat',
  textAlign: 'left',
  fontWeight: 500,
  color: '#2C2B2C',
  fontSize: 18,
  paddingLeft: 25,
}

const menuItem = {
  width: '80ch',
}

export default Modal_;
