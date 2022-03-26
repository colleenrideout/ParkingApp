var returnedDataFull = [];
var currentDisplayedData = [];
let markers = [];
const d = new Date();

function initMap() {
	
	const myLatlng = {lat: 49.2827,
		lng: -123.1207,};
		map = new google.maps.Map(document.getElementById('map'), {
		center: myLatlng,
		zoom: 18,
		mapId: 'MAP_ID',
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
	});
	const marker = new google.maps.Marker({
		position: myLatlng,
		map,
		title: "Click to zoom",
	});
	let infoWindow = new google.maps.InfoWindow({
		content: "Click the map to get Lat/Lng!",
		position: myLatlng,
	});

	  
	
	infoWindow.open(map);
	  // Configure the click listener.
		map.addListener("click", (mapsMouseEvent) => {
		// Close the current InfoWindow.
		infoWindow.close();
		// Create a new InfoWindow.
		infoWindow = new google.maps.InfoWindow({
		  	position: map.getCenter()
		});
		infoWindow.setContent(
		  	JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
		);
		infoWindow.open(map);
	});


	// google.maps.event.addDomListener(document.getElementById('distList'), "click", () => {
	// 	//addMarker(map.getCenter(), map);
	// 	//testFilter();
		
	// });

	google.maps.event.addDomListener(document.getElementById('distList'), "click", () => {
		var pos = map.getCenter()
		callApi(pos.lat(), pos.lng())

	});

}
	
function callApi(lat, long) { 
	var dist = 500;
	var url = `https://opendata.vancouver.ca/api/records/1.0/search/?dataset=parking-meters&q=&rows=20&facet=r_mf_9a_6p&facet=r_mf_6p_10&facet=r_sa_9a_6p&facet=r_sa_6p_10&facet=r_su_9a_6p&facet=r_su_6p_10&facet=timeineffe&facet=t_mf_9a_6p&facet=t_mf_6p_10&facet=t_sa_9a_6p&facet=t_sa_6p_10&facet=t_su_9a_6p&facet=t_su_6p_10&facet=creditcard&facet=geo_local_area&geofilter.distance=${lat}%2C+${long}%2C${dist}`  
        fetch(url)
            .then((response) => response.json())
            .then((data) => makeArray(data))
}

function makeArray(data) {
    returnedDataFull = data.records;
	console.log(returnedDataFull);
	addMarkers(map);

}

function testFilter() {

	const time = 4;
	const result = words.filter(word => filterTime(word, 3, 't_mf_9a_6p'));
	console.log(result);
	for(i = 0; i < 1; i++) {
	}
}

function filterTime(data1, data2, data3) {
	var str = data1['fields'][data3];
	console.log(str);
	var thing = parseInt(str);
	return thing >= data2;
}

function filterPrice(data1, data2, data3) {
	var str = data1['fields'][data3];
	console.log(str);
	var thing = parseInt(str);
	return thing >= data2;
}

function addMarkers(map) {
	clearMarkers(map);
	for (i = 0; i < returnedDataFull.length; i++) {
		var coords = returnedDataFull[i]['fields']['geom']['coordinates']
		

		var pos = {lat: coords[1], lng: coords[0]};

		var contentString = 
	  	'<center>' +
        '<b>Price (hr): </b> '+ get_price(returnedDataFull[i]) +' <br>' +
        '<b>Max Parking Time: </b> '+  get_max_time(returnedDataFull[i]) +' <br>' +
        '<b>Type: </b> '+ get_type(returnedDataFull[i]) +' <br>' +
        '<b>Neighbourhood: </b> '+ get_neighbourhood(returnedDataFull[i]) +' <br>' +
    	'</center>'

		const newInfoWindow = new google.maps.InfoWindow({
			content: contentString,
		});
		const newMarker = new google.maps.Marker({
			position: pos,
			map: map,
			title: "Hi"
		});
		newMarker.addListener("click", () => {
			newInfoWindow.open({
			  anchor: newMarker,
			  map,
			  shouldFocus: false,
			});	
		});

		markers.push(newMarker);
	}
}

function clearMarkers(map) {
	for (i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	markers = [];
}

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

function distList() {
	console.log("hi it works");
	//filter for distance

	const myNode = document.getElementById("list-container");
	while (myNode.firstChild) {
  		myNode.removeChild(myNode.lastChild);
	}

	let divArray = [];

	for(i = 0; i < 20; i++) {
		console.log(currentDisplayedData.length);
		var div = document.createElement("div");
		div.id= i;
		div.style.background = "grey";
		div.style.color = "white";
		div.classList.add("listClass");
		div.innerHTML = div.id;
		console.log(div.id);
		divArray.push(div);

		document.getElementById("list-container").appendChild(div);

		div.addEventListener('click', function handleClick(event) {
			let num = div.id;
			console.log(num, event);
		});
	}

	// for(i = 0; i < 20; i++) {
	// 	divArray[i].addEventListener('click', function handleClick(event) {
	// 		var div = document.getElementById(divArray[i].id);
	// 		console.log(div.id, event);
	// 	});
	// }
}

// function timeList() {
// 	console.log("hi it works");
// 	//filter for distance

// 	const myNode = document.getElementById("list-container");
// 	while (myNode.firstChild) {
//   	myNode.removeChild(myNode.lastChild);
// 	}

// 	var div = document.createElement("div");
// 	div.id= 1234;
// 	div.style.height = "100px";
// 	div.style.background = "red";
// 	div.style.color = "white";
// 	div.innerHTML = "lkh";
// 	console.log(div.id);
// 	div.addEventListener('click', function handleClick(event) {
//   	console.log('element clicked 🎉🎉🎉', event);
// 	  //replace console log with centre on map??
// 	});

// 	document.getElementById("list-container").appendChild(div);
// }


// function priceList() {
// 	console.log("hi it works");
// 	//filter for distance

// 	const myNode = document.getElementById("list-container");
//   	while (myNode.firstChild) {
//     myNode.removeChild(myNode.lastChild);
//   	}

// 	var div = document.createElement("div");
// 	div.id= 1234;
// 	div.style.height = "100px";
// 	div.style.background = "red";
// 	div.style.color = "white";
// 	div.innerHTML = "likugh";
// 	console.log(div.id);
// 	div.addEventListener('click', function handleClick(event) {
//   	console.log('element clicked 🎉🎉🎉', event);
// 	  //replace console log with centre on map??
// 	});

// 	document.getElementById("list-container").appendChild(div);
// }




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