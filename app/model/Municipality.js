Ext.define('AssignmentFinal.model.Municipality', {
  extend: 'Ext.data.Model',
  fields: [
    { name: 'bu_code', type: 'string' },
    { name: 'bu_naam', type: 'string' },
    { name: 'postcode', type: 'float' },
    { name: 'male', type: 'int' },
    { name: 'female', type: 'int' },
    { name: 'total', type: 'int' },
    { name: 'nbr_0_14', type: 'int' },
    { name: 'nbr_15-24', type: 'int' },
    { name: 'nbr_25-44', type: 'int' },
    { name: 'nbr_45_64', type: 'int' },
	{ name: 'nbr_65_eo',  type:'int'},
    { name: 'bev_dichth',  type:'int'}
  ],
  idProperty: 'bu_code'
});
/*-----*/