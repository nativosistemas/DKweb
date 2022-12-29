//var marcadores = [];
//var markers = [];  
//var infowindow;
//var mapCenter=false;

//function setMarkers(map, marcadores) {
//	for (var i = 0; i < marcadores.length; i++) {
//		var myLatLng = new google.maps.LatLng(marcadores[i][0], marcadores[i][1]);
//		var markerOptions={
//		    draggable: true,
//			position: myLatLng,
//			map: map,
//			icon: '../img/home/pin.png',
//			cursor: 'default',
//		};
//		var marker = new google.maps.Marker(markerOptions);
//		markers.push(marker);
//	}
//};

//function initialize() {
//	var latlng = mapCenter || new google.maps.LatLng(-32.1011169,-63.1149614);
//	var mapOptions = {
//		zoom: 7,
//		scrollwheel: false,
//		center: latlng,
//		mapTypeControl: false,
//		disableDefaultUI: true,
//		scaleControl: true,
//		zoomControl: true,
//        zoomControlOptions: {
//        	position: google.maps.ControlPosition.RIGHT_CENTER
//        }, 
//        mapTypeId: google.maps.MapTypeId.ROADMAP,
//	}
//	var map = new google.maps.Map(document.getElementById('map_canvas2'), mapOptions);
//	if (marcadores.length>0)
//		setMarkers(map, marcadores);
//}
  
//window.onload = function() {
//	initialize();
//}