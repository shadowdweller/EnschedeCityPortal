Ext.require([ 
  'Ext.grid.*',
  'Ext.container.Viewport',
  'Ext.tab.Panel',
  'Ext.layout.container.Border',
  'Ext.chart.*',
  'Ext.layout.container.Fit', 
  'Ext.window.MessageBox'
  
]);
 
Ext.Loader.setConfig({
  enabled : true
  ,disableCaching : true
});              
  
Ext.application({
  
  name: 'AssignmentFinal',
  appFolder: 'app',
  
  controllers: ['DoughnutControl', 'MapControl','BarChartControl','BubbleChartControl'],
  
  launch: function() {
    Ext.create('Ext.container.Viewport', { /* Viewport */
      padding: 5,
      layout: 'fit',
      items: [{
        xtype: 'tabpanel',
        activeTab: 0,
        items: [{
          name: 'planning-panel',
          title: '&nbsp;&nbsp;map&nbsp;',
          layout: 'border',
    items: [{
      xtype: 'mainMap', /* ReportsLocation View */
      layout: 'fit',
      region: 'center'
    }, {
        xtype: 'panel',
        name: 'south-panel',
        layout: 'border',
        region: 'south',
        minHeight: 200,
        maxHeight: 400,
        split: true,
        collapsible: true,
        height: 500,
        items: [{
            xtype: 'doughnutChart', /* CloseUp View */
            width: 600,
            region: 'west',
            margins: 2,
            //html:'a'
        },{
            xtype: 'barChart', /* CloseUp View */
            width: 600,
            region: 'west',
            margins: 2,
            //html:'a'
        },{
            xtype: 'bubbleChart', /* ReportsList View */
            region: 'center',
            padding: '2 0 2 0',
            height: 200,
            //html:z
        }]
    }]
    },{
        name: 'visualizer',
        title: '&nbsp;&nbsp;Statistical & Cadastral Data&nbsp;&nbsp;',
        layout: 'border',
        items: [{
            xtype: 'panel', /* Overlays View */
            layout: 'fit',
            region: 'center',
            margins: '2 2 2 0'
        }]
        }],
        border: false,
        tabBar: {
          items: [{
            xtype: 'tbfill'
          },{
            xtype: 'tool',
            type:'help',
            tooltip: 'Get Help',
            margins: '3 3 0 0',
            handler: function(event, toolEl, panel){
              /* Code to show help goes here */
            }   
          }]
        }                     
      }]
    });
  
    cityApp = this;
     
    /*-- Uncomment the line below in case of 'Gateway Timeout' responses on Layers  */
    /* OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3; */
 
  }
  
});
/*-----*/