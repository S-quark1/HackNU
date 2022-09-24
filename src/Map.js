import { GoogleMap, Marker } from '@react-google-maps/api';

import { Loader } from '@googlemaps/js-api-loader';
import * as THREE from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

import { Wrapper } from '@googlemaps/react-wrapper';
import Rick from './markers/rick26.png'
import Morty from './markers/morty.png'
import source from './pin.gltf'
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

    const mapOptions = {
        // fullscreenControl: false,
        // mapTypeControl: false,
        // streetViewControl: false,
        // zoomControl: true,
        // keyboardShortcuts: false,
        // draggableCursor: 'crosshair',
        minZoom: 2,
        maxZoom: 18,
        zoom: 18,
        // borderRadius: '30px',
        mapId: MapId,
        center: position,
        clickableIcons: false,
        draggable: true,
        onClick: handleMapClick,
        // mapContainerStyle: document.getElementsByTagName('body')[0].clientWidth > 600 ? containerStyleForDesktop : containerStyleForMobile

    };

    async function initMap() {
        const mapDiv = document.getElementById('root');
        const apiLoader = new Loader(apiOptions);
        await apiLoader.load();
        return new google.maps.Map(mapDiv, mapOptions);
    }

    function initWebGLOverlayView(map) {
        let scene, renderer, camera, loader;
        const webGLOverlayView = new google.maps.WebGLOverlayView();

        webGLOverlayView.onAdd = () => {
            scene = new THREE.Scene();
            camera = new THREE.PerspectiveCamera();
            const ambientLight = new THREE.AmbientLight( 0xffffff, 0.75 ); // soft white light
            scene.add( ambientLight );
            const directionalLight = new THREE.DirectionalLight(0xffffff, 0.25);
            directionalLight.position.set(0.5, -1, 0.5);
            scene.add(directionalLight);

            loader = new GLTFLoader();
            loader.load(
                source,
                gltf => {
                    gltf.scene.scale.set(25,25,25);
                    gltf.scene.rotation.x = 180 * Math.PI/180;
                    scene.add(gltf.scene);
                }
            );
        }

        webGLOverlayView.onContextRestored = ({gl}) => {
            // create the three.js renderer, using the
            // maps's WebGL rendering context.
            renderer = new THREE.WebGLRenderer({
                canvas: gl.canvas,
                context: gl,
                ...gl.getContextAttributes(),
            });
            renderer.autoClear = false;

            // wait to move the camera until the 3D model loads
            loader.manager.onLoad = () => {
                renderer.setAnimationLoop(() => {
                    map.moveCamera({
                        "tilt": mapOptions.tilt,
                        "heading": mapOptions.heading,
                        "zoom": mapOptions.zoom
                    });

                    // rotate the map 360 degrees
                    if (mapOptions.tilt < 67.5) {
                        mapOptions.tilt += 0.5
                    } else if (mapOptions.heading <= 360) {
                        mapOptions.heading += 0.2;
                    } else {
                        renderer.setAnimationLoop(null)
                    }
                });
            }
        }

        webGLOverlayView.onDraw = ({gl, transformer}) => {
            // update camera matrix to ensure the model is georeferenced correctly on the map
            const latLngAltitudeLiteral = {
                lat: mapOptions.center.lat,
                lng: mapOptions.center.lng,
                altitude: 120
            }

            const matrix = transformer.fromLatLngAltitude(latLngAltitudeLiteral);
            camera.projectionMatrix = new THREE.Matrix4().fromArray(matrix);

            webGLOverlayView.requestRedraw();
            renderer.render(scene, camera);

            // always reset the GL state
            renderer.resetState();
        }
        webGLOverlayView.setMap(map);
    }

    (async () => {
        const map = await initMap();
        initWebGLOverlayView(map);
    })();
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
                    mapContainerStyle={{
                        width: '48vw',
                        height: '95vh'
                    }}
                    center={position}
                    zoom={0}
                    clickableIcons={false}
                    draggable={true}
                    options={defaultMapOptions}
                    onClick={handleMapClick}
                    mapTypeId={'terrain'}
                >
                    <Marker icon={{ url: Morty }} visible={pressedMap ? true : false} cursor={'crosshair'} position={position}></Marker>
                    <Marker icon={{ url: Rick }} visible={showResult ? true : false} cursor={'crosshair'} position={originalPosition}></Marker>
                </GoogleMap>
            </Wrapper>
        </div >
    );
}