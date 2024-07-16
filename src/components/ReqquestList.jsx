import React, { useState, useEffect } from 'react';
import Transport from '../api/transport';

const RequestList = ({ user, onSelectRequest }) => {
  const [requests, setRequests] = useState([]);
  const [enterprises, setEnterprises] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsResponse = await Transport.HTTP.getAllRequests();
        const userRequests = requestsResponse.data.filter(request => request.requesterId === user.id);
        setRequests(userRequests);

        const enterprisesData = {};
        for (const request of userRequests) {
          if (!enterprisesData[request.enterpriseId]) {
            const enterpriseResponse = await Transport.HTTP.getYouthEnterpriseById(request.enterpriseId);
            enterprisesData[request.enterpriseId] = enterpriseResponse.data.name;
          }
        }
        setEnterprises(enterprisesData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchRequests();
  }, [user.id]);

  return (
    <ul>
      {requests.map((request) => (
        <li key={request.id} onClick={() => onSelectRequest(request)}>
          {enterprises[request.enterpriseId] || 'Loading...'}
        </li>
      ))}
    </ul>
  );
};

export default RequestList;
