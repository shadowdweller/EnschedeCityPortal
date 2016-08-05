Ext.define('AssignmentFinal.view.DoughnutChart' ,{
     extend: 'Ext.panel.Panel',
    alias: 'widget.doughnutChart',

    title: 'Dummy Doughnut /Normalized Age Composition',
	store: 'MunicipalityData',
	
	
	layout: 'fit',

    initComponent: function() {
        //var test_data = Ext.getStore("MunicipalityData");
		//alert(test_data.type);
		 console.log('~~~~');

        
		
		
        // var da = Ext.getStore("MunicipalityData");		
        // alert(da[0]);	
        // alert(da.getById('gid').data.description);		 
         
		 this.items = [{
      xtype: 'panel', /* Panel to host the navigation map */
      id: 'doughnut',
      layout: 'fit',
	  listeners:{
	     afterlayout: this.check
	  },
      padding: 5
    }],
 
    
 
   
		 
		 
		//da.each(function(record){
        //alert(record);
      //});
	  
       // this.columns = [
         //   {header: 'Name',  dataIndex: 'gid',  flex: 1},
        //    {header: 'Email', dataIndex: 'gm_naam', flex: 1}
      // ];
        
		 //alert(da.getById('FIELD1').data.description);	
		 
        this.callParent(arguments);
		
		
		
		
        //this.callParent(arguments);
    },
	
	 /*-- Controls the display of the navigation map */
  check: function(evtPanel){
    DoughnutController.initPieChart(evtPanel);
  }
  /*---*/
	
	
	
  
	
});