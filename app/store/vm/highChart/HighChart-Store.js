Ext.define('VisualMonita.store.vm.highChart.HighChart-Store', {
  extend: 'Ext.data.Store',
  model: 'VisualMonita.model.vm.highChart.HighChart-Model',
  // data: []
  // data : [{
  //   time : '15:37:04:386', //Ext.Date.format (new Date(), 'H:i:s'),
  //   value: 175760419075
  // }, {
  //   time : '15:23:15:334', //Ext.Date.format (new Date(), 'H:i:s'),
  //   value: 175697582192
  // }, {
  //   time : '15:28:30:846', //Ext.Date.format (new Date(), 'H:i:s'),
  //   value: 175721678728
  // }]
  autoLoad : false,
  proxy : {
    type : 'ajax',
    url : 'resources/vm/php/get_chart.php',
    // extraParams: { summary: 0 },
    reader : {
      type : 'json',
      rootProperty : 'data'
    }
  }
});
