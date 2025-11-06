import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteRequest, getRequest } from "../utils/axiosutil";

const RequestDetail = (props) => {

  const [selReq, setSelReq] = useState({})
  const navigate = useNavigate()

  const reqId = useParams()
  const fetchreqdetail = async ()=>{
    const requestDetails = await getRequest(reqId.id)
    setSelReq(requestDetails.data.selectedRequest)
  }


  const handleUpdate = () => {
    navigate(`/update-request/${selReq._id}`,{state: {request: selReq}} )
  };

  const handleDelete = async () => {
    const resp = await deleteRequest(selReq._id)
    if(resp.status === 200){
        navigate('/')
    }
  };

  useEffect(()=>{
    fetchreqdetail()
  },[])


  return (
    <div className="request-detail-card">
      <div className="request-detail-header">
        <h2 className="request-title">{selReq?.title || "Untitled Request"}</h2>
        <div
          className={`selreq?.status-badge ${selReq?.status ? String(selReq?.status).toLowerCase() : "unknown"}`}
          aria-hidden
        >
          {selReq?.status || "N/A"}
        </div>
      </div>

      <div className="request-detail-grid">
        <div className="field">
          <span className="label">Blood Group</span>
          <span className="value">{selReq?.bloodg || "N/A"}</span>
        </div>

        <div className="field">
          <span className="label">Units</span>
          <span className="value">{selReq?.unit || "N/A"}</span>
        </div>

        <div className="field">
          <span className="label">Hospital</span>
          <span className="value">{selReq?.hospital || "N/A"}</span>
        </div>

        <div className="field">
          <span className="label">Contact</span>
          <span className="value">{selReq?.contact || "N/A"}</span>
        </div>

        <div className="field">
          <span className="label">City</span>
          <span className="value">{selReq?.city || "N/A"}</span>
        </div>

        <div className="field full">
          <span className="label">Description</span>
          <p className="value description">{selReq?.description || "-"}</p>
        </div>
      </div>

      <div className="request-detail-actions">
        <button className="btn btn-update" onClick={handleUpdate} aria-label="Update request">
          Update
        </button>
        <button className="btn btn-delete" onClick={handleDelete} aria-label="Delete request">
          Delete
        </button>
      </div>
    </div>
  );
};

export default RequestDetail;
