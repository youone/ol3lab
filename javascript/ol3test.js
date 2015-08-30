function latlong2xy(latlong) {
	return ol.proj.transform(latlong, "EPSG:4326", "EPSG:3857");
	//return ol.proj.transform(latlong, "EPSG:4326", "EPSG:900913");
}

(function($){
	
	$(document).ready( function(){
		console.log("hej");


		
//		console.log(wgs84Sphere.initialBearing([20,60], [18,70]));
//		console.log(wgs84Sphere.interpolate([20,60], [18,70], 0.0));
//		tissotSource.addFeature(new ol.Feature(tissotCircle));
	
		
		var vectorSource = new ol.source.Vector();

		var vectorLayer = new ol.layer.Vector({
			source : vectorSource
			//style : styleFunction
		});

		var initcoord = latlong2xy([17.976554, 59.339169]);
		var aoiRadius = 1e5;
		console.log(initcoord);
		circle = new ol.geom.Circle(initcoord, 1e6);
		//vectorSource.addFeature(new ol.Feature(circle));

		
		var wgs84Sphere = new ol.Sphere(6378137);
		var radius = 800000;
		var x, y;
	    var circle2 = ol.geom.Polygon.circular(wgs84Sphere, [17.976554, 59.339169], 1000*10*51.75, 128);
	    circle2.transform('EPSG:4326', 'EPSG:3857');
	    vectorSource.addFeature(new ol.Feature(circle2));

	    console.log(circle2.getCoordinates());
//	    console.log(circle3.getCoordinates());

	    mapLayer = new ol.layer.Tile({
			source : new ol.source.OSM()
//			source : new ol.source.OSM({
//				crossOrigin: null,
//				url: "//192.168.0.15/osm_tiles/{z}/{x}/{y}.png"
//			})
//			source : new ol.source.OSM({url: "//{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png"})
		});

		
		var map = new ol.Map({
			layers : [ mapLayer , vectorLayer],
//			  layers: [
//			    new ol.layer.Tile({
//			      source: new ol.source.OSM()
//			    })
//			  ],
			  target: 'map',
			  view: new ol.View({
			    center: [0, 0],
			    zoom: 2
			  })
			});

	
	
	});


	
})(jQuery);

