import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Transport from '../../api/transport';

const RequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [requester, setRequester] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const requestResponse = await Transport.HTTP.getRequestById(id);
        setRequest(requestResponse.data);

        const requesterId = requestResponse.data.requesterId;
        const requesterResponse = await Transport.HTTP.getUserById(requesterId);
        setRequester(requesterResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch request details:', error);
        setLoading(false);
      }
    };

    fetchRequestDetails();
  }, [id]);

  const handleStatusChange = async (newStatus) => {
    try {
      await Transport.HTTP.updateRequest(id, { status: newStatus });
      setRequest((prevRequest) => ({ ...prevRequest, status: newStatus }));
    } catch (error) {
      console.error('Failed to update request status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!request || !requester) {
    return <div>Failed to load request details</div>;
  }

  return (
    <div className="request-details-container">
      <h1>Request Details</h1>
      <div className="request-details-card">
        <div className="request-details-item">
          <h2>Description</h2>
          <p>{request.description}</p>
        </div>
        <div className="request-details-item">
          <h2>Status</h2>
          <p>{request.status}</p>
        </div>
        <div className="request-details-item">
          <h2>Requester</h2>
          <p>{requester.username}</p>
          <p>{requester.email}</p>
        </div>
        <div className="request-details-item">
          {request.status === 'pending' && (
            <>
              <button className="btn btn-success" onClick={() => handleStatusChange('accepted')}>
                Accept
              </button>
              <button className="btn btn-danger" onClick={() => handleStatusChange('rejected')}>
                Reject
              </button>
            </>
          )}
          {request.status === 'accepted' && (
            <button className="btn btn-primary" onClick={() => handleStatusChange('completed')}>
              Complete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;
