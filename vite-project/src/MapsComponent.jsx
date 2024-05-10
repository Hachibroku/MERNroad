import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { BeatLoader } from 'react-spinners';
import mapStyles from './mapStyles';



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

    return (
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
    )
}

export default MapsComponent
