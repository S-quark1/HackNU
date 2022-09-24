import { GoogleMap, Marker } from '@react-google-maps/api';
import React from 'react';
import { Wrapper } from '@googlemaps/react-wrapper';
import Morty from './markers/morty.png'
import './Map.css';

// import { useState } from 'react';

export const Map2D = ({ position}) => {
    const MapsKey = 'AIzaSyAJ2Lelz6BpFNO3kSsoRGZgXHH3hQuG6o8'

    const apiOptions = {
        "apiKey": MapsKey
    };
    const containerStyleForDesktop = {
        width: '48vw',
        height: '95vh'
    };

    const containerStyleForMobile = {
        width: '92vw',
        height: '48vh'
    };

    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        zoomControl: true,
        keyboardShortcuts: false,
        draggableCursor: 'crosshair',
        minZoom: 2,
        maxZoom: 18,
        borderRadius: '30px'
    };
    return (
        <div className='map'>
            <Wrapper apiKey={MapsKey}>
                <GoogleMap
                    mapContainerStyle={document.getElementsByTagName('body')[0].clientWidth > 600 ? containerStyleForDesktop : containerStyleForMobile}
                    center={position}
                    zoom={0}
                    clickableIcons={false}
                    draggable={true}
                    options={defaultMapOptions}
                    mapTypeId={'terrain'}
                >
                    <Marker icon={{ url: Morty }} cursor={'crosshair'} position={position}></Marker></GoogleMap>
            </Wrapper>
        </div >
    );
}