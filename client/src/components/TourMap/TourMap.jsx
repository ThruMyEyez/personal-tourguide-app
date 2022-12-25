import { useState, useEffect, useContext } from "react";
import { TourMapContext } from "../../context/tourmapping";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from "react-leaflet";
import { Icon } from "leaflet";
import LocationIco from "../../assets/locationPoint.svg";
import "leaflet/dist/leaflet.css";

const TourMap = ({ startPlace }) => {
  const { places, togglePreview, setNewPreviewPlace, previewPlace } =
    useContext(TourMapContext);
  const [polylineProps, setPolylineProps] = useState([]);

  useEffect(() => {
    // useEffect for getting the polylines props
    setPolylineProps(
      places.reduce(
        (prev, curr) => {
          prev.push(curr.position);
          return prev;
        },
        [startPlace]
      )
    ); // startPlace is the center of the Map, here could be a empty array
  }, [places]);

  //Adding a custom marker
  const locationIcon = new Icon({
    iconUrl: LocationIco,
    iconSize: [52, 52],
  });

  const showPreview = (place) => {
    setNewPreviewPlace(place);
    togglePreview(true);
    console.log("PreviewPlace", previewPlace);
  };

  return (
    <MapContainer
      center={startPlace}
      zoom={13}
      scrollWheelZoom={true}
      style={{ height: "500px", width: "100%" }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={polylineProps} />
      {places.map((place) => (
        <Marker
          key={place.title}
          position={place.position}
          eventHandlers={{ click: () => showPreview(place) }}
          icon={locationIcon}
        >
          {" "}
          <Tooltip>{place.title}</Tooltip>{" "}
        </Marker>
      ))}
      <Marker position={startPlace} icon={locationIcon}>
        <Popup>
          CSS3 popup 🎉 <br /> Place every kind of data here.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default TourMap;
