import React from 'react';
import styled from 'styled-components';

import worldIcon from './world.svg';
import statIcon from './statistics.svg';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  /* padding-top: 35px; */
`;

export const Bar = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  ${props => props.wide && `
    height: 10vh;
    align-items: center;
  `}
`;

export const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;

  min-width: 20%;
  ${props => props.wide && `
    min-width: 38%;
  `}
`;

const RegionInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 20vw;
`;

const Region = styled.div`
  width: 100%;
  color: #2C2B2C;
  font-size: 1.125rem;
  text-transform: uppercase;
  font-weight: 600;
  border-bottom: 1px solid black;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  margin-bottom: 5px;
`;

const Number = styled.div`
  font-weight: 500;
`;

export const Option = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
  color: #898989;
  /* margin-right: 1.875rem; */
  text-transform: uppercase;
  ${props => props.active && `
    color: #000;
  `}
`;

const Icon = styled.img`
  align-items: flex-start;
  margin-left: 25px;
  width: 25px;
  height: 24px;
`;
const IconWrap = styled.div`
  
`;

export const BusinessFilters = () => (
  <Bar wide="true">
    <Filter wide="true">
      <Option active="true">Все</Option>
      <Option>Микро</Option>
      <Option>Малый</Option>
      <Option>Средний</Option>
    </Filter>
    <Filter>
      <Option active="true">Все</Option>
      <Option>ЮЛ</Option>
      <Option>ИП</Option>
    </Filter>
  </Bar>
)

const Navigation = () => {
  const subjects = 39026;
  const workers = 58102;
  const products = 39;

  return (
    <Nav>
      {/* <BusinessFilters /> */}
      <Bar>
        <RegionInfo>
          <Region>Субъектов <Number>{subjects.toLocaleString()}</Number></Region>
          <Region>Работников <Number>{workers.toLocaleString()}</Number></Region>
          <Region>Продукции <Number>{products.toLocaleString()}</Number></Region>
        </RegionInfo>
        <IconWrap>
          <Icon src={worldIcon} />
          <Icon src={statIcon} />
        </IconWrap>
      </Bar>
    </Nav>
  );
}

export default Navigation;