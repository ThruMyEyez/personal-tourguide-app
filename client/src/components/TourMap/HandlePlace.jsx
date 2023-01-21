import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IKContext, IKUpload, IKImage } from "imagekitio-react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
} from "react-leaflet";
import { saveNewPlace, editPlace } from "../../services/place";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

const NewPosition = ({ setNewPosition, frozenPosition }) => {
  const map = useMapEvents({
    click: (e) => {
      //map.locate(); // locate user position
      const { lat, lng } = e.latlng;
      !frozenPosition && setNewPosition([lat, lng]);
    },
    dblclick: (e) => {
      map.setView(e.latlng);
    },
  });
  return null;
};

const HandlePlace = ({ place }) => {
  const [position, setPosition] = useState(place ? place.position : null);
  const [freezePosition, setFreezePosition] = useState(true);
  const [formData, setFormData] = useState(
    place
      ? place
      : {
          // userId: "",
          title: "",
          description: "",
          picture: "",
          moreLink: "",
          position: [],
        }
  );

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { value, name } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onFileUploadSuccess = (ikPicture) => {
    const { url } = ikPicture;
    console.log("File UploadSuccess", ikPicture);
    setFormData({ ...formData, picture: url });
  };

  const onFileUploadError = (ikUploadErr) => {
    console.log("File UploadError", ikUploadErr);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (place) {
      delete formData.__v;
      editPlace(formData, place._id).then((response) => {
        console.log(response.data);
        navigate(-1);
      });
    } else {
      saveNewPlace(formData)
        .then((response) => {
          if (response.status === 201) {
            console.log(response.data.message);
            navigate(-1);
          }
          //if (response.status === 204) console.log(response);
          console.log(response.data.message);
        })
        .catch((error) => {
          if (error.response.status === 409)
            console.log(error.response.data.error.message);
          console.log(error.response.data.error.message);
        });
    }
  };

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
  });
  useEffect(() => {
    !place && setFreezePosition(false);
  }, []);

  useEffect(() => {
    (!freezePosition && null) ||
      setFormData({ ...formData, position: position });
  }, [position]);

  return (
    <>
      {place && (
        <label className="justify-end mr-3 cursor-pointer label">
          <span className="mr-3 label-text">Freeze current Position</span>
          <input
            type="checkbox"
            className="checkbox checkbox-primary focus:outline-0"
            onChange={() => {
              setFreezePosition(!freezePosition);
            }}
            checked={freezePosition}
          />
        </label>
      )}
      <MapContainer
        center={place?.position ? place.position : [49.4, 11.04]}
        zoom={place?.position ? 13 : 5}
        //whenReady={() => {}}
        doubleClickZoom={false}
        closePopupOnClick={false}
        className="w-full rounded-lg h-[90%]"
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <NewPosition
          setNewPosition={setPosition}
          frozenPosition={freezePosition}
        />
        {position && (
          <Marker position={position} icon={icon}>
            <Popup minWidth="400" closeButton={true} closeOnClick={true}>
              <form className="w-full" onSubmit={handleFormSubmit}>
                <label className="block" htmlFor="input-title">
                  <span className="form-label">Title</span>
                </label>
                <input
                  className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  id="input-title"
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInput}
                  placeholder="Title"
                />
                <label className="block" htmlFor="input-description">
                  <span className="form-label">Description</span>
                </label>
                <textarea
                  className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  id="input-description"
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInput}
                  placeholder="description"
                  rows="4"
                  cols="64"
                ></textarea>

                <label className="block" htmlFor="input-more-link">
                  <span className="form-label">Read-more</span>
                </label>
                <input
                  className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  id="input-more-link"
                  type="text"
                  name="moreLink"
                  value={formData.moreLink}
                  onChange={handleInput}
                  placeholder="https://en.wikipedia.org/wiki/Fernsehturm_Berlin"
                />

                <IKContext
                  urlEndpoint={process.env.REACT_APP_IMAGEKIT_URL}
                  publicKey={process.env.REACT_APP_IMAGEKIT_PUBLIC_KEY}
                  authenticationEndpoint={
                    process.env.REACT_APP_SERVER_POINT +
                    process.env.REACT_APP_IMAGEKIT_AUTHENTICTION_ENDPOINT
                  }
                >
                  <IKUpload
                    className="w-full max-w-xs mx-auto my-2 text-sm file-input file-input-bordered file-input-primary"
                    onSuccess={onFileUploadSuccess}
                    onError={onFileUploadError}
                  />
                  {formData.picture && (
                    <IKImage
                      className="mx-auto my-3 rounded-md shadow-lg hover:shadow-xl"
                      src={formData.picture}
                      transformation={[
                        {
                          height: "160",
                          width: "auto",
                        },
                      ]}
                    />
                  )}
                </IKContext>
                <button className="w-full btn-primary">Save place</button>
              </form>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </>
  );
};

export default HandlePlace;
