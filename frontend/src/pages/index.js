import React, { useEffect, useState } from "react";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import Register from "./Register";
import HomePage from "./HomePage";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import Pool from "./Pool";
import Apply from "./Apply";

function Home() {
  const [region, setRegion] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegion = async () => {
      try {
        // Fetch the user's IP address
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        const ipAddress = data.ip;

        // Use an IP geolocation service to get the user's region
        const regionResponse = await fetch(
          `https://ipapi.co/${ipAddress}/json/`
        );
        const regionData = await regionResponse.json();

        setRegion(regionData.region);
        console.log({ region: regionData.region });
        sessionStorage.setItem("lucky-region", "Enugu" || regionData.region);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if(!sessionStorage.getItem("lucky-region")){
      fetchRegion();
    }
  }, []);

  return (
    <div className="bg-black">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/register" element={<AdminRegister />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/pool/:pool_id" element={<Pool />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/apply/:pool_id" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default Home;
