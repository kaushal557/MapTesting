mapboxgl.accessToken = 'pk.eyJ1Ijoia2VqaXNqOTkyIiwiYSI6ImNsOGtnbHUzYTBpZHUzcGtsM3h3ZzFpenIifQ.PXjSLPWBgu5fWeund25r_A';

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {enableHighAccuracy: true})

function successLocation(position) {
    //console.log(position)
    setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
    setupMap([-2.24, 53.48])
}

function setupMap(center) {
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v11', // style URL
        center: center, 
        zoom: 12, // starting zoom
        projection: 'globe' // display the map as a 3D globe
    });

    const nav = new mapboxgl.NavigationControl()
    map.addControl(nav)

    const directions = new MapboxDirections({
        accessToken: mapboxgl.accessToken
    });
    map.addControl(directions, 'top-left');


    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });

    // Add geolocate control to the map.
    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            // When active the map will receive updates to the device's location as it changes.
            trackUserLocation: true,
            // Draw an arrow next to the location dot to indicate which direction the device is heading.
            showUserHeading: true
        })
    , 'bottom-right');
}



