import { GoogleMap, Marker } from '@react-google-maps/api';

import { Loader } from '@googlemaps/js-api-loader';
// import * as THREE from 'three';
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Wrapper } from '@googlemaps/react-wrapper';
import Rick from './markers/rick26.png'
import Morty from './markers/morty26.png'
import './Map.css';
// import { useState } from 'react';

export const Map = ({ position, setPosition, pressedMap, setPressedMap, originalPosition, showResult }) => {
    const MapsKey = process.env.REACT_APP_MAPS_API
    const MapId = process.env.REACT_APP_MAPID

    const handleMapClick = (event) => {
        setPressedMap(true)
        if (!showResult)
            setPosition(event.latLng)
    }

    // console.log(document.getElementsByTagName('body')[0].clientWidth);

    const containerStyleForDesktop = {
        width: '48vw',
        height: '95vh'
    };

    const containerStyleForMobile = {
        width: '92vw',
        height: '48vh'
    };

    const apiOptions = {
        "apiKey": MapsKey,
        "version": "beta"
    };

    async function initMap() {
        const google = window.google
        const mapDiv = document.getElementById('map');
        const apiLoader = new Loader(apiOptions);
        await apiLoader.load();
        return new google.maps.Map(mapDiv, mapOptions)
    }

    function initWebGLOverlayView (map) {
        let scene, renderer, camera, loader;
        // WebGLOverlayView code goes here
    }

    const mapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        keyboardShortcuts: false,
        draggableCursor: 'crosshair',
        minZoom: 2,
        maxZoom: 18,
        zoom: 18,
        borderRadius: '30px',
        mapId: MapId,
        center: position
    };
    // (async () => {
    //     const map = await initMap();
    // })();
    return (
        <div className='map'>
            <Wrapper apiKey={MapsKey}>
                <GoogleMap
                    mapContainerStyle={document.getElementsByTagName('body')[0].clientWidth > 600 ? containerStyleForDesktop : containerStyleForMobile}
                    // center={position}
                    tilt = {13}
                    // zoom={18}
                    clickableIcons={false}
                    draggable={true}
                    options={mapOptions}
                    onClick={handleMapClick}
                    mapTypeId={'terrain'}
                    // mapId = {MapId}
                >
                    <Marker icon={{ url: Morty }} visible={pressedMap ? true : false} cursor={'crosshair'} position={position}></Marker>
                    <Marker icon={{ url: Rick }} visible={showResult ? true : false} cursor={'crosshair'} position={originalPosition}></Marker>
                </GoogleMap>
            </Wrapper>
        </div >
    );
}