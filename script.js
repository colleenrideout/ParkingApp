// GLOBAL VARIABLES
var returnedDataFull = [];
var currentDisplayedData = [];
let markers = [];
let infoWindows = [];
const d = new Date();
const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillColor: "green",
    fillOpacity: 0.8,
    strokeWeight: 0.1,
    rotation: 0,
    scale: 2
  };

// STARTING POSITION
const myLatlng = {lat: 49.2827, lng: -123.1207,};


// MAP INIT AND CONTROLLER
function initMap() {
	
	//BUILDMAP
	map = new google.maps.Map(document.getElementById('map'), {
		center: myLatlng,
		zoom: 16,
		mapId: '13f56e42ad8ec389',
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
	});


	//FILTER FOR TIME EVENT
	google.maps.event.addDomListener(document.getElementById('stay-length'), "click", () => {
		var lengthOfStay = 2; 
		currentDisplayedData = filterTimeNeeded(lengthOfStay, returnedDataFull);
		addMarkers(map, currentDisplayedData);

	});

	//QUERY FOR DATA
	google.maps.event.addDomListener(document.getElementById('distList'), "click", () => {
		var pos = map.getCenter()
		callApi(pos.lat(), pos.lng())
	});


	//SORTING FOR PRICE
	google.maps.event.addDomListener(document.getElementById('priceList'), "click", () => {
		currentDisplayedData = sort_by_price();
		addTenMarkers(map, currentDisplayedData);
	});

	// //SORTING FOR distance
	// google.maps.event.addDomListener(document.getElementById('11'), "click", () => {
	// 	currentDisplayedData = sort_by_distance();
	// 	addMarkers(map, currentDisplayedData);
	// });

}



// GETTING API DATA

function callApi(lat, long) { 
	var dist = 3000;
	var url = `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&q=&rows=150&facet=r_mf_9a_6p&facet=r_mf_6p_10&facet=r_sa_9a_6p&facet=r_sa_6p_10&facet=r_su_9a_6p&facet=r_su_6p_10&facet=timeineffe&facet=t_mf_9a_6p&facet=t_mf_6p_10&facet=t_sa_9a_6p&facet=t_sa_6p_10&facet=t_su_9a_6p&facet=t_su_6p_10&facet=creditcard&facet=geo_local_area&geofilter.distance=${lat}%2C+${long}%2C${dist}`  
        fetch(url)
            .then((response) => response.json())
            .then((data) => makeArray(data))
}

function makeArray(data) {
    returnedDataFull = data.records;
	addMarkers(map, returnedDataFull);
}


//FILTER FOR NEEDED TIME

function filterTimeNeeded(timeNeeded, array) {
	const result = array.filter(elt => filterTime(elt, timeNeeded));
	return result;
}


function filterTime(data1, data2) {
	var str = get_max_time(data1);
	var time = parseInt(str);
	return time > data2;
}

function filterPrice(data1, data2, data3) {
	var str = data1['fields'][data3];
	var thing = parseInt(str);
	return thing >= data2;
}


// MARKER AND INFOWINDOW
function addMarkers(map, array) {
	clearMarkers(map);
	for (i = 0; i < array.length; i++) {
		var coords = array[i]['fields']['geom']['coordinates']
		

		var pos = {lat: coords[1], lng: coords[0]};

		var contentString = 
	  	'<center>' +
        '<b>Price (hr): </b> '+ get_price(array[i]) +' <br>' +
        '<b>Max Parking Time: </b> '+  get_max_time(array[i]) +' <br>' +
        '<b>Type: </b> '+ get_type(array[i]) +' <br>' +
        '<b>Neighbourhood: </b> '+ get_neighbourhood(array[i]) +' <br>' +
    	'</center>'

		const newInfoWindow = new google.maps.InfoWindow({
			content: contentString,
		});
		const newMarker = new google.maps.Marker({
			position: pos,
			icon: svgMarker,
			map: map,
			title: "Hi"
		});
		newMarker.addListener("click", () => {
			closeWindows(map);
			newInfoWindow.open({
			  anchor: newMarker,
			  map,
			  shouldFocus: false,
			});	
		});

		infoWindows.push(newInfoWindow);
		markers.push(newMarker);
	}
}

function addTenMarkers(map, array) {
	clearMarkers(map);
	for (i = 0; i < array.length && i < 10; i++) {
		var coords = array[i]['fields']['geom']['coordinates']
		

		var pos = {lat: coords[1], lng: coords[0]};

		var contentString = 
	  	'<center>' +
        '<b>Price (hr): </b> '+ get_price(array[i]) +' <br>' +
        '<b>Max Parking Time: </b> '+  get_max_time(array[i]) +' <br>' +
        '<b>Type: </b> '+ get_type(array[i]) +' <br>' +
        '<b>Neighbourhood: </b> '+ get_neighbourhood(array[i]) +' <br>' +
    	'</center>'

		const newInfoWindow = new google.maps.InfoWindow({
			content: contentString,
		});
		const newMarker = new google.maps.Marker({
			position: pos,
			icon: svgMarker,
			map: map,
			title: "Hi"
		});
		newMarker.addListener("click", () => {
			closeWindows(map);
			newInfoWindow.open({
			  anchor: newMarker,
			  map,
			  shouldFocus: false,
			});	
		});

		infoWindows.push(newInfoWindow);
		markers.push(newMarker);
	}
}

function closeWindows() {
	for (i = 0; i < infoWindows.length; i++) {
		infoWindows[i].close();
	}
}

function clearMarkers() {
	for (i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
	infoWindows = [];
}


// INFOWINDOW TEXT GETTERS

function get_price(meter) {
	var day = d.getDay();
	var time = d.getHours();

	if (day >= 1 && day <= 5) {
		// weekday
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			return meter.fields.r_mf_6p_10;

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			return meter.fields.r_mf_9a_6p;
		}
	} else if (day == 6) {
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			return meter.fields.r_sa_6p_10;

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			return meter.fields.r_sa_6p_10;
		}
	} else {
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			return meter.fields.r_su_6p_10;

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			return meter.fields.r_su_9a_6p;
		}
	}
}

function get_max_time(meter) {
	var day = d.getDay();
	var time = d.getHours();

	if (day >= 1 && day <= 5) {
		// weekday
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			return meter.fields.t_mf_6p_10;

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			return meter.fields.t_mf_9a_6p;
		}
	} else if (day == 6) {
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			return meter.fields.t_sa_6p_10;

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			return meter.fields.t_sa_6p_10;
		}
	} else {
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			return meter.fields.t_su_6p_10;

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			return meter.fields.t_su_9a_6p;
		}
	}
}

function get_type(meter) {
	return meter.fields.meterhead;
}

function get_neighbourhood(meter) {
	return meter.fields.geo_local_area;
}


// SORT CODE

function sort_by_distance() {
	var sorted = returnedDataFull.slice();
	sorted.sort(compare_distance);
	console.log(sorted);
	return sorted;
}

function compare_distance(a, b) {
	if (parseFloat(a.fields.dist) > parseFloat(b.fields.dist)) {
		return 1;
	} else {
		return -1;
	}
}

function sort_by_price(){
	var sorted = returnedDataFull.slice();
	sorted.sort(compare_price);
	console.log(sorted);
	return sorted;
}


function compare_price(a, b) {

	var day = d.getDay();
	var time = d.getHours();

	if (day >= 1 && day <= 5) {
		// weekday
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			if (parseInt(a.fields.r_mf_6p_10.slice(1)) > parseInt(b.fields.r_mf_6p_10.slice(1))) {
				// a before b
				return 1;
			} else {
				return -1;
			}

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			if (parseInt(a.fields.r_mf_9a_6p.slice(1)) > parseInt(b.fields.r_mf_9a_6p.slice(1))) {
				// a before b
				return 1;
			} else {
				return -1;
			}
		}
	} else if (day == 6) {
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			if (parseInt(a.fields.r_sa_6p_10.slice(1)) > parseInt(b.fields.r_sa_6p_10.slice(1))) {
				// a before b
				return 1;
			} else {
				return -1;
			}

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			if (parseInt(a.fields.r_sa_9a_6p.slice(1)) > parseInt(b.fields.r_sa_9a_6p.slice(1))) {
				// a before b
				return 1;
			} else {
				return -1;
			}
		}
	} else {
		if (time >= 18 && time <= 22) {
			// 6pm to 10pm
			if (parseInt(a.fields.r_su_6p_10.slice(1)) > parseInt(b.fields.r_su_6p_10.slice(1))) {
				// a before b
				return 1;
			} else {
				return -1;
			}

		} else if (time >= 9 && time <= 17){
			// 9am to 6pm
			if (parseInt(a.fields.r_su_9a_6p.slice(1)) > parseInt(b.fields.r_su_9a_6p.slice(1))) {
				// a before b
				return 1;
			} else {
				return -1;
			}
		}
	}
}

