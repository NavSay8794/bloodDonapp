import React, { useEffect, useState } from "react";
import { getAllRequests } from "../utils/axiosutil";
import { Link } from "react-router-dom";

const Home = () => {
  const [openReq, setOpenReq] = useState([]);

  const getAllRequestsData = async () => {
    const resp = await getAllRequests();
    setOpenReq(resp.data.reqsData);
  };

  useEffect(() => {
    getAllRequestsData();
  }, []);

  return (
    <div>
      <h1>Requests</h1>
      {openReq.length === 0 ? (
        <h1>Welcome to Blood Donation Request App</h1>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            className="requests-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Title
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Status
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  View Request Details
                </th>
              </tr>
            </thead>
            <tbody>
              {openReq.map((item) => {
                return (
                  <tr>
                    <td>{item.title}</td>
                    <td>{item.status}</td>
                    <td>
                      <Link to={`/bloodRequest/${item._id}`}>View</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Home;
