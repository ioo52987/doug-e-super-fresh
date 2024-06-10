import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import marker from "@mapbox/maki/icons/marker.svg";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

export default function Map() {
  // check if on mobile or computer device --> https://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // map defaults
  const mapContainer = useRef(null);
  const map = useRef(null);
  let [lng, setLng] = useState(0);
  let [lat, setLat] = useState(0);
  let [zoom, setZoom] = useState(10);

  if (isMobile) {
    // phone
    lng = -76.3605171;
    lat = 36.9784821;
  } else {
    // computer
    lng = -76.2621354;
    lat = 36.9744482;
  }

  // states
  const [fishingSiteData, setFishingSiteData] = useState([]); // all site data returned from axios
  const [fishingTripData, setFishingTripData] = useState([]); // all trip data returned from axios

  // GET fishingSites
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        `${process.env.REACT_APP_API_SERVER_URL}/fishingSites`
      );
      response = await response.json();
      setFishingSiteData(response);
    }
    fetchMyAPI();
  }, []);

  // GET fishingTrips
  useEffect(() => {
    async function fetchMyAPI() {
      let response = await fetch(
        `${process.env.REACT_APP_API_SERVER_URL}/fishingTrips`
      );
      response = await response.json();
      setFishingTripData(response);
    }
    fetchMyAPI();
  }, []);

  // map load
  useEffect(() => {
    // initialize popup objects
    let popupData = [];
    for (let i = 0; i < fishingSiteData.length; i++) {
      let obj = {
        siteName: fishingSiteData[i].siteName,
        ratingSum: 0,
        numTrips: 0,
        overallRating: 0,
      };
      popupData.push(obj);
    }

    // sum ratings and trips per fishingSite
    for (let i = 0; i < fishingTripData.length; i++) {
      popupData.forEach((item) => {
        if (item.siteName === fishingTripData[i].siteName) {
          item.ratingSum = item.ratingSum + fishingTripData[i].rating;
          item.numTrips++;
        }
      });
    }

    // calculate overall rating for each site
    popupData.forEach((item) => {
      item.overallRating = Number(item.ratingSum / item.numTrips).toFixed(2);
    });

    // create geoJSON data structure for fishing-sites layer
    let siteMapProperties = [];
    // make popup for each fishing-site
    for (let i = 0; i < fishingSiteData.length; i++) {
      popupData.forEach((item) => {
        if (item.siteName === fishingSiteData[i].siteName) {
          siteMapProperties.push({
            type: "Feature",
            properties: {
              siteName: fishingSiteData[i].siteName,
              overallRating: item.overallRating,
              description: fishingSiteData[i].descrb,
            },
            geometry: {
              type: "Point",
              coordinates: [
                fishingSiteData[i].longitude,
                fishingSiteData[i].latitude,
              ],
            },
          });
        }
      });
    }

    // custom icons
    let fsIcon = {
      //url: marker,
      url: "https://i.ibb.co/DfQyp9M/icons8-fish-100-1.png",
      id: "marker",
    };

    if (siteMapProperties.length === 0) return;
    // initialize NEW map
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    // map loading layer control
    map.current.on("load", () => {
      // load dynamic geoJSON data to map
      map.current.addSource("fishing-sites", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: siteMapProperties,
        },
      });

      // load fs-custom-marker to map
      map.current.loadImage(fsIcon.url, function (error, res) {
        map.current.addImage(fsIcon.id, res);
      });

      // ... finally, add layer showing fishing sites
      map.current.addLayer({
        id: "fishing-sites",
        type: "symbol",
        source: "fishing-sites",
        layout: {
          "icon-image": "marker",
          "icon-size": 1.5,
        },
      });

      // create popups, but don't add them to the map yet
      const popupFishSite = new mapboxgl.Popup({
        className: "fish-site-popup ",
        closeButton: false,
        closeOnClick: false,
      });

      // popup pointer logic for fishing-sites
      map.current.on("mouseenter", "fishing-sites", (e) => {
        // Change the cursor style as a UI indicator.
        map.current.getCanvas().style.cursor = "pointer";

        const coordinates = e.features[0].geometry.coordinates.slice();
        const siteName = e.features[0].properties.siteName;
        let overallRating = e.features[0].properties.overallRating;
        const description = e.features[0].properties.description;

        // handling NaN
        isNaN(overallRating)
          ? (overallRating = 0)
          : (overallRating = overallRating);

        let content = ` <div id='top'>
                <b id='title'>${siteName}</b><br>
                
            </div>
            <p id='bottom'>${description}</p>
        `;

        /*
Overall Rating: <div 
                    style="display: inline; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                    ${overallRating}</div></br>
                    */

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates based on the feature found.
        popupFishSite
          .setLngLat(coordinates)
          .setHTML(content)
          .addTo(map.current);
      });

      // Change the cursor to a pointer when the mouse is over the places layer.
      map.current.on("mouseenter", "fishing-sites", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      // Change it back to a pointer when it leaves.
      map.current.on("mouseleave", "fishing-sites", () => {
        map.current.getCanvas().style.cursor = "";
        popupFishSite.remove();
      });
    });
  }, [
    fishingSiteData,
    fishingTripData,
    lat,
    lng,
    zoom,
  ]); /* map.load useEffect() */

  return (
    <div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}
