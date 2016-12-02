Ext.define('VisualMonita.store.vm.editor.table.DataTableStore', {
  extend: 'Ext.data.ArrayStore',
  sorters: [{
    property: 'slave_id',
    direction: 'asc'
  }],
  model: 'VisualMonita.model.vm.editor.table.DataTableModel',
  data: []
});
