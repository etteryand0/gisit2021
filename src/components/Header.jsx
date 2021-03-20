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

const Header = () => {
  return (
    <Headr>
      <Logo>IBY</Logo>
      <img src={searchIcon} alt="Search" width={36} height={36} />
    </Headr>
  );
}

export default Header;