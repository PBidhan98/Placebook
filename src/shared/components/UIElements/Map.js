import React, { useRef, useEffect } from 'react';
// useRef is used to create references, to reference a pointer at a real DOM Node and also can create variables which survive rerender cycles of the component and don't loose their values

import './Map.css';

const Map = props => {
  const mapRef = useRef();
  // when it renders from top to bottom then we initialise the Ref, but the connection has not yet been established becoz <div> hasn't executed yet
  // in next step we are rendering the map in that place, but connection wasn't established yet
  // so this can't work thus google maps can't find out where to render this 
  const { center, zoom } = props;
// It allows you to register some logic (i.e. a JS function) which will be executed when certain dependencies - which you define - change.
// here dependencies are center and zoom, Whenever at least one of these two dependencies changes, the function re-runs.
  useEffect(() => {
    new window.ol.Map({
      target: mapRef.current.id,
      layers: [
        new window.ol.layer.Tile({
          source: new window.ol.source.OSM()
        })
      ],
      view: new window.ol.View({
        center: window.ol.proj.fromLonLat([center.lng, center.lat]),
        zoom: zoom
      })
    });
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      // react sets up a magic connection btw this div and mapRef constant, in the end we store a pointer to this div in the mapRef contant
      className={`map ${props.className}`}
      style={props.style}
      id="map"
    ></div>
  );
};

export default Map;
