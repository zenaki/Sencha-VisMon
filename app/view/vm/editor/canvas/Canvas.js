Ext.define('VisualMonita.view.vm.editor.canvas.Canvas', {
  extend: 'Ext.draw.Container',
  requires: [
    'VisualMonita.view.vm.editor.canvas.CanvasController',
    'VisualMonita.view.vm.editor.canvas.label.LabelForm',
    'VisualMonita.view.vm.editor.canvas.label.LabelObject',
    'VisualMonita.view.vm.editor.canvas.hmi_object.vm-HMI-Object'
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
    },
    boxready: 'onBoxReady'
  },
  scrollable: true
});
