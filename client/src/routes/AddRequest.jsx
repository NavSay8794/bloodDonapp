import React, { useState } from "react";
import { createRequest } from "../utils/axiosutil";

const AddRequest = () => {
  const [title, setTitle] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [unit, setUnit] = useState("");
  const [hospital, setHospital] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");

  const handleAddRequestSubmit =  async (e) => {
    e.preventDefault();
    const newRequest = {
      title: title,
      bloodg: bloodGroup,
      unit: unit,
      hospital: hospital,
      contact: phone,
      city: city,
      description: description,
    };

    const resp = await createRequest(newRequest)

    if(resp.status == 201){
      navigate('/bloodReq')
    }
  };
  return (
    <div>
      <h2>AddRequest</h2>
      <form onSubmit={handleAddRequestSubmit}>
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={bloodGroup}
          placeholder="Blood Group"
          onChange={(e) => setBloodGroup(e.target.value)}
        />
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <input
          type="text"
          value={hospital}
          placeholder="Hospital"
          onChange={(e) => setHospital(e.target.value)}
        />

        <input
          type="text"
          value={phone}
          placeholder="Contact Number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          type="text"
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
        />

        <textarea
          type="text"
          value={description}
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
          maxLength={200}
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default AddRequest;
