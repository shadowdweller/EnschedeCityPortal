/**
 * Created by Ipsit Dash on 08-05-2015.
 */
Ext.define('AssignmentFinal.controller.BubbleChartControl', {
    extend: 'Ext.app.Controller',

    stores: ['MunicipalityData'],
    models: ['Municipality'],
    views: ['BubbleChart'],

    bubbleChart: null,

    init: function () {
        console.log('!!!!!');

        BubbleChartController = this;
    },

    initBubbleChart: function (evtPanel) {



        var chart = new CanvasJS.Chart("bubblechart-body",
            {
                zoomEnabled: true,
                animationEnabled: true,
                title:{
                    text: "Aggregated Population Description"
                },
                axisX: {
                    title:"Male Inhabitants",
                    valueFormatString: "#0.#",
                    maximum: 35000,
                    interval: 5000,
                    gridThickness: 1,
                    tickThickness: 1,
                    gridColor: "lightgrey",
                    tickColor: "lightgrey",
                    lineThickness: 0
                },
                axisY:{
                    title: "Female Inhabitants",
                    gridThickness: 1,
                    tickThickness: 1,
                    gridColor: "lightgrey",
                    tickColor: "lightgrey",
                    lineThickness: 0,
                    valueFormatString:"#0.#",
                    maximum: 35000,
                    interval: 5000

                },

                data: [
                    {
                        type: "bubble",
                        toolTipContent: "<span style='\"'color: {color};'\"'><strong>{label}</strong></span><br/> <strong>Male Population</strong> {x} numbers <br/> <strong>Female Population</strong> {y} numbers<br/> <strong>Total Population</strong> {z} number",
                        dataPoints: [
                            { x: 2930, y: 2625, z:5580,  label:"Low Density Regions Total" },
                            { x: 6275, y: 5410, z:11700,  label:"Medium Low Density Regions Total" },
                            { x: 8995, y: 9275, z:18290,  label:"Medium Density Regions Total" },
                            { x: 30295, y: 29300, z:59610,  label:"Medium High Density Total" },
                            { x: 31890, y: 31470, z:63385,  label:"High Density Total" }


                        ]
                    }
                ]
            });

        chart.render();
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