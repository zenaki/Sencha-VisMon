Ext.define('VisualMoita.view.vm.editor.canvas.Canvas', {
  extend: 'Ext.draw.Container',
  requires: [
    'VisualMoita.view.vm.editor.canvas.CanvasController',
    'VisualMoita.view.vm.editor.canvas.label.LabelForm',
    'VisualMoita.view.vm.editor.canvas.label.LabelObject'
  ],
  xtype: 'vm-canvas',
  controller: 'cvs-controller',
  itemId: 'canvas',
  id: 'CanvasID',
  viewModel: {
    data: {
      x_object: ''
    }
  },
  listeners: {
    mousemove: {
      element: 'el',
      fn: 'onCanvasMouseMove'
    },
    contextmenu: {
      element: 'el',
      fn: 'onCanvasRightClick'
    }
  },
  scrollable: true,
  dockedItems: [{
    xtype: 'toolbar',
    dock: 'top',
    items: [{
      xtype: 'button',
      text: 'Save Visual Monita',
      listeners: {
        click: 'onSaveVisualMonita'
      }
    }, {
      xtype: 'button',
      text: 'Load Visual Monita',
      listeners: {
        click: 'onloadVisualMonitaEditor'
      }
    }]
  }]
});
