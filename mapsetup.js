function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(47.609722, -122.333056),
		zoom: 9,
		zoomControl: true,
		zoomControlOptions: {
			style: google.maps.ZoomControlStyle.LARGE,
			position: google.maps.ControlPosition.LEFT_TOP
		},
		panControl: true,
		panControlOptions: {
			position: google.maps.ControlPosition.TOP_LEFT
		},
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		scaleControl: true,
		overviewMapControl: true,
		overviewMapControlOptions: {
			opened: true
		}
	};
	
	map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			
	var bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);

	var rendererOptions = {
		draggable: true
	};
	
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
	directionsDisplay.setMap(map);

	google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
		directionsDisplay.getDirections();
	});

	
	var dirCtl = document.getElementById("controls-holder");
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(dirCtl);
	
	var creditBig = document.getElementById("credit-big");
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(creditBig);

	var creditSmall = document.getElementById("credit-small");
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(creditSmall);
} // end function initialize()



function findRoute() {
	var fromString = document.getElementById("dirFrom").value;
	var toString = document.getElementById("dirTo").value;

	console.log(fromString, "to", toString);
	dirReq = {
		origin: fromString,
		destination: toString,
		travelMode: google.maps.TravelMode.BICYCLING,
		provideRouteAlternatives: true,
		unitSystem: google.maps.UnitSystem.IMPERIAL
	};
	
	directionsService.route(dirReq,  function(result, status) {
		console.log(result, status);
		pickRoute(-1);
		if (status === google.maps.DirectionsStatus.OK) {
			var dirPicker = document.getElementById("directions-picker");
			
			if (result.routes.length > 1) {
				dirPicker.style.display= 'inline';
			} else {
				dirPicker.style.display= 'none';
			}
			
			var routesList = document.getElementById("routes-list");
			routesList.innerHTML = "";
			for (var i = 0; i < result.routes.length; i++) {
				directionsArray[i] = new google.maps.DirectionsRenderer({
					map: map,
					directions: result,
					routeIndex: i
				});
				routesList.innerHTML = routesList.innerHTML 
															+ "<li onclick='pickRoute("+i+");'>"
															+ result.routes[i].summary
															+ "</li>";
			}
		} else if (status === google.maps.DirectionsStatus.NOT_FOUND) {
			window.alert("Google Maps couldn't find one or both of those places.");
		} else if (status === google.maps.DirectionsStatus.ZERO_RESULTS) {
			window.alert("Google Maps couldn't find a route between those places.");
		} else if (status === google.maps.DirectionsStatus.REQUEST_DENIED) {
			window.alert("Google Maps denied the directions request. Do you have a valid API key?  See https://developers.google.com/maps/documentation/javascript/tutorial#api_key for how to get one.");
		} else if (status === google.maps.DirectionsStatus.OVER_QUERY_LIMIT) {
			window.alert("Oh dear.  It looks like this application is exceeding the quota of requests for Google's free service.  Please contact eldang@gmail.com to warn him about this.");
		} else {
			window.alert("Google Maps returned error: "+status);
		}
	});
} // end function findRoute()



function pickRoute(chosen) {
	for (var i = 0; i < directionsArray.length; i++) {
		console.log(i, chosen, directionsArray[i]);
		if (i === chosen) {
			directionsArray[i].setMap(map);
		} else {
			directionsArray[i].setMap(null);
		}
	}
}


var map;
var directionsService;
var directionsDisplay;
var directionsArray = [];

google.maps.event.addDomListener(window, 'load', initialize);
