Ext.define('VisualMonita.view.vm.editor.Editor', {
  extend: 'Ext.container.Container',
  requires: [
    'VisualMonita.view.vm.editor.EditorController',
    'VisualMonita.view.vm.editor.webSocket.ws-Form',
    'VisualMonita.view.vm.editor.table.DataTable',
    'VisualMonita.view.vm.editor.canvas.Canvas',
    'VisualMonita.view.vm.editor.sideBar.SideBar',
    'VisualMonita.view.vm.highChart.HighChart'
  ],
  xtype: 'vm-editor',
  controller: 'editor-controller',
  layout: {
    type: 'border',
    align: 'stretch'
  },
  items: [{
    xtype: 'webSocket-form',
    region: 'west'
  }, {
    xtype: 'vm-canvas',
    region: 'center'
  }, {
    xtype: 'vm-sideBar',
    region: 'east'
  }, {
    xtype: 'vm-data-table',
    region: 'south'
  }]
});
