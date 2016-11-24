Ext.define('VisualMoita.store.vm.editor.table.DataTableStore', {
  extend: 'Ext.data.ArrayStore',
  sorters: [{
    property: 'slave_id',
    direction: 'asc'
  }],
  model: 'VisualMoita.model.vm.editor.table.DataTableModel',
  data: []
});
