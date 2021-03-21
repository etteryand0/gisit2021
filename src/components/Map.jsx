import React, {useState} from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import './transparentMap.css';
import geojson from './ulusPolygons';
import {useQuery, gql} from '@apollo/react-hooks';

const BUSINESS_NAME = (uuid) => { return gql`
  query {
    getBusiness(uuid:${uuid}) {
      name
    }
  }
`};

const BusinessName = () => {
  const { loading, error, data } = useQuery(BUSINESS_NAME(1))

  if (loading) return 'Loading...'
  if (error) return `Error! ${error}`
  
  return (
      <>
        {data.getBusiness.name}
      </>
  )
}

const defineUlus = (e, layer, setUlusTitle, setShowShortData) => {
  layer.setStyle({fillColor:'#E38C3B'});
  setUlusTitle(e.target.feature.properties.name);
  setShowShortData(true);
}

const undefineUlus = (layer, setShowShortData) => {
  layer.setStyle({fillColor: '#fff'});
  setShowShortData(false);
}

const ulusDetails = (e, setShowModal, setUlus) => {
  setUlus(e.target.feature.properties)
  setShowModal(true)
}

const MapWrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 83vh;
  left: 0;
  top: 17vh;
  display: inherit;

  ${props => props.display && `display: none` } 
`;

const ShortDataWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  transition: 2;

  ${props => !props.visible && `
    display: none;
  `}
`;

const ShortData = styled.div`
  border-radius: 0.625rem;
  width: 15vw;
  height: 50vh;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Map = (props) => {
  const [showShortData, setShowShortData] = useState(false);
  const [ulusTitle, setUlusTitle] = useState('Якутск');

  const map = {
    width:'100%', height:'100%',
    display: props.showModal && 'none'
  }

  return (
    <>
      {/* <BusinessName /> */}
      <MapWrap display={props.showModal}>
        <MapContainer 
          center={[67.943, 130.096]} // [67.713, 134.2]
          zoomSnap={0.25} 
          zoom={3.75}
          style={map}
          zoomControl={false}
          doubleClickZoom={false}
          dragging={false}
          scrollWheelZoom={false}
        >
          {/* <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          /> */}
          <GeoJSON 
            data={geojson} 
            onEachFeature={(feature, layer) => layer.on({
                click: (e) => ulusDetails(e, props.setShowModal, props.setUlus), 
                mouseover: (e) => defineUlus(e, layer, setUlusTitle, setShowShortData),
                mouseout: () => undefineUlus(layer, setShowShortData),
              })} 
            style={mapStyle} 
          />
        </MapContainer>
      </MapWrap>
      <ShortDataWrap visible={showShortData}>
        <ShortData>
          {ulusTitle}
        </ShortData>
      </ShortDataWrap>
    </>
  );
}

const mapStyle = {
  color:'#000', 
  fillColor: '#fff', 
  opacity:1,
  weight:0.8,
  ShadowRoot: 1,
  fillOpacity: 1,
}

export default Map;