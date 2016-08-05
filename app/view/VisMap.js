/**
 * Created by Ipsit Dash on 08-05-2015.
 */
Ext.define('AssignmentFinal.view.VisMap' ,{
    extend: 'Ext.panel.Panel',
    alias: 'widget.visMap',

    title: 'Population Distribution Map',
    store: 'MunicipalityData',


    layout: 'fit',

    initComponent: function() {
        console.log('View.VisMap installing');

        this.items = [{
            xtype: 'panel', /* Panel to host the navigation map */
            id: 'visMap',
            layout: 'fit',
            listeners:{
                afterlayout: this.check
            },
            padding: 5
        }],

            this.callParent(arguments);


    },

    /*-- Controls the display of the navigation map */
    check: function(evtPanel){
        VisMapController.initMap(evtPanel);
    }
    /*---*/





});