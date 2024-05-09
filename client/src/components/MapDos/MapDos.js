import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import marker from "@mapbox/maki/icons/marker.svg";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZmlzaG5uMjMiLCJhIjoiY2xpb3o4YjlhMHFjYjNkcDJiejE2aHJzYiJ9.wUWSN1ZUhOzAMpGArWidUQ";

export default function MapDos() {
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

  // set states (includes axios response data)
  const [fishingSiteData, setFishingSiteData] = useState([]); // all site data returned from axios
  const [fishingTripData, setFishingTripData] = useState([]); // all trip data returned from axios

  // GET latest fishing-site data
  let [offset1, setOffset1] = useState("");
  useEffect(() => {
    axios
      .get(process.env.REACT_APP_FISHING_SITES_AIRTABLE)
      .then((response) => {
        let data = response.data.records;
        setFishingSiteData((fishingSiteData) => [...fishingSiteData, ...data]);
        if (response.data.offset) {
          setOffset1(response.data.offset);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [offset1]);

  // GET latest fishing-trip data
  let [offset2, setOffset2] = useState("");
  useEffect(() => {
    axios
      .get(
        `/` +
          process.env.REACT_APP_FISHING_TRIPS_AIRTABLE +
          `?fields%5B%5D=fishCaught&fields%5B%5D=date&fields%5B%5D=siteName&fields%5B%5D=rating`
      )
      .then((response) => {
        let data = response.data.records;
        setFishingTripData((fishingTripData) => [...fishingTripData, ...data]);
        if (response.data.offset) {
          setOffset2(response.data.offset);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [offset2]);

  useEffect(() => {
   
    // calculate numTrips and overallRating per fishing-site ---------------------------------------------
    let popupData = [];
    // initializing structure
    for (let i = 0; i < fishingSiteData.length; i++) {
      let obj = {
        siteName: fishingSiteData[i].fields.siteName,
        ratingSum: 0,
        numTrips: 0,
        overallRating: 0,
      };
      popupData.push(obj);
    }
    // sum ratings and number of trips per fishing-site
    for (let i = 0; i < fishingTripData.length; i++) {
      popupData.forEach((item) => {
        if (item.siteName === fishingTripData[i].fields.siteName) {
          item.ratingSum = item.ratingSum + fishingTripData[i].fields.rating;
          item.numTrips++;
        }
      });
    }
    // calculate overall rating for each site
    popupData.forEach((item) => {
      item.overallRating = Number(item.ratingSum / item.numTrips).toFixed(2);
    });

    // create geoJSON data structure for fishing-sites layer ---------------------------------------------
    let siteMapProperties = [];
    // make popup for each fishing-site
    for (let i = 0; i < fishingSiteData.length; i++) {
      popupData.forEach((item) => {
        if (item.siteName === fishingSiteData[i].fields.siteName) {
          siteMapProperties.push({
            type: "Feature",
            properties: {
              siteName: fishingSiteData[i].fields.siteName,
              overallRating: item.overallRating,
              description: fishingSiteData[i].fields.description,
            },
            geometry: {
              type: "Point",
              coordinates: [
                fishingSiteData[i].fields.longitude,
                fishingSiteData[i].fields.latitude,
              ],
            },
          });
        }
      });
    }

    // custom icons
    let fsIcon = {
        url: marker,
      //url: "https://i.ibb.co/DfQyp9M/icons8-fish-100-1.png",
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
                Overall Rating: <div 
                    style="display: inline; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                    ${overallRating}</div></br>
            </div>
            <p id='bottom'>${description}</p>
        `;

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
