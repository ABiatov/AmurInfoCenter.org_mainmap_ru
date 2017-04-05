/* Created by Biatov Anton
	author="anton.biatov[at]gmail.com" */


var map = L.map('map').setView([50, 125], 5);
map.options.minZoom = 4;
map.options.maxZoom = 6;


/* Basemap Layers */

        L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png', {
			continuousWorld: true,
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery &copy; <a href="http://carto.com">CARTO</a>',
        }).addTo(map);        


/* Overlay Layer from GeoJSON */
            var kvartallayer = L.geoJson(null, {
                  style: function (feature) {

				 if (feature.properties.DN == "1") {
						return {
							color: "#17610f",
							fill: true,
							opacity: 0.9,
						};
					}
				 if (feature.properties.DN == "2") {
						return {
							color: "#d5dc00",
							fill: true,
							opacity: 0.9,
						};
					}
				 if (feature.properties.DN == "3") {
						return {
							color: "#0078A8",
							fill: true,
							opacity: 0.9,
						};
					}					
				 if (feature.properties.DN == "4") {
						return {
							color: "#a6ff4d",
							fill: true,
							opacity: 0.9,
						};
					}					

                },   
 /* Add Popup */
             onEachFeature: function (feature, layerkvartal) {
                    layerkvartal.on({
                        mouseover: function(e) {
                            var layerkvartal = e.target;
                            layerkvartal.setStyle({
                                weight: 3,
                                color: "#00FFFF",
                                opacity: 1                            
                            });
                            if (!L.Browser.ie && !L.Browser.opera) {
                                layerkvartal.bringToFront();
                            };   
                        },
                        mouseout: function(e) {
                            kvartallayer.resetStyle(e.target);
                        },  
                    }).bindLabel(feature.properties.name, {direction: 'auto'}).on('click', function () { window.open(feature.properties.link); });
                }   
            }).addTo(map); 

            $.getJSON("assets/ecoregion.geojson", function (data) {
                kvartallayer.addData(data);
            });


map.attributionControl.addAttribution('| <a href="http://wwf.ru" target="_blank">WWF Russia Amur-branch</a>| Created by <a href="https://abiatov.github.io" target="_blank">Biatov Anton</a> |');
