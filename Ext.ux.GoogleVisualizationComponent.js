////////////////////// ///////////////  Class Ext.ux.GoogleVisualizationComponent
// Author: Santosh Rajan
// email: santrajan@gmail.com
// Ext.ux.GoogleVisualizationComponent v 0.91 beta
// Released under BSD Licence, http://extgooglevisdemo.myofiz.com/license.txt
// Copyright (c) 2008, Santosh Rajan
//
// Requires ExtJs 2.0 or above. http://www.extjs.com/
/////////////////////////////////////////////////////////////////////////
// Usage:
// var mygooglemap = new Ext.GoogleVisualizationComponent({
// 	visualizationType: 'Map',
// 	visualizationConfig: {
// 		width: 400,
// 		height: 300,
// 		showTip: true
// 	},
// 	columns: [
// 		['number', 'Lat'],
// 		['number', 'Lon'],
// 		['string', 'Name']
// 	],
// 	data: [
// 		[37.4232, -122.0853, 'Work'],
// 		[37.4289, -122.1697, 'University'],
// 		[37.6153, -122.3900, 'Airport'],
// 		[37.4422, -122.1731, 'Shopping']
// 	]
// });
//mypanel.add(mygooglemap);
//
// To load as config option use xtype: 'googlevisualizationcomponent',
// Ext.GoogleVisualizationComponent extends Ext.BoxComponent so you can use all its config options
//
// Public Methods:
// getSelection()  - eg. mygooglemap.getSelection()
// setSelection() - eg. mygooglemap.getSelection()
//
// Events:
// "select" - eg. mygooglemap.on('select', function() {}, this);
//
// To see how these public methods and events work see docs at
// http://code.google.com/apis/visualization/documentation/events.html

//////////////////////  Global Function to load google visualization packages
// Call this function before calling Ext.onReady() in global scope
// Call this function with the required packages you want to use in your application
// eg. Ext.ux.loadGoogleVisualizationPackages('piechart, 'map', 'orgchart','intensitymap')
// You can see all the available visualization packages here
// http://code.google.com/apis/visualization/documentation/gallery.html

////////////////////// Setup
// <script type="text/javascript" src="http://www.google.com/jsapi"></script>
// <script type="text/javascript" src="Ext.ux.GoogleVisualizationComponent.js"></script>
// <script type="text/javascript">
//   Ext.ux.loadGoogleVisualizationPackages("piechart", "map", "intensitymap", "gauge",
// 		"motionchart", "orgchart");
// </script>
// Copy and paste these script tags to wherever you are loading your scripts
//
// If you are using Google Maps then you have to add one more script
// <script src="http://maps.google.com/maps?file=api&amp;v=2&amp;key=PASTE-YOUR-KEY-HERE" type="text/javascript"></script>
// Before you paste this script you will need to sign up for Google Maps API.
// When you sign up you get a key which you can cut and paste in the script tag above.
// You can sign up for google maps api here http://code.google.com/apis/maps/signup.html


var googleLoaded = false;
Ext.ux.loadGoogleVisualizationPackages = function() {
	google.load("visualization", "1", {packages:arguments});
	google.setOnLoadCallback(function(){googleLoaded = true;});
};

Ext.ux.GoogleVisualizationComponent = function(config) {
	Ext.apply(this, {
		autoEl: 'div',
		width: config.visualizationConfig.width,
		height: config.visualizationConfig.height
	});
	Ext.ux.GoogleVisualizationComponent.superclass.constructor.apply(this, arguments);
	this.addEvents('select');
};

Ext.extend(Ext.ux.GoogleVisualizationComponent, Ext.BoxComponent, {
	afterRender: function() {
		Ext.ux.GoogleVisualizationComponent.superclass.afterRender.apply(this, arguments);
		this.draw();
	},
	
	onSelect: function(selection) {
	},
	
	getSelection: function() {
		return this.visualCmp.getSelection();
	},
	
	setSelection: function(arr) {
		this.visualCmp.setSelection(arr);
	},
	
    draw: function() {
		if (!googleLoaded) {
			this.drawChart.defer(100, this);
			return;
		}
        this.table = new window.google.visualization.DataTable();
		if (this.visualizationType == 'ClientLocationMap') {
			this.drawClientLocationMap();
			return;
		}
		var c = this.columns;
		for (var i = 0; i < c.length; i++)
			this.table.addColumn(c[i][0], c[i][1]);
		var d = this.data;
		var l = d.length;
        this.table.addRows(l);
		for (var i = 0; i < l; i++)
			for (var j = 0; j < d[i].length; j++)
					this.table.setValue(i, j, d[i][j]);
		this.drawVisual();
	},
	drawVisual: function() {
		eval('this.visualCmp = new window.google.visualization.' +
				this.visualizationType + '(this.getEl().dom)');
		this.visualCmp.draw(this.table, this.visualizationConfig);
		window.google.visualization.events.addListener(
			this.visualCmp,
			'select',
			(function(selection) {
				this.onSelect(selection);
				this.fireEvent('select', selection);
			}).createDelegate(this)
		);
	},
	drawClientLocationMap: function() {
		var loc = window.google.loader.ClientLocation;
		var add;
		if (loc && loc.address.city)
			add = loc.address.city;
		if (loc && loc.address.region)
			add += ','+loc.address.region;
		if (loc && loc.address.country)
			add += ','+loc.address.country;
		if (add) {
			this.table.addColumn('string', 'Address');
			this.table.addRows(1);
			this.table.setValue(0, 0, add);
			this.visualizationType = 'Map';
			this.drawVisual();
			return;
		}
		if (loc && loc.latitude && loc.longitude) {
			this.table.addColumn('number', 'Lat');
			this.table.addColumn('number', 'Lon');
			this.table.addRows(1);
			this.table.setValue(0, 0, loc.latitude);
			this.table.setValue(0, 1, loc.longitude);
			this.visualizationType = 'Map';
			this.drawVisual();
			return;
		}
		this.getEl().dom.innerHTML = "Unable to determine your location based on your IP address";
	}
});
Ext.reg('googlevisualizationcomponent', Ext.ux.GoogleVisualizationComponent);