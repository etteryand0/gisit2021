import React, {useState} from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import styled from 'styled-components';
import './transparentMap.css';
import geojson from './ulusPolygons';

const defineUlus = (e, layer, setUlusTitle, setShowShortData) => {
  layer.setStyle({fillColor:'#E38C3B'});
  setUlusTitle(e.target.feature.properties.name);
  setShowShortData(true);
}

const undefineUlus = (layer, setShowShortData) => {
  layer.setStyle({fillColor: '#fff'});
  setShowShortData(false);
}

const MapWrap = styled.div`
  position: absolute;
  width: 100vw;
  height: 83vh;
  left: 0;
  top: 17vh;
`;

const ShortDataWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ShortData = styled.div`
  border-radius: 0.625rem;
  width: 15vw;
  height: 50vh;
  background: blue;
`;

const Map = () => {
  const [showShortData, setShowShortData] = useState(false);
  const [ulusTitle, setUlusTitle] = useState('Якутск');

  return (
    <>
      <MapWrap>
        <MapContainer 
          center={[67.943, 130.096]} // [67.713, 134.2]
          zoomSnap={0.25} 
          zoom={3.5}
          style={{width: '100%', height: '100%'}}
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
                // click: defineUlus, 
                mouseover: (e) => defineUlus(e, layer, setUlusTitle, setShowShortData),
                mouseout: () => undefineUlus(layer, setShowShortData),
                // mouseover: () => layer.setStyle({fillColor:'#E38C3B'}),
                // mouseout: () => layer.setStyle({fillColor: '#fff'}),
              })} 
            style={mapStyle} 
          />
        </MapContainer>
      </MapWrap>
      { showShortData && <ShortDataWrap>
        <ShortData>
          {ulusTitle}
        </ShortData>
      </ShortDataWrap>}
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