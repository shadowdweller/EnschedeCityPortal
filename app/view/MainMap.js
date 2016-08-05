Ext.define('AssignmentFinal.view.MainMap' ,{
     extend: 'Ext.panel.Panel',
    alias: 'widget.mainMap',

    title: 'Enschede Data Viewer',
	store: 'MunicipalityData',
	
	
	layout: 'fit',

    initComponent: function() {
		 console.log('View.MainMap installing');
   
	 this.items = [{
      xtype: 'panel', /* Panel to host the navigation map */
      id: 'mainMap',
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
    MapController.initMap(evtPanel);
  }
  /*---*/
	
	
	
  
	
});