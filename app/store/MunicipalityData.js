Ext.define('AssignmentFinal.store.MunicipalityData', {
    extend: 'Ext.data.Store',
    model: 'AssignmentFinal.model.Municipality',
	  autoLoad: true,
     
    proxy: {
    type: 'ajax',
    api: {
        read: 'data/finalldata.json',
        
    },
    reader: {
        type: 'json',
		root: 'features',
		record: 'properties',
        successProperty: 'success'
    }
}
		
		
});