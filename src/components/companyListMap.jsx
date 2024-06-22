import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Transport from '../api/transport'; // Ensure correct import path
import ChatModal from './chatModal'; 

const icon = L.icon({
  iconUrl: 'img/pin.png', // Provide the path to your marker icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const center = [8.985986991937253, 38.796323587333546];

const allianceLevelRequest = {
  id: 'alliance',
  name: 'Alliance Level Request',
  description: 'This is an alliance level request showing all enterprise locations.',
};

const CompanyListMap = ({ user }) => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const mapRef = useRef();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await Transport.HTTP.getAllYouthEnterprises(); // Assuming you have an endpoint to get all companies
        setCompanies(response.data);
      } catch (error) {
        console.error('Failed to fetch companies', error);
      }
    };
    fetchCompanies();
  }, []);

  const handleListItemClick = (company) => {
    setSelectedCompany(company);
    const { current } = mapRef;
    if (current) {
      current.setView([company.latitude, company.longitude], 12);
    }
  };

  const handleMarkerClick = (company) => {
    setSelectedCompany(company);
  };

  const handleAllianceClick = () => {
    setSelectedCompany(allianceLevelRequest);
    const { current } = mapRef;
    if (current) {
      const bounds = companies.map(company => [company.latitude, company.longitude]);
      current.fitBounds(bounds);
    }
  };

  return (
    <div className="map-container">
      <div className="map-list">
        <h1>Company List</h1>
        <ul className="map-list-items">
          <li
            className={selectedCompany?.id === 'alliance' ? 'map-list-item selected' : 'map-list-item'}
            onClick={handleAllianceClick}
          >
            {allianceLevelRequest.name}
          </li>
          {companies.map((company) => (
            <li
              key={company.id}
              className={selectedCompany?.id === company.id ? 'map-list-item selected' : 'map-list-item'}
              onClick={() => handleListItemClick(company)}
            >
              {company.name}
            </li>
          ))}
        </ul>
        {selectedCompany && (
          <div className="map-description">
            <h2>{selectedCompany.name}</h2>
            <p>{selectedCompany.description}</p>
            <button className="map-contact-button" onClick={() => setShowChatModal(true)}>Contact</button>
          </div>
        )}
      </div>
      <div className="map-map">
        <MapContainer
          center={center}
          zoom={6}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
          whenCreated={mapInstance => { mapRef.current = mapInstance }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {companies.map((company) => (
            <Marker
              key={company.id}
              position={[company.latitude, company.longitude]}
              icon={icon}
              eventHandlers={{
                click: () => handleMarkerClick(company),
              }}
            >
              <Popup>{company.name}</Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      {selectedCompany && selectedCompany.id !== 'alliance' && (
        <ChatModal
          show={showChatModal}
          onHide={() => setShowChatModal(false)}
          selectedCompany={selectedCompany}
          user={user}
        />
      )}
    </div>
  );
};

export default CompanyListMap;
