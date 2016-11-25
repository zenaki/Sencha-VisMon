Ext.define('VisualMonita.store.vm.editor.sideBar.local_items.vm-LocalItems-Store', {
  extend: 'Ext.data.Store',
  model: 'VisualMonita.model.vm.editor.sideBar.local_items.vm-LocalItems-Model',
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: 'resources/vm/php/get_hmi_local_items.php',
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  }
});
