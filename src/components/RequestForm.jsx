import React, { useState } from 'react';
import Transport from '../api/transport';
import { useAuth } from '../context/AuthContext';


const RequestForm = ({ selectedCompany }) => {
  const [description, setDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user} = useAuth();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await Transport.HTTP.addRequest({
        description,
        requesterId: user.id,
        enterpriseId: selectedCompany.id,
      });

      setDescription('');
      alert('Request created successfully');
    } catch (error) {
      console.error('Failed to create request', error);
      setErrorMessage('Failed to create request. Please try again.');
    }
  };

  return (
    <form className="request-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="requestDescription">Request Description</label>
        <textarea
          id="requestDescription"
          name="requestDescription"
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit">Send Request</button>
    </form>
  );
};

export default RequestForm;
