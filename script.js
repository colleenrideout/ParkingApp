function initMap() {
	// Update MAP_ID with custom map ID
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 49.2827,
			lng: -123.1207,
		},
		zoom: 18,
		mapId: 'MAP_ID',
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
	});

}

// function myFunction() {
//     map = new google.maps.Map(document.getElementById('map'), {
// 		center: {
// 			lat: 34.66767774804736,
// 			lng: 135.43076145097373,
// 		},
// 		zoom: 18,
// 		mapTypeControl: false,
// 		fullscreenControl: false,
// 		streetViewControl: false,
// 	});

//     console.log(map.center);
// }