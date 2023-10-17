import React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { BeatLoader } from 'react-spinners';

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: -3.745,
    lng: -38.523
};

function MapsComponent() {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyDo8dGgSL0co_wEAAPMFGEh_axjtOs5Bs4"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);

        setMap(map)
    }, [])

    const onUnmount = React.useCallback(function callback(mmap) {
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
