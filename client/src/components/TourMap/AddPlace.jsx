import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IKContext, IKUpload, IKImage } from "imagekitio-react";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from "react-leaflet";
import { saveNewPlace } from "../../services/place";
import { AuthContext } from "../../context/authentication";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const NewPosition = ({ setNewPosition }) => {
  const map = useMapEvents({
    click: (e) => {
      //map.locate(); // locate user position
      const { lat, lng } = e.latlng;
      setNewPosition([lat, lng]);
    },
    dblclick: (e) => {
      map.setView(e.latlng);
    },
    /*locationfound: (location) => {
      console.log("location found:", location);
    },*/
  });
  return null;
};

const AddPlace = () => {
  const [position, setPosition] = useState(null);
  const [formData, setFormData] = useState({
    // userId: "",
    title: "",
    description: "",
    picture: "",
    moreLink: "",
    position: [],
  });
  const { user, authenticateUser, isLoading, isLoggedIn } = useContext(AuthContext);

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
    // send data to backend

    /* // For Testing of geting all places. Works!
    getProviderPlaces(formData).then((response) => {
      console.log(response.data);
    }); */

    /* // For Testing of editing place. Works!
      editPlace(formData, "63bcb24f8c6d32268c1ba634").then((response) => {
      console.log(response.data);
    }); */

    /* // For testing of deletion of a Place. Works! 
    deletePlace("63bcb4bc5680e3ac211eaeaa").then((response) => {
      console.log(response.data);
    }); */

    saveNewPlace(formData)
      .then((response) => {
        if (response.status === 201) {
          console.log(response.data.message);
          navigate("/dashboard");
        }
        //if (response.status === 204) console.log(response);
        console.log(response.data.message);
      })
      .catch((error) => {
        if (error.response.status === 409) console.log(error.response.data.error.message);
        console.log(error.response.data.message);
      });
  };

  const icon = L.icon({
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    iconUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7/dist/images/marker-shadow.png",
  });

  useEffect(() => {
    console.log("POSITION :", position);
    console.log("current formData :", formData);
    setFormData({ ...formData, position: position });
  }, [position]);

  return (
    <MapContainer
      center={[49.4, 11.04]}
      zoom={13}
      doubleClickZoom={false}
      closePopupOnClick={false}
      style={{ height: "600px", width: "800px" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <NewPosition setNewPosition={setPosition} currentPosition={position} />
      {position && (
        <Marker position={position} icon={icon}>
          <Popup minWidth="400" closeButton={true} closeOnClick={true}>
            <form className="w-full" onSubmit={handleFormSubmit}>
              <label className="block" htmlFor="input-title">
                <span className="form-label">Title</span>
              </label>
              <input
                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
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
                <IKUpload onSuccess={onFileUploadSuccess} onError={onFileUploadError} />
                {formData.picture && (
                  <IKImage
                    className="mx-auto"
                    src={formData.picture}
                    //path="/hqdefault_eeAM2KBS6.jpg"
                    transformation={[
                      {
                        height: "150",
                        width: "auto",
                      },
                    ]}
                  />
                )}
              </IKContext>
              <button className="w-full btn-primary">save place</button>
            </form>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default AddPlace;
