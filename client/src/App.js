import React from "react";
import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Equipment/header.js";
import SidebarDrawer from "./components/SidebarDrawer/sidebarDrawer.js";
import Welcome from "./components/WelcomePage.js";
import Map from "./components/Map/Map.js"
import AboutThisSite from "./components/AboutThisSite.js";
import AddNewSite from "./components/AddFishingSite.js";
import AddNewTrip from "./components/AddFishingTrip.js"
import PreviousTrips from "./components/PreviousTrips/PreviousTrips.js";

function App() {
  let [navToggle, setNavToggle] = useState(false);
  function setNT() {
    setNavToggle(!navToggle);
  }
  return (
    <div>
      <Header setNT={setNT} nT={navToggle} />
      {navToggle && <SidebarDrawer setNT={setNT} />}

      <Routes>
        <Route exact path="/" element={<Welcome />} />
        <Route exact path="/map" element={<Map />} />
        <Route exact path="/about" element={<AboutThisSite />} />
        <Route exact path="/inputNewSite" element={<AddNewSite />} />
        <Route exact path="/inputNewTrip" element={<AddNewTrip />} />
        <Route exact path="/previousTrips" element={<PreviousTrips/>} />
      </Routes>
    </div>
  );
}

export default App;
