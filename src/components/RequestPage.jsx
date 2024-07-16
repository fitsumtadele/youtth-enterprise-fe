import React, { useState, useEffect }  from 'react';
import { useLocation } from 'react-router-dom';
import RequestList from '../components/ReqquestList';
import RequestForm from '../components/RequestForm';
import { useAuth } from '../context/AuthContext';
import Transport from "../api/transport";

const RequestsPage = ({  }) => {
    const location = useLocation();
    const selectedCompany = location.state?.company || null;
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [requests, setRequests] = useState([]);
    const { user } = useAuth();
    const fetchRequests = async () => {
      try {
        const response = await Transport.HTTP.getAllRequests();
        const userRequests = response.data.filter(request => request.requesterId === user.id);
        setRequests(userRequests);
      } catch (error) {
        console.error('Failed to fetch requests', error);
      }
    };
  
    useEffect(() => {
      fetchRequests();
    }, []);
  
    const handleSelectRequest = (request) => {
      setSelectedRequest(request);
    };
  
    const handleRequestSubmit = async (newRequest) => {
      await fetchRequests();
      setSelectedRequest(newRequest);
    };
  
    return (
      <div className="requests-page">
        <div className="request-list">
          <h1>Requests</h1>
          <RequestList user={user} onSelectRequest={handleSelectRequest} requests={requests} />
        </div>
        <div className="request-form">
          {selectedRequest ? (
            <div>
              <h1>Request Details</h1>
              <p>Description: {selectedRequest.description}</p>
              <p>Status: {selectedRequest.status}</p>
            </div>
          ) : (
            <div>
              <h1>Send Request {selectedCompany ? `to ${selectedCompany.name}` : ''}</h1>
              <RequestForm user={user} selectedCompany={selectedCompany} onSubmit={handleRequestSubmit} />
            </div>
          )}
        </div>
      </div>
    );
  };
  
  
  export default RequestsPage;
