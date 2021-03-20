import React from 'react';
import styled from 'styled-components';

import worldIcon from './world.svg';
import statIcon from './statistics.svg';

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  /* padding-top: 35px; */
`;

const Bar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${props => props.wide && `
    height: 10vh;
    align-items: center;
  `}
`;

const Filter = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  width: 20%;
  ${props => props.wide && `
    width: 50%;
  `}
`;

const RegionInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
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

const Option = styled.div`
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

const Navigation = () => {
  const subjects = 39026;
  const workers = 58102;
  const products = 39;

  return (
    <Nav>
      <Bar wide="true">
        <Filter wide="true">
          <Option active="true">Все</Option>
          <Option>Мелкий</Option>
          <Option>Маленький</Option>
          <Option>Средний</Option>
        </Filter>
        <Filter>
          <Option active="true">Все</Option>
          <Option>ЮЛ</Option>
          <Option>ИП</Option>
        </Filter>
      </Bar>
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