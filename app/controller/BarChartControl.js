/**
 * Created by Ipsit Dash on 07-05-2015.
 */
Ext.define('AssignmentFinal.controller.BarChartControl', {
    extend: 'Ext.app.Controller',

    stores: ['MunicipalityData'],
    models: ['Municipality'],
    views: ['BarChart'],

    barChart: null,

    init: function () {
        console.log('!!!!!');

        BarChartController = this;
    },

    initBarChart: function (evtPanel) {

        var chart = new CanvasJS.Chart("barchart-body", {
            title:{
                text: "Age Composition (Total 100%)",
                horizontalAlign: "right"
            },
            animationEnabled: true,
            toolTip:{
                shared: true,
                content: "{name}: - <strong>#percent%</strong>",
            },
            axisY:{
                title: "Normalized Percentages"
            },
            legend:{
                verticalAlign: "center",
                horizontalAlign: "left"
            },

            data: [
                {
                    name: "Age 0 to 14 years",
                    showInLegend: true,
                    type: "stackedBar100",
                    color: "#004B8D ",
                    dataPoints: [
                        {label: "Low Density", y: 16},
                        {label: "Medium Low Density", y: 15},
                        {label: "Medium Density", y: 18},
                        {label: "Medium High Density", y: 16},
                        {label: "High Density", y: 17}
                    ]
                },
                {
                    name: "Age 15 to 24 years",
                    showInLegend: true,
                    type: "stackedBar100",
                    color: "#0074D9 ",
                    dataPoints: [
                        {label: "Low Density", y: 15},
                        {label: "Medium Low Density", y: 18},
                        {label: "Medium Density", y: 13},
                        {label: "Medium High Density", y: 16},
                        {label: "High Density", y: 14}
                    ]
                },
                {
                    name: "Age 25 to 44 years",
                    showInLegend: true,
                    type: "stackedBar100",
                    color: "#4192D9 ",
                    dataPoints: [
                        {label: "Low Density", y: 19},
                        {label: "Medium Low Density", y: 25},
                        {label: "Medium Density", y: 24},
                        {label: "Medium High Density", y: 28},
                        {label: "High Density", y: 30}
                    ]
                },{
                    name: "Age 25 to 44 years",
                    showInLegend: true,
                    type: "stackedBar100",
                    color: "#4192D9 ",
                    dataPoints: [
                        {label: "Low Density", y: 33},
                        {label: "Medium Low Density", y: 25},
                        {label: "Medium Density", y: 27},
                        {label: "Medium High Density", y: 25},
                        {label: "High Density", y: 23}
                    ]
                }, {
                    name: "Age 65 and above",
                    showInLegend: true,
                    type: "stackedBar100",
                    color: "#7ABAF2 ",
                    dataPoints: [
                        {label: "Low Density", y: 17},
                        {label: "Medium Low Density", y: 17},
                        {label: "Medium Density", y: 17},
                        {label: "Medium High Density", y: 15},
                        {label: "High Density", y: 15}
                    ]
                }

            ]
        });

        chart.render();
    },

    sysUpdate: function(name){

        console.log('sysUpdate start!' + name);
        this.getMunicipalityDataStore().each(function(report) {
            //console.log(report.data.gm_naam + '!!!!');
            if (report.data.bu_naam == name) {
                console.log(report.data.bu_naam + " " + report.data.bev_dichth + '!');

                //BarChart Update
                var chart = new CanvasJS.Chart("barchart-body",
                    {
                        title: {
                            text: report.data.bu_naam + " "+"Inhabitants"
                        },
                        animationEnabled: true,
                        axisY: {
                            title: "Number of Persons"
                        },
                        legend: {
                            verticalAlign: "bottom",
                            horizontalAlign: "center"
                        },
                        theme: "theme2",
                        data: [

                            {
                                type: "column",
                                showInLegend: true,
                                legendMarkerColor: "grey",
                                legendText: "Number of Persons",
                                dataPoints: [
                                    {y: report.data.male, label: "Male Inhabitants"},
                                    {y: report.data.female, label: "Female Inhabitants"},
                                    {y: report.data.total, label: "Total Inhabitants"}
                                ]
                            }
                        ]
                    });

                chart.render();
            }
        });

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