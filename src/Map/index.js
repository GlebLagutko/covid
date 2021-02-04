import React, {useEffect, useLayoutEffect, useState} from 'react'
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';


const containerStyle = {

    height: '50%'
};

const maxRadius = 700000;

function CovidMap() {
    const {isLoaded} = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyCV4gWsTYwKurYSXYyJbTwRh1Lr5gxggNc"
    });

    const [map, setMap] = React.useState(null);

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds({
            lat: -50,
            lng: -50
        }, {
            lat: 50,
            lng: 50
        });
        map.fitBounds(bounds);
        fetchCoordinates();
        setMap(map);
    }, []);

    const onUnmount = React.useCallback(function callback(map) {
        setMap(null)
    }, []);


    let [mapOfCountriesCases, setMapOfCountriesCases] = useState(new Map());

    let [mapOfCountriesCoordinates, setMapOfCountriesCoordinates] = useState(new Map());

    function fetchData() {
        console.log('fetch');
        fetch('https://disease.sh/v3/covid-19/countries').then(response => response.json()).then(data => {
            let mapC = new Map();
            data.forEach(elem => mapC.set(elem.country, elem.cases));
            mapC = new Map([...mapC].sort((a, b) => b[1] - a[1]));

            setMapOfCountriesCases(mapC);
        });
    }

    function fetchCoordinates() {
        fetch('https://restcountries.eu/rest/v2/all').then(response => response.json()).then(data => {
            let mapColor = new Map();
            data.forEach(elem => mapColor.set(elem.name, elem.latlng));

            //fix names between api
            mapColor.set('USA', mapColor.get('United States of America'));
            mapColor.set('Russia', mapColor.get('Russian Federation'));
            mapColor.set('UK', mapColor.get('United Kingdom of Great Britain and Northern Ireland'));
            setMapOfCountriesCoordinates(mapColor);
        });
    }

    useEffect(() => {
        fetchData();
    }, []);

    useLayoutEffect(() => {
        createMarkers()
    }, [map, mapOfCountriesCoordinates, mapOfCountriesCases]);


    function createMarkers() {
        if (map !== null) {
            if (mapOfCountriesCases.size !== 0) {

                const maxCases = mapOfCountriesCases.get('USA');

                for (const [key, value] of mapOfCountriesCases.entries()) {

                    createMarker(key, value, maxCases);
                }
            }
        }
    }


    function drawCircle(centerCountry, radius) {
        return new window.google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.9,
            map,
            clickable: true,
            center: centerCountry,
            radius: radius,
        });
    }

    function addMarker(centerCountry) {
        return new window.google.maps.Marker({
            position: centerCountry,
            map,
            clickable: true,
            visible: false,
        });
    }

    function createInfoWindow(key, value) {
        return new window.google.maps.InfoWindow({
            content: key + ' : ' + value,
        });
    }

    function createMarker(key, value, maxCases) {
        console.log('create marker');
        if (value !== undefined && mapOfCountriesCoordinates.get(key) !== undefined) {

            const centerCountry = {
                lat: mapOfCountriesCoordinates.get(key)[0],
                lng: mapOfCountriesCoordinates.get(key)[1]
            };

            let radius = calcRadius(value, maxCases);
            const circle = drawCircle(centerCountry, radius);
            const marker = addMarker(centerCountry);
            const infoWindow = createInfoWindow(key, value);

            circle.addListener("click", () => {
                infoWindow.open(map, marker);
            });

        }
    }

    function calcRadius(value, maxCases) {
        let radius;
        if (value === maxCases) {
            radius = maxRadius
        } else if (value / maxCases >= 0.3) {
            radius = maxRadius - 300000;
        } else if (value / maxCases >= 0.1) {
            radius = maxRadius - 400000;
        } else if (value / maxCases >= 0.009) {
            radius = maxRadius - 500000;
        } else {
            radius = maxRadius - 600000;
        }
        return radius;
    }

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
            defaultZoom={1}
        >
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>) : <></>

}

export default CovidMap;