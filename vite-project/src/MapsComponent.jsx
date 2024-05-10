import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { BeatLoader } from 'react-spinners';
import mapStyles from './mapStyles';
import routeScorer from '../../algorithms/routeScorer';



const containerStyle = {
    width: '800px',
    height: '800px'
};

const center = {
    lat: 35.46664,
    lng: -83.92001
};

const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

function MapsComponent() {
    const [p1, setP1] = useState({ lat: 0, lng: 0 });
    const [p2, setP2] = useState({ lat: 0, lng: 0 });
    const [p3, setP3] = useState({ lat: 0, lng: 0 });
    const [angle, setAngle] = useState();
    const [distance, setDistance] = useState();
    const [curvature, setCurvature] = useState();

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: apiKey
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, [])

    const handleP1LatChange = (e) => {
        setP1(prev => ({ ...prev, lat: parseFloat(e.target.value)}))
    }

    const handleP1LngChange = (e) => {
        setP1(prev => ({ ...prev, lng: parseFloat(e.target.value)}))
    }

    const handleP2LatChange = (e) => {
        setP2(prev => ({ ...prev, lat: parseFloat(e.target.value)}))
    }

    const handleP2LngChange = (e) => {
        setP2(prev => ({ ...prev, lng: parseFloat(e.target.value)}))
    }

    const handleP3LatChange = (e) => {
        setP3(prev => ({ ...prev, lat: parseFloat(e.target.value)}))
    }

    const handleP3LngChange = (e) => {
        setP3(prev => ({ ...prev, lng: parseFloat(e.target.value)}))
    }

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    // }

    return (
        <div>
            <div className="webContent">
                <h2>Welcome to my maps experiment</h2>
                <p>This is very much a work in progress, but the end goal is to be able to
                    enter a route and have a 'fun score' generated given the curvature of
                    vectores along the route.
                </p>
            </div>
            <div>
                <p>The input for p1, p2, p3 will go here</p>
                <input type="number" placeholder="p1 latitude" onChange={handleP1LatChange} />
                <input type="number" placeholder="p1 longitude" onChange={handleP1LngChange} />

                <input type="number" placeholder="p2 latitude" onChange={handleP2LatChange} />
                <input type="number" placeholder="p2 longitude" onChange={handleP2LngChange} />

                <input type="number" placeholder="p3 latitude" onChange={handleP3LatChange} />
                <input type="number" placeholder="p3 longitude" onChange={handleP3LngChange} />

                <button>Send it</button>
            </div>
            <div>
            {isLoaded ? (
                <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={{ styles: mapStyles }}
                >
                </GoogleMap>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
                    <BeatLoader color="#3498db" />
                </div>
            )}
            </div>
        </div>
    )
}

export default MapsComponent
