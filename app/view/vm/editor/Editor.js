Ext.define('VisualMoita.view.vm.editor.Editor', {
  extend: 'Ext.container.Container',

  requires: [
    'VisualMoita.view.vm.editor.webSocket.ws-Form',
    'VisualMoita.view.vm.editor.table.DataTable',
    'VisualMoita.view.vm.editor.canvas.Canvas'
  ],

  xtype: 'vm-editor',

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
    xtype: 'vm-data-table',
    region: 'south'
  }]
});
