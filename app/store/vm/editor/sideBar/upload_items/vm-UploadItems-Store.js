Ext.define('VisualMonita.store.vm.editor.sideBar.upload_items.vm-UploadItems-Store', {
  extend: 'Ext.data.Store',
  model: 'VisualMonita.model.vm.editor.sideBar.upload_items.vm-UploadItems-Model',
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: 'resources/vm/php/get_hmi_uploaded_items.php',
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  }
});
