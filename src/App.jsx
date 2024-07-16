import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/navigation";
import { Header } from "./components/header";
import { Features } from "./components/features";
import { About } from "./components/about";
import { Services } from "./components/services";
import { Gallery } from "./components/gallery";
import { Testimonials } from "./components/testimonials";
import { Team } from "./components/Team"; 
import { Contact } from "./components/contact";
import { Login } from "./components/login"; 
import JsonData from "./data/data.json";
import SmoothScroll from "smooth-scroll";
import "./App.css";
import { AuthProvider, useAuth } from './context/AuthContext'; 
import { SocketProvider } from './context/SocketContext'; 
import CompanyListMap from "./components/companyListMap";
import ChatWidget from './components/ChatWidget'; 
import YouthDashboard from './components/youthEnterprise/Dashboard';
import YouthEnterpriseMessages from './components/youthEnterprise/Messages';
import YouthProfile from './components/youthEnterprise/Profile';
import AdminDashboard from './components/alliance/Dashboard';
import AdminUserManagement from './components/alliance/UserManagement';
import AdminMessages from './components/alliance/Messages';
import RequestsPage from './components/RequestPage';
import RequestedPage from './components/youthEnterprise/RequestedPage';
import AllRequestedPage from './components/alliance/RequestedPage';
import RequestDetails from './components/youthEnterprise/RequestedDetails';

export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 1000,
  speedAsDuration: true,
});

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  const auth = useAuth();
  const user = auth ? auth.user : null;
  const role = user?.role || 'guest';
  return (
    <AuthProvider>
      <SocketProvider> 
        <Router>
          <Navigation />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header data={landingPageData.Header} />
                  <Services data={landingPageData.Services} />
                  <About data={landingPageData.About} />
                  <Features data={landingPageData.Features} />
                  <Gallery data={landingPageData.Gallery} />
                  <Testimonials data={landingPageData.Testimonials} />
                  <Team data={landingPageData.Team} />
                  <Contact data={landingPageData.Contact} />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/companies" element={<CompanyListMap />} />
            <Route path="/chat" element={<ChatWidget />} />
            <Route path="/youth-dashboard" element={<YouthDashboard />} />
            <Route path="/youth-profile" element={<YouthProfile />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-user-management" element={<AdminUserManagement />} />
            <Route path="/admin-messages" element={<AdminMessages />} />
            <Route path="/requests" element={<RequestsPage />} />
            <Route path="/requested" element={<RequestedPage />} />
            <Route path="/all-requested" element={<AllRequestedPage />} />
            <Route path="/request-details/:id" element={<RequestDetails />} />  
          </Routes>
        </Router>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
