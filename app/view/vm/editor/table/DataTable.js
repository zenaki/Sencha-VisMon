Ext.define('VisualMonita.view.vm.editor.table.DataTable', {
  extend: 'Ext.grid.Panel',
  requires: [
    'Ext.grid.RowNumberer'
  ],
  xtype: 'vm-data-table',
  itemId: 'tableVisMon',
  title: 'Data Table',
  store: 'VisualMonita.store.vm.editor.table.DataTableStore',
  columnLines: true,
  height: 300,
  split: true,
  collapsible: true,
  collapsed: true,
  floatable: false,
  autoLoad: true,
  autoRender: true,
  autoShow: true
});
