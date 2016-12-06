Ext.define('VisualMonita.store.vm.editor.canvas.button.ButtonFormStore', {
  extend: 'Ext.data.Store',
  model: 'VisualMonita.model.vm.editor.canvas.button.ButtonFormModel',
  autoLoad: true,
  proxy: {
    type: 'ajax',
    url: 'resources/vm/php/get_visual_files.php',
    reader: {
      type: 'json',
      rootProperty: 'data'
    }
  }
});
