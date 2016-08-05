/* Reports controller */
Ext.define('AssignmentFinal.controller.MapControl', {
  extend: 'Ext.app.Controller',
 
  stores: [ 'MunicipalityData' ],
  models: [ 'Municipality' ],
  views:  [ 'MainMap' ],
 
  DoughnutChart: null,
 
  init: function() { 
        console.log('MapControl installing');
				
		MapController = this;
    },
	
	
	initMap: function(evtPanel) {

        var map = L.map('mainMap-body').setView([52.22, 6.9], 11);
        L.tileLayer('https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png', {
            maxZoom: 18,
            id: 'examples.map-20v6611k'
        }).addTo(map);

        L.control.scale({imperial: false}).addTo(map);

        var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="http://mapbox.com">Mapbox</a>',
            mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';

        var grayscale = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k', attribution: mbAttr});
        var streets = L.tileLayer(mbUrl, {id: 'examples.map-i875mjb7', attribution: mbAttr});

        var OpenStreetMap_Mapnik = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
        var stamenLayer = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png', {
            attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
        });

        var baseLayers = {
            "OSM Layer": OpenStreetMap_Mapnik,
            "Stamen Layer": stamenLayer,
            "Streets": streets,

        };
        L.control.layers(baseLayers).addTo(map);


        // control that shows state info on hover
        var info = L.control();

        info.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info.update = function (props) {
            this._div.innerHTML = '<h4> Enschede Data Viewer  </h4>' + (props ?
            '<b>' + props.bu_naam + '</b><br />' + 'Population Density: </b>' + props.bev_dichth + ' persons/km2' + '<br />'
                : 'Hover over a neighbourhood');
        };

        info.addTo(map);

        //second info
        var info2 = L.control({position: 'bottomright'});

        info2.onAdd = function (map) {
            this._div = L.DomUtil.create('div', 'info');
            this.update();
            return this._div;
        };

        info2.update = function (props) {
            this._div.innerHTML = '<h4> Enschede Neighbourhood Statistics </h4>' + (props ?
            '<b>' + 'Name: </b>' + props.bu_naam
            + '<b><br />' + 'Post Code:  </b>' + props.postcode
            + '<b><br />' + 'Total Male: </b>' + props.male
            + '<b><br />' + 'Total Female: </b>' + props.female
            + '<b><br />' + 'Total Population: </b>' + props.total
            + '<b><br />' + '% People in 0-14 age: </b>' + props.nbr_0_14
            + '<b><br />' + '% People in 15-24 age: </b>' + props.nbr_15_24
            + '<b><br />' + '% People in 25-44 age: </b>' + props.nbr_25_44
            + '<b><br />' + '% People in 45-64 age: </b>' + props.nbr_45_64
            + '<b><br />' + '% People in 65 above age: </b>' + props.nbr_65_eo
                : 'Hover over a neighbourhood');


        };

        info2.addTo(map);


        // get color depending on population density value
        //[5, 319, 1656, 2993, 4330, 5667, 7005, 8342,8935]
        // [#99FFFF,#99CCFF,#9999FF,#9966FF,#9933FF,#9900FF,#990033,#660000,#330000}
        function getColor(d) {
            return d > 5702 ? '#330000' :
                d > 3445 ? '#990033' :
                    d > 1871 ? '#9933FF' :
                        d > 772 ? '#9999FF' :
                            d > 0 ? '#99FFFF' :
                                '#FFEDA0';
        }

        function style(feature) {
            return {
                weight: 2,
                opacity: 1,
                color: 'white',
                dashArray: '3',
                fillOpacity: 0.7,
                fillColor: getColor(feature.properties.bev_dichth)
            };
        }


        function highlightFeature(e) {
            var layer = e.target;


            layer.setStyle({
                weight: 5,
                color: '#666',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                layer.bringToFront();
            }

            info.update(layer.feature.properties);
            info2.update(layer.feature.properties);


            DoughnutController.sysUpdate(layer.feature.properties.bu_naam);
            BarChartController.sysUpdate(layer.feature.properties.bu_naam);


        }

        var geojson;

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
            info2.update();


        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }


        geojson = L.geoJson(datanew, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);



		map.attributionControl.addAttribution('Compiled by Ipsit Dash');


		var legend = L.control({position: 'bottomleft'});

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
				grades = [0, 772, 1871,3445, 5702],
                labels = ["Population Density Map"],
				label = ["Very Low Density", "Medium Low Density","Medium Density","Medium High Density","High Density"],
				from, to, l;


			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];
                l = label[i];

				labels.push(
					'<i style="background:' + getColor(from + 1) + '"></i> ' +
					from + (to ? '&ndash;' + to : '+') + '<b><br />' + l);
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);


    },
	
	loadMarkers: function(){
    this.getMunicipalityDataStore().each(function(report){
      console.log(report.data.bu_naam);
	  
    });
	},
  
  onLaunch: function(){
     this.getMunicipalityDataStore().load({
	 callback: this.loadMarkers,
      scope: this
    });
  }
  
 
});
/*-----*/