Ext.define('Sencha_Draw.view.vm.json_grid.json_store', {
  extend: 'Ext.data.ArrayStore',
  model: 'Sencha_Draw.view.vm.json_grid.json_model',
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: 'data.php',
    reader: {
      type: 'json',
      root: 'root'
    }
  }
  // fields: [],
  // data: [],
  // proxy: {
  //   type: 'ajax',
  //   url: 'data.php',
  //   // success: function(response) {
  //   //   console.log('response = '); console.log(response);
  //   // }
  //   callback: function(data) {
  //     console.log(data);
  //   }
  // }
});
