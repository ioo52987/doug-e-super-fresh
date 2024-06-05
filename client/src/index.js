import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import App from './App.js';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);



// ********************************** SETUP AIRTABLE API DEFAULTS WITH AXIOS **********************************
//base endpoint to call with each request
axios.defaults.baseURL = 'https://api.airtable.com/v0/appZ344IY3438RjUG/';
//content type to send with all POST requests 
axios.defaults.headers.post['Content-Type'] = 'application/json';
//authenticate to the base with the API key 
axios.defaults.headers['Authorization'] = `Bearer ${process.env.REACT_APP_AIRTABLE_PERSONAL_ACCESS_TOKEN}`;
