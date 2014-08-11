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

	directionsService = new google.maps.DirectionsService();
	
	elevator = new google.maps.ElevationService();
			
	var bikeLayer = new google.maps.BicyclingLayer();
	bikeLayer.setMap(map);

	var rendererOptions = {
		draggable: true
	};
	
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
		pickRoute(-1); // clear any existing routes
		if (status === google.maps.DirectionsStatus.OK) {
			var dirPicker = document.getElementById("directions-picker");
			
			var routesList = document.getElementById("routes-list");
			routesList.innerHTML = "";
			for (var i = 0; i < result.routes.length; i++) {
				directionsArray[i] = new google.maps.DirectionsRenderer({
					map: map,
					directions: result,
					routeIndex: i,
					draggable: true
				});
				routesList.innerHTML = routesList.innerHTML 
															+ "<li onclick='pickRoute("+i+");'>"
															+ result.routes[i].summary
															+ "</li>";
			}

			if (result.routes.length > 1) {
				dirPicker.style.display= 'inline';
			} else {
				dirPicker.style.display= 'none';
				pickRoute(0); // make sure previous routes are all cleared, and anything we run on route selection autoruns if there was only one option anyway
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
	var dirTextContainer = document.getElementById('directions-container');
	var dirTextPanel = document.getElementById('directions-panel');
	var mapPanel = document.getElementById("map-canvas");

	for (var i = 0; i < directionsArray.length; i++) {
		if (i === chosen) {
			dirTextContainer.style.display = 'block';
			mapPanel.style.width = '70%';
			directionsArray[i].setMap(map);
			directionsArray[i].setPanel(dirTextPanel);
			console.log(directionsArray[i]);
			drawElevationChart(directionsArray[i].directions.routes[i].legs);
		} else {
			directionsArray[i].setMap(null);
			directionsArray[i].setPanel(null);
		}
	}
	if (chosen === -1) { 
		directionsArray = []; 
			dirTextContainer.style.display = 'none';
			mapPanel.style.width = '100%';
			document.getElementById('directions-container').style.display = 'none';
			mapPanel.style.height = '100%';
	}
}


function drawElevationChart(route) {
	chart = new google.visualization.ColumnChart(document.getElementById('elevation-panel'));
	
	var path = [route[0].start_location];
	
	for (var i = 0; i < route.length; i++) {
		for (var j = 0; j < route[i].steps.length; j++) {
			path.push(route[i].steps[j].end_location);
		}
	}
	
	var pathRequest = {
		'path': path,
		'samples': 300
	}

	elevator.getElevationAlongPath(pathRequest, plotElevation);
}


function plotElevation(results, status) {
	console.log(results, status);

	var elevTextContainer = document.getElementById('elevation-container');
	var elevTextPanel = document.getElementById('elevation-panel');
	var mapPanel = document.getElementById("map-canvas");
	
	if (status == google.maps.ElevationStatus.OK) {
		var elevationPath = [];
		for (var i = 0; i < results.length; i++) {
			elevationPath.push(results[i].location);
    }
    
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Sample');
    data.addColumn('number', 'Elevation');
    for (var i = 0; i < results.length; i++) {
    	if (results[i].elevation > 0) {
				data.addRow([i.toString(), results[i].elevation * 3.28084]);
			} else {
				data.addRow([i.toString(), 0]);
			}
    }
		
		chart.draw(data, {
			width: window.innerWidth * 0.7,
			height: window.innerHeight * 0.25,
			legend: 'none',
			titleY: 'Elevation (ft)'
		});

		elevTextContainer.style.display = 'block';
		mapPanel.style.height = '75%';
	}
}


var map;
var directionsService;
var directionsArray = [];
var elevator;

google.load('visualization', '1', {packages: ['columnchart']});
google.maps.event.addDomListener(window, 'load', initialize);

