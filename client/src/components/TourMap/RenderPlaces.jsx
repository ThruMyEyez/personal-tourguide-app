import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from "react-leaflet";
import { Icon } from "leaflet";
import LocationIco from "../../assets/locationPoint.svg";

import "leaflet/dist/leaflet.css";

const RenderPlaces = ({ ItemPlaces }) => {
  const [places, setPlaces] = useState(null);
  const [polylineProps, setPolylineProps] = useState([]);

  useEffect(() => {
    // useEffect for getting the polylines props
    setPolylineProps(
      places.reduce((prev, curr) => {
        prev.push(curr.position);
        return prev;
      }, [])
    ); // startPlace is the center of the Map, here could be a empty array
  }, [places]);

  //Adding a custom marker
  const locationIcon = new Icon({
    iconUrl: LocationIco,
    iconSize: [52, 52],
  });

  return <div>RenderPlaces</div>;
};

export default RenderPlaces;
