import React from 'react';
import { useLocation } from 'react-router-dom';
import { useQuery, gql } from '@apollo/react-hooks'
import styled from 'styled-components';

const Table = styled.table`
  border-spacing: 0;
  min-width: 90vw;
`;

const Head = styled.thead`
  background: #c4c4c4;
  font-size: 18px;
`;

const Body = styled.tbody`
  font-size: 11px;
`;

const Row = styled.tr`

`;

const Item = styled.td`
  padding-left: 10px;
  border: 1px #000 solid;
  padding-top: 5px;
  padding-bottom: 5px;
`;


const FILTER_BUSINESS = ({
  businessType,
  type, area,
  licensed, recreated,
  size
}) => {
  let query;

  if (licensed && recreated) {
    query = gql`
      query {
        filterBusinesses(
          area: ${area}, licensed: ${licensed}, size: ${size},
          recreated: ${recreated}, businessType: "${businessType}", 
          type_: ${type} ) {
            name
            businessType
            size
            OGRN
            INN
            type
            area
            recreated
            licensed
        } 
      }
    `;
  } else if (licensed) {
    query = gql`
      query {
        filterBusinesses(
          area: ${area}, licensed: ${licensed}, size: ${size}, 
          businessType: "${businessType}", 
          type_: ${type} ) {
            name
            businessType
            size
            OGRN
            INN
            type
            area
            recreated
            licensed
        }
      }
    `;
  } else if (recreated) {
    query = gql`
      query {
        filterBusinesses(
          area: ${area}, recreated: ${recreated}, size: ${size}, 
          businessType: "${businessType}", 
          type_: ${type} ) {
            name
            businessType
            size
            OGRN
            INN
            type
            area
            recreated
            licensed
        }
      }
    `;
  } else {
    query = gql`
      query {
        filterBusinesses(
          area: ${area}, 
          businessType: "${businessType}", 
          type_: ${type} ) {
            name
            businessType
            size
            OGRN
            INN            
            type
            area
            recreated
            licensed
        }
      }
    `;
  }
  return query;
}


const Details = () => {
  const { query: { query } } = useLocation();
  const { loading, error, data } = useQuery(FILTER_BUSINESS(query));

  if (loading) { return 'Загрузка...' }
  if (error) { return 'Ошибка! ' + error.message }

  let numeration = 0;
  return (
    <Table>
      <Head>
        <Row>
          <Item>№</Item>
          <Item>Название</Item>
          <Item>Тип</Item>
          <Item>Размер</Item>
          <Item>ОГРН</Item>
          <Item>ИНН</Item>
          <Item>Род деятельности</Item>
          <Item>Улус</Item>
          <Item>Воссозданный</Item>
          <Item>Лицензия</Item>
        </Row>
      </Head>
      <Body>
        {
          data.filterBusinesses.map(({name, businessType, type, size, area, recreated, licensed, OGRN, INN}) => {
            numeration += 1;

            return (
              <Row key={numeration}>
                <Item style={{ textAlign: 'center', fontSize: 14 }}>{numeration}</Item>
                <Item>{name}</Item>
                <Item>{businessType === 'I' ? "ИП" : "ЮЛ"}</Item>
                <Item>{size === 'MICRO' ? "Микро" : size === 'SMALL' ? "Мелкий" : "Средний"}</Item>
                <Item>{OGRN}</Item>
                <Item>{INN}</Item>
                <Item>{type}</Item>
                <Item>{area}</Item>
                <Item>{recreated ? "Да" : "Нет"}</Item>
                <Item>{licensed ? "Да" : "Нет"}</Item>
              </Row>
            )
          })
        }
      </Body>
    </Table>
  );
}

export default Details;