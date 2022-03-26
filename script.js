



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

    let amount = 5;

    const markers = [
		[
			("Rate:" + " $" + amount),
			49.2827,
			-123.1207,
		],
	];

	for (let i = 0; i < markers.length; i++) {
		const currMarker = markers[i];

        const image = "dog.png";

		const marker = new google.maps.Marker({
			position: { lat: currMarker[1], lng: currMarker[2] },
			map,
			title: currMarker[0],
			icon: image,
			animation: google.maps.Animation.DROP,
		});

		const infowindow = new google.maps.InfoWindow({
			content: currMarker[0],
		});

		marker.addListener('click', () => {
			infowindow.open(map, marker);
		});
	}

}

function distList() {
	console.log("hi it works");
	//filter for distance

	const myNode = document.getElementById("list-container");
	while (myNode.firstChild) {
  myNode.removeChild(myNode.lastChild);
}

	var div = document.createElement("div");
	div.id= 1234;
	div.style.height = "100px";
	div.style.background = "red";
	div.style.color = "white";
	div.innerHTML = "Hello";
	console.log(div.id);
	div.addEventListener('click', function handleClick(event) {
  	console.log('element clicked 🎉🎉🎉', event);
	  //replace console log with centre on map??
	});

	document.getElementById("list-container").appendChild(div);
}

function timeList() {
	console.log("hi it works");
	//filter for distance

	const myNode = document.getElementById("list-container");
	while (myNode.firstChild) {
  	myNode.removeChild(myNode.lastChild);
	}

	var div = document.createElement("div");
	div.id= 1234;
	div.style.height = "100px";
	div.style.background = "red";
	div.style.color = "white";
	div.innerHTML = "lkh";
	console.log(div.id);
	div.addEventListener('click', function handleClick(event) {
  	console.log('element clicked 🎉🎉🎉', event);
	  //replace console log with centre on map??
	});

	document.getElementById("list-container").appendChild(div);
}


function priceList() {
	console.log("hi it works");
	//filter for distance

	const myNode = document.getElementById("list-container");
  	while (myNode.firstChild) {
    myNode.removeChild(myNode.lastChild);
  	}

	var div = document.createElement("div");
	div.id= 1234;
	div.style.height = "100px";
	div.style.background = "red";
	div.style.color = "white";
	div.innerHTML = "likugh";
	console.log(div.id);
	div.addEventListener('click', function handleClick(event) {
  	console.log('element clicked 🎉🎉🎉', event);
	  //replace console log with centre on map??
	});

	document.getElementById("list-container").appendChild(div);
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