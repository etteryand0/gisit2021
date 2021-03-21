import React from 'react';
import styled from 'styled-components';
import searchIcon from './searchIcon.svg';

const Headr = styled.header`
  display: flex;
  height: 10vh;
  flex-direction: row;
  /* align-items: center; */
  margin-top: 5vh;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 3rem;
  color: rgba(44, 43, 44, 1);
`;

const Icons = styled.div`
  display: flex;
  width: 18vw;
  justify-content: space-between;
  flex-direction: row;
`;

const Button = styled.button`
  all: unset;
  width: 150px;
  height: 50px;
  background-color: #E38C3B;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color:#F8F8F8;
  font-weight: 700;
  text-transform: uppercase;
`;

const Header = () => {
  return (
    <Headr>
      <Logo>IBY</Logo>
      <Icons>
        <Button>Связь</Button>
        <img src={searchIcon} alt="Search" width={36} height={36} />
      </Icons>
    </Headr>
  );
}

export default Header;