import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const UpdateRequest = () => {
  const location = useLocation();
  const params = useParams();

  // Try to get initial data from navigation state (RequestDetail should pass it)
  const initial = (location && location.state && location.state.request) || {};

  const [title, setTitle] = useState(initial.title || "");
  const [bloodGroup, setBloodGroup] = useState(initial.bloodg || "");
  const [unit, setUnit] = useState(initial.unit || "");
  const [hospital, setHospital] = useState(initial.hospital || "");
  const [phone, setPhone] = useState(initial.contact || "");
  const [city, setCity] = useState(initial.city || "");
  const [description, setDescription] = useState(initial.description || "");

  // If the user navigated without state but with an id, we don't fetch here
  // (the update handler / fetch can be implemented later). For now, keep
  // fields empty if no state was provided.
  useEffect(() => {
    // If location.state changes (e.g., navigation), update fields
    if (location && location.state && location.state.request) {
      const r = location.state.request;
      setTitle(r.title || "");
      setBloodGroup(r.bloodg || "");
      setUnit(r.unit || "");
      setHospital(r.hospital || "");
      setPhone(r.contact || "");
      setCity(r.city || "");
      setDescription(r.description || "");
    }
  }, [location]);

 const handleUpdateRequestSubmit =  async (e) => {
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
    <div className="update-request-form" style={{ maxWidth: 720, margin: "18px auto" }}>
      <h2>Update Request</h2>
      <form onSubmit={handleUpdateRequestSubmit}>
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
          placeholder="Units"
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

        <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
          <button type="submit">Update</button>
          <button type="button" onClick={() => window.history.back()}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateRequest;
