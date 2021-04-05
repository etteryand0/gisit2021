import React, {useState} from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import './transparentMap.css';
import geojson from './ulusPolygons';

const defineUlus = (e, layer, setUlusShort, setShowShortData) => {
  layer.setStyle({fillColor:'#E38C3B'});
  setUlusShort(e.target.feature.properties);
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
  width: 100%;
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
  height: 30vh;
  background: white;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
`;

const Map = (props) => {
  const [showShortData, setShowShortData] = useState(false);
  const [ulusShort, setUlusShort] = useState({id:0,name:'',population:1});

  const map = {
    width:'100%', height:'100%',
    display: props.showModal && 'none'
  }

  return (
    <>
      <MapWrap display={props.showModal ? "true" : undefined}>
        <MapContainer 
          center={[67.943, 130.096]} // [67.713, 134.2]
          zoomSnap={0.25} 
          zoom={3.75}
          style={map}
          zoomControl={true}
          doubleClickZoom={false}
          dragging={true}
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
                mouseover: (e) => defineUlus(e, layer, setUlusShort, setShowShortData),
                mouseout: () => undefineUlus(layer, setShowShortData),
              })} 
            style={mapStyle} 
          />
        </MapContainer>
      </MapWrap>
      <ShortDataWrap visible={showShortData}>
        <ShortData>
          <ShortTitle>
            {ulusShort.name}
          </ShortTitle>
          <Column>
            <Bald>Население</Bald>
            <Value>{ulusShort.population}</Value>
          </Column>
        </ShortData>
      </ShortDataWrap>
    </>
  );
}

const ShortTitle = styled.div`
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`;
const mapStyle = {
  color:'#000', 
  fillColor: '#fff', 
  opacity:1,
  weight:0.8,
  ShadowRoot: 1,
  fillOpacity: 1,
}
const Column = styled.div`
  flex-direction: column;
  display: flex;
  flex-grow: 1;

  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Bald = styled.div`
  font-weight: 600;
`;
const Value = styled.div`
  margin-left: 10px;
  font-weight: 500;
  font-size: 18px;
  flex-grow: 1;
`;


export default Map;