Ext.define('VisualMonita.view.vm.editor.sideBar.upload_items.vm-UploadItems', {
  extend: 'Ext.grid.Panel',
  // requires: [
  //   'VisualMonita.view.vm.editor.sideBar.upload_items.vm-UploadItemsController'
  // ],
  xtype: 'vm-uploadItems',
  itemId: 'uploadedGrid',
  // controller: 'vm-uploadItems-controller',
  store: 'VisualMonita.store.vm.editor.sideBar.upload_items.vm-UploadItems-Store',
  hideHeaders: true,
  viewConfig: {
    plugins: {
      ddGroup: 'hmi-grid-to-panel',
      ptype: 'gridviewdragdrop',
      enableDrop: false
    }
  },
  columns: [{
    dataIndex: 'uploaded',
    renderer: function(value){
      return '<img src="resources/vm/Upload_Items/' + value + '" height="200" width="200" />';
    },
    flex     : 1,
    sortable: false,
    menuDisabled: true
  }]
});
