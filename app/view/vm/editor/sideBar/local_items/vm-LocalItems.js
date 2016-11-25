Ext.define('VisualMonita.view.vm.editor.sideBar.local_items.vm-LocalItems', {
  extend: 'Ext.grid.Panel',
  xtype: 'vm-localItems',
  store: 'VisualMonita.store.vm.editor.sideBar.local_items.vm-LocalItems-Store',
  hideHeaders: true,
  viewConfig: {
    plugins: {
      ddGroup: 'hmi-grid-to-panel',
      ptype: 'gridviewdragdrop',
      enableDrop: false
    }
  },
  columns: [{
    dataIndex: 'onlocal',
    renderer: function(value){
      return '<img src="resources/vm/Local_Items/' + value + '" height="200" width="200" />';
    },
    flex     : 1,
    sortable: false,
    menuDisabled: true
  }]
});
