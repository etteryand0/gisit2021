import React, { useState } from 'react';
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
import { useQuery, gql } from '@apollo/react-hooks';
import types from './types';


Modal.setAppElement('#root');

const FILTER_BUSINESS = ({
  businessType,
  type, area,
  licensed, recreated
}) => {
  let query;

  if (licensed && recreated) {
    query = gql`
      query {
        micro: filterBusinesses(
          area: ${area}, licensed: ${licensed}, 
          recreated: ${recreated}, businessType: "${businessType}", 
          type_: ${type} size: "MICRO") {
          licensed
        }
        small: filterBusinesses(
          area: ${area}, licensed: ${licensed}, 
          recreated: ${recreated}, businessType: "${businessType}", 
          type_: ${type} size: "SMALL") {
          licensed
        }
        medium: filterBusinesses(
          area: ${area}, licensed: ${licensed}, 
          recreated: ${recreated}, businessType: "${businessType}", 
          type_: ${type} size: "MEDIUM") {
          licensed
        }
      }
    `;
  } else if (licensed) {
    query = gql`
      query {
        micro: filterBusinesses(
          area: ${area}, licensed: ${licensed}, 
          businessType: "${businessType}", 
          type_: ${type} size: "MICRO") {
          licensed
        }
        small: filterBusinesses(
          area: ${area}, licensed: ${licensed}, 
          businessType: "${businessType}", 
          type_: ${type} size: "SMALL") {
          licensed
        }
        medium: filterBusinesses(
          area: ${area}, licensed: ${licensed}, 
          businessType: "${businessType}", 
          type_: ${type} size: "MEDIUM") {
          licensed
        }
      }
    `;
  } else if (recreated) {
    query = gql`
      query {
        micro: filterBusinesses(
          area: ${area}, recreated: ${recreated}, 
          businessType: "${businessType}", 
          type_: ${type} size: "MICRO") {
          licensed
        }
        small: filterBusinesses(
          area: ${area}, recreated: ${recreated}, 
          businessType: "${businessType}", 
          type_: ${type} size: "SMALL") {
          licensed
        }
        medium: filterBusinesses(
          area: ${area}, recreated: ${recreated}, 
          businessType: "${businessType}", 
          type_: ${type} size: "MEDIUM") {
          licensed
        }
      }
    `;
  } else {
    query = gql`
      query {
        micro: filterBusinesses(
          area: ${area}, 
          businessType: "${businessType}", 
          type_: ${type} size: "MICRO") {
          licensed
        }
        small: filterBusinesses(
          area: ${area},
          businessType: "${businessType}", 
          type_: ${type} size: "SMALL") {
          licensed
        }
        medium: filterBusinesses(
          area: ${area}, 
          businessType: "${businessType}", 
          type_: ${type} size: "MEDIUM") {
          licensed
        }
      }
    `;
  }
  return query;
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
  cursor: pointer;
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
  flex-wrap: wrap;
  justify-content: space-between;
  height: 50%;
  margin-top: 20px;
`;
const Num = styled.div`
  width: 140px;
  flex: ${window.innerWidth <= 560 ? '1 1 140px' : undefined};
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
  font-size: ${window.innerWidth <= 560 ? 44 : 48}px;
  
`;

const Modal_ = ({ showModal, setShowModal, ulus }) => {
  const closeModal = () => { setShowModal(false) }
  const [businessType, setBusinessType] = useState('_');
  const [recreated, setRecreated] = useState(false);
  const [licensed, setLicensed] = useState(false);
  const [type, setType] = useState(0);
  const [typePlaceholder, setTypePlaceholder] = useState('Все категории')

  const { loading, error, data } = useQuery(FILTER_BUSINESS({
    businessType: businessType,
    type: type,
    area: ulus.id,
    licensed: licensed,
    recreated: recreated
  }));

  if (loading) {
    return (
      <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="sdlkfsdfl"
      >
        <Wrap>
          <Header>
            <Title>{ulus.name}</Title>
            <div style={{ alignItems: 'flex-end' }}>
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
              <Value>Подсчитываем...</Value>
            </Column>
            <Menu menuButton={<MenuButton styles={window.innerWidth <= 560 ? { ...menuButton, ...responsiveMenuButton } : menuButton}>{typePlaceholder}</MenuButton>}
              overflow="auto" position="initial">
              <MenuItem style={menuItem} onClick={() => { setType(0); setTypePlaceholder('Все категории') }}>Все категории</MenuItem>
              {types.map(value => {
                const key = parseInt(value.split(' ')[0])

                return <MenuItem key={key} style={menuItem} onClick={() => { setType(key); setTypePlaceholder(value) }}>{value}</MenuItem>
              })}
            </Menu>
            <Bar wide="true">
              <Filter>
                <Option active={businessType === '_' ? "true" : undefined} onClick={() => setBusinessType('_')}>Все</Option>
                <Option active={businessType === 'U' ? "true" : undefined} onClick={() => setBusinessType('U')}>ЮЛ</Option>
                <Option active={businessType === 'I' ? "true" : undefined} onClick={() => setBusinessType('I')}>ИП</Option>
              </Filter>
              <Filter>
                <Option active={recreated ? "true" : undefined} onClick={() => setRecreated(!recreated)}>Лицензия</Option>
                <Option active={licensed ? "true" : undefined} onClick={() => setLicensed(!licensed)}>Востановленный</Option>
              </Filter>
            </Bar>
            <Results>
              <Num>
                <NumTitle style={{ textAlign: 'center' }}>Микро</NumTitle>
                <Number style={{ fontSize: 12 }}>Загрузка</Number>
              </Num>
              <Num>
                <NumTitle style={{ textAlign: 'center' }}>Малые</NumTitle>
                <Number style={{ fontSize: 12 }}>Загрузка</Number>
              </Num>
              <Num>
                <NumTitle style={{ textAlign: 'center' }}>Средние</NumTitle>
                <Number style={{ fontSize: 12 }}>Загрузка</Number>
              </Num>
            </Results>
          </Content>
        </Wrap>
      </Modal>
    )
  }

  if (error) {
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="sdlkfsdfl"
    >
      <Wrap>
        <Header>
          <Title>{ulus.name}</Title>
          Ошибка! {error.message}
        </Header>
      </Wrap>
    </Modal>
  }


  const length = data.micro.length + data.small.length + data.medium.length;
  const businesses = Math.floor(length / ulus.population * 1000);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={closeModal}
      contentLabel="sdlkfsdfl"
    >
      <Wrap>
        <Header>
          <Title>{ulus.name}</Title>
          <div style={{ alignItems: 'flex-end' }}>
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
            <Value>{businesses} на 1000 человек</Value>
          </Column>
          <Menu menuButton={<MenuButton styles={window.innerWidth <= 560 ? { ...menuButton, ...responsiveMenuButton } : menuButton}>{typePlaceholder}</MenuButton>}
            overflow="auto" position="initial">
            <MenuItem style={menuItem} onClick={() => { setType(0); setTypePlaceholder('Все категории') }}>Все категории</MenuItem>
            {types.map(value => {
              const key = parseInt(value.split(' ')[0])

              return <MenuItem key={key} style={menuItem} onClick={() => { setType(key); setTypePlaceholder(value) }}>{value}</MenuItem>
            })}
          </Menu>
          <Bar wide="true">
            <Filter>
              <Option active={businessType === '_' ? "true" : undefined} onClick={() => setBusinessType('_')}>Все</Option>
              <Option active={businessType === 'U' ? "true" : undefined} onClick={() => setBusinessType('U')}>ЮЛ</Option>
              <Option active={businessType === 'I' ? "true" : undefined} onClick={() => setBusinessType('I')}>ИП</Option>
            </Filter>
            <Filter>
              <Option active={recreated ? "true" : undefined} onClick={() => setRecreated(!recreated)}>Лицензия</Option>
              <Option active={licensed ? "true" : undefined} onClick={() => setLicensed(!licensed)}>Востановленный</Option>
            </Filter>
          </Bar>
          <Results>
            <Num>
              <NumTitle style={{ textAlign: 'center' }}>Микро</NumTitle>
              <Number>{data.micro.length}</Number>
            </Num>
            <Num>
              <NumTitle style={{ textAlign: 'center' }}>Малые</NumTitle>
              <Number>{data.small.length}</Number>
            </Num>
            <Num>
              <NumTitle style={{ textAlign: 'center' }}>Средние</NumTitle>
              <Number>{data.medium.length}</Number>
            </Num>
          </Results>
        </Content>
      </Wrap>
    </Modal>
  );
}

const Option = styled.div`
  font-weight: 600;
  font-size: 1.25rem;
  color: #898989;
  cursor: pointer;
  /* margin-right: 1.875rem; */
  text-transform: uppercase;
  ${props => props.active && `
    color: #000;
  `}
`;

const Bar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex-wrap: wrap;
  ${props => props.wide && `
    min-height: 10vh;
    align-items: center;
  `}
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;

  min-width: 20%;
  ${props => props.wide && `
    min-width: 38%;
  `}
`;

const responsiveMenuButton = {
  maxWidth: Math.floor(window.innerWidth * 0.8)
}
const menuButton = {
  all: 'unset',
  background: '#fff',
  border: 4,
  borderStyle: 'solid',
  borderColor: '#e8e8e8',
  height: 50,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',

  lineHeight: 1,
  maxWidth: 460,
  overflow: 'hidden',

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
