import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DatePicker from "react-datepicker";
//import { AddPlace } from "../TourMap";
import { Editor } from "../Editor";
import { getProviderPlaces } from "../../services/place";
import { createEventItem } from "../../services/product";

import React from "react";

const NewProductItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date());
  const [selectedPlaces, setSelectedPlaces] = useState([]); // push only placeIDs
  const [providerPlaces, setProviderPlaces] = useState(null);

  const options = [
    { value: "place0", label: "place0" },
    { value: "place1", label: "place1" },
    { value: "place2", label: "place2" },
  ];

  const navigate = useNavigate();

  useEffect(() => {
    getProviderPlaces()
      .then((result) => {
        console.log(result.data);
        setProviderPlaces(result.data.data); // Need more than just the ID
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
        console.log(error);
      });
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    createEventItem({
      description: JSON.stringify(description),
      title: title,
      eventDate: eventDate, //new Date("2023-01-21"),
      places: selectedPlaces,
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.response.data.error.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(providerPlaces);
  };

  const handleInput = (e) => {
    const { value, name } = e.target;
    setTitle(value);
  };

  useEffect(() => {
    console.log(description);
  }, [description]);

  return (
    <div className="w-full p-3 border border-sky-600">
      <div className="mx-auto space-y-4 ">
        <h1>Create a new Tour or Event</h1>

        <button onClick={() => navigate(-1)}>X</button>
        {/* <AddPlace /> */}

        <form onSubmit={handleFormSubmit}>
          <label className="block" htmlFor="input-name">
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

          <label className="block" htmlFor="input-description">
            <span className="form-label">Set the Places for the Tour or Event</span>
          </label>
          <Select className="my-1" isMulti={true} options={options} />

          <DatePicker selected={eventDate} onChange={(date: Date) => setEventDate(date)} />

          <label className="block" htmlFor="input-description">
            <span className="form-label">Create a detailed Tour or Event description</span>
          </label>
          <Editor
            description={description}
            setDescription={setDescription}
            handleFormSubmit={handleFormSubmit}
          />
          <button className="btn-primary">create new productItem</button>
        </form>
        <form onSubmit={handleSubmit}>
          <button className="btn-primary">Test</button>
        </form>
      </div>
    </div>
  );
};

export default NewProductItem;
