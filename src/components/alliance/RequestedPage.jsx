import React, { useState, useEffect } from 'react';
import Transport from '../../api/transport';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AllRequestedPage = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState({});
  const [youthEnterprises, setYouthEnterprises] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await Transport.HTTP.getAllRequests();
        let relevantRequests = [];
        if (user.role === 'allianceAdmin') {
          relevantRequests = response.data;
        } else {
          relevantRequests = response.data.filter(request => request.enterpriseId === user.id);
        }
        setRequests(relevantRequests);

        const userIds = relevantRequests.map(request => request.requesterId);
        const enterpriseIds = relevantRequests.map(request => request.enterpriseId);

        const userRequests = await Promise.all(userIds.map(id => Transport.HTTP.getUserById(id)));
        const enterpriseRequests = await Promise.all(enterpriseIds.map(id => Transport.HTTP.getYouthEnterpriseById(id)));

        const userMap = userRequests.reduce((acc, curr) => {
          acc[curr.data.id] = curr.data;
          return acc;
        }, {});

        const enterpriseMap = enterpriseRequests.reduce((acc, curr) => {
          acc[curr.data.id] = curr.data;
          return acc;
        }, {});

        setUsers(userMap);
        setYouthEnterprises(enterpriseMap);
      } catch (error) {
        console.error('Failed to fetch requests', error);
      }
    };

    fetchRequests();
  }, [user.id, user.role]);

  const handleUpdateStatus = async (requestId, newStatus) => {
    try {
      await Transport.HTTP.updateRequest(requestId, { status: newStatus });
      setRequests((prevRequests) =>
        prevRequests.map((req) =>
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );
    } catch (error) {
      console.error('Failed to update request status', error);
    }
  };

  const handleViewDetails = (requestId) => {
    navigate(`/request-details/${requestId}`);
  };

  return (
    <div className="table-container">
      <h1>Requests to All Enterprises</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Status</th>
            <th>Requester</th>
            <th>Youth Enterprise</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.description}</td>
              <td>{request.status}</td>
              <td>{users[request.requesterId] ? users[request.requesterId].username : 'Loading...'}</td>
              <td>{youthEnterprises[request.enterpriseId] ? youthEnterprises[request.enterpriseId].name : 'Loading...'}</td>
              <td>
                <div className="btn-container">
                  {request.status === 'pending' && (
                    <>
                      <button
                        className="btn btn-success"
                        onClick={() => handleUpdateStatus(request.id, 'accepted')}
                      >
                        Accept
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleUpdateStatus(request.id, 'rejected')}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  {request.status === 'accepted' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleUpdateStatus(request.id, 'completed')}
                    >
                      Complete
                    </button>
                  )}
                  <button
                    className="btn btn-info"
                    onClick={() => handleViewDetails(request.id)}
                  >
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllRequestedPage;
