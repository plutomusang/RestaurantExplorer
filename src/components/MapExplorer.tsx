import React, { useEffect, useRef } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';

interface MapExplorerProps {
  apiKey?: string; // apiKey is optional since we use environment variables
}

const MapExplorer: React.FC<MapExplorerProps & any> = ({ apiKey }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load the Google Maps API with Drawing library
    const googleMapsScript = document.createElement('script');
    googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=drawing`;
    googleMapsScript.async = true;

    const scriptLoadPromise = new Promise<void>((resolve, reject) => {
      googleMapsScript.onload = () => resolve();
      googleMapsScript.onerror = reject;
    });

    document.head.appendChild(googleMapsScript);

    scriptLoadPromise.then(() => {
      // Initialize the map once the script has loaded
      if (window.google && window.google.maps) {
        initMap();
      } else {
        alert('Google Maps API is not available.');
      }
    });

    return () => {
      // Clean up: Remove the Google Maps script
      document.head.removeChild(googleMapsScript);
    };
  }, [apiKey]);

  const initMap = () => {
    // Create a new map instance
    const map = new window.google.maps.Map(mapRef.current!, {
      center: { lat: 10.3157, lng: 123.8854 },
      zoom: 12,
    });

    // Create the DrawingManager
    const drawingManager = new window.google.maps.drawing.DrawingManager({
      drawingMode: null,
      drawingControl: false,
    });

    // Set the map for the DrawingManager
    drawingManager.setMap(map);
  };

  return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY || '', // Use environment variable
})(MapExplorer);
