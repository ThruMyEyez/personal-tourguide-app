import { useState } from "react";
import { Marker, useMapEvents } from "react-leaflet";
import { LatLng, LatLngExpression } from "leaflet";

const AddPlace = () => {
    const [position, setPosition] = useState(null);


    useMapEvents({
        click: (e) => {
            setPosition(e.latlng);
        }
    })
  return (
    <div>AddPlace</div>
  )
}

export default AddPlace