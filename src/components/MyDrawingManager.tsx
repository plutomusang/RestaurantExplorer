import React, { useEffect, useRef } from 'react';

interface MyDrawingManagerProps {
  apiKey: string;
}

const MyDrawingManager: React.FC<MyDrawingManagerProps> = ({ apiKey = 'AIzaSyCO7JhrlpHzJek_wO6okvlbSBWn4VZLYNM' }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    let map: google.maps.Map | null = null;

    useEffect(() => {
        // Load the Google Maps API with Drawing library
        const googleMapsScript = document.createElement('script');
        googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=drawing`;
        googleMapsScript.async = true;

        const scriptLoadPromise = new Promise<void>((resolve: (value?: void) => void, reject) => {
        googleMapsScript.onload = () => resolve(); // Specify the type of resolve
        googleMapsScript.onerror = reject;
        });

        document.head.appendChild(googleMapsScript);

        scriptLoadPromise.then(() => {
        //   Initialize the map and DrawingManager once the script has loaded
        if (google.maps.drawing && google.maps.drawing.DrawingManager) {
            // The DrawingManager type exists in the google.maps.drawing namespace
            initMap();
        } else {
            alert('DrawingManager is not available.');
        }
        });
        return () => {
            // Clean up: Remove the Google Maps script and event listener
            document.head.removeChild(googleMapsScript);
            window.removeEventListener('resize', handleWindowResize);
        };
    }, [apiKey]);
    const handleWindowResize = () => {
        // Handle window resize events if necessary
    };
    const initMap = () => {
        const google = window.google;
        let drawingManager: google.maps.drawing.DrawingManager | null = null;
        // Create a new map instance
        map = new google.maps.Map(mapRef.current!, {
            center: { lat: 10.3157, lng: 123.8854 },
            zoom: 12,
        });
        drawingManager = new google.maps.drawing.DrawingManager({
            drawingControl: true,
            drawingControlOptions: {
              position: google.maps.ControlPosition.TOP_CENTER,
              drawingModes: [google.maps.drawing.OverlayType.MARKER, google.maps.drawing.OverlayType.POLYGON],
            },
          });
            // Set the map for the DrawingManager
        drawingManager.setMap(map);
    };
 return <div ref={mapRef} style={{ width: '100%', height: '500px' }} />;
};

export default MyDrawingManager;
