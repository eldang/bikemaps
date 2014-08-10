function initialize() {
	var mapOptions = {
		center: new google.maps.LatLng(47.609722, -122.333056),
		zoom: 9,
		mapTypeId: google.maps.MapTypeId.TERRAIN,
		scaleControl: true,
		overviewMapControl: true,
		overviewMapControlOptions: {
			opened: true
		}
	};
	
	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
			
	var bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);
	
	directionsService = new google.maps.DirectionsService();
	directionsDisplay = new google.maps.DirectionsRenderer();
	directionsDisplay.setMap(map);
	
	var dirCtl = document.getElementById("directions-input");
	map.controls[google.maps.ControlPosition.TOP_CENTER].push(dirCtl);
	
//	var dirSubmitBtn = document.getElementById("dirSubmit");
//	google.maps.event.addDomListener(dirSubmitBtn, 'click', findRoute());
	
	var creditBig = document.getElementById("credit-big");
	map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(creditBig);

	var creditSmall = document.getElementById("credit-small");
	map.controls[google.maps.ControlPosition.BOTTOM_LEFT].push(creditSmall);
}

function findRoute() {
	var fromString = document.getElementById("dirFrom").value;
	var toString = document.getElementById("dirTo").value;

	console.log(fromString, "to", toString);
	dirReq = {
		origin: fromString,
		destination: toString,
		travelMode: google.maps.TravelMode.BICYCLING,
		unitSystem: google.maps.UnitSystem.IMPERIAL
	};
	
	directionsService.route(dirReq,  function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
		}
	});
}

var directionsService;
var directionsDisplay;


google.maps.event.addDomListener(window, 'load', initialize);