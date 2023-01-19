import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import { Editor } from "../Editor";
import { getProviderPlaces } from "../../services/place";
import { createEventItem, updateEventItem } from "../../services/product";
import { Selector } from "../UI";
import "react-datepicker/dist/react-datepicker.css";
import { OnErrorAlert } from "../UI/Alerts";
import { CloseNavigateBtn } from "../UI";

const HandleProductItem = ({ productItem }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(
    (productItem && JSON.parse(productItem.description)) || ""
  );
  const [eventDate, setEventDate] = useState(new Date());
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [providerPlaces, setProviderPlaces] = useState([]);
  const [isPlacesLoading, setIsPlacesLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // On Update set productItem current places to selectedPlaces
    if (productItem) {
      setTitle(productItem.title);
      productItem.places.map((place) => {
        place.value = place._id;
        place.label = place.title;
        return place;
      });

      setSelectedPlaces(productItem.places);
    }

    getProviderPlaces()
      .then((response) => {
        response.data.data.map((place) => {
          place.value = place._id;
          place.label = place.title;
          return place;
        });
        setProviderPlaces(response.data.data);
        setIsPlacesLoading(false);
      })
      .catch((error) => {
        setErrorMsg(error.response.data.error.message);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const placeIDs = selectedPlaces?.map((place) => {
      return place._id;
    });
    // On Update
    if (productItem) {
      updateEventItem(
        {
          description: JSON.stringify(description),
          title: title,
          eventDate: eventDate,
          places: placeIDs,
        },
        productItem._id
      )
        .then((response) => {
          navigate("/dashboard/my-events");
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error.message);
        });
    } else {
      // On Create
      createEventItem({
        description: JSON.stringify(description),
        title: title,
        eventDate: eventDate, //new Date("2023-01-21"),
        places: placeIDs,
      })
        .then((response) => {
          navigate("/dashboard/my-events");
        })
        .catch((error) => {
          setErrorMsg(error.response.data.error.message);
        });
    }
  };

  const handleInput = (e) => {
    setTitle(e.target.value);
  };

  const handleSelect = (data) => {
    setSelectedPlaces(data);
  };

  useEffect(() => {
    console.log(description);
  }, [description]);

  return (
    <div className="w-full p-3 border border-sky-600">
      <div className="mx-auto space-y-4">
        <CloseNavigateBtn navigateTo={"/dashboard/"} />
        {(!productItem && <h2>Create a new Tour or Event</h2>) || (
          <h2>Edit "{productItem.title}" Data</h2>
        )}

        {errorMsg && <OnErrorAlert msg={errorMsg} />}

        {/* Input productItem Title */}
        <form onSubmit={handleFormSubmit}>
          <label className="block" htmlFor="input-title">
            <span className="form-label">Event or Tour title</span>
          </label>
          <input
            className="block w-full my-1 border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            id="input-title"
            type="text"
            name="title"
            value={title}
            onChange={handleInput}
          />
          {/* Select Multiple Places */}
          <label className="">
            <span className="form-label">Set the Places for the Tour or Event</span>
          </label>
          <Selector
            value={selectedPlaces}
            options={providerPlaces}
            handleChange={handleSelect}
            loading={isPlacesLoading}
            isMulti
            placeholder="Search & select your places for the tour or event."
          />

          {/* DatePicker */}
          <label className="">
            <span className="form-label">When your Tour or Event takes place?</span>
          </label>
          <DatePicker
            className="my-1 text-center border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            selected={eventDate}
            onChange={(date) => setEventDate(date)}
          />
          {/* WYSIWYG Editor Input */}
          <label className="">
            <span className="form-label">Create a detailed Tour or Event description</span>
          </label>
          <Editor
            className="my-1 text-center border border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            content={description}
            setDescription={setDescription}
          />

          <button className="btn-primary">Save Tour or Event in Database</button>
        </form>
      </div>
    </div>
  );
};

export default HandleProductItem;
