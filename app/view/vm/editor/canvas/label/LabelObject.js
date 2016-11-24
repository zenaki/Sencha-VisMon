Ext.define('VisualMoita.view.vm.editor.canvas.label.LabelObject', {
  extend: 'Ext.panel.Panel',
  requires: [
    'VisualMoita.view.vm.editor.canvas.label.LabelObjectController'
  ],
  xtype: 'vm-label-object',
  controller: 'lbl-obj-controller',

  split: true,
  collapsible: true,
  collapsed: false,
  floatable: false,
  bodyBorder: true,
  border: 5,
  style: {
    borderStyle: 'solid'
  },
  height: 100,
  width: 150,
  bodyStyle: 'background:transparent;',
  resizable: {
    dynamic: true,
    pinned: true,
    handles: 'all'
  },
  floating: true,
  renderTo: 'CanvasID',
  listeners: {
    resize: 'onPanelResize',
    render: 'onPanelLabelRender',
    mousemove: {
      element: 'el',
      fn: 'onPanelLabelMouseMove'
    },
    contextmenu: {
      element: 'el',
      fn: 'onLabelRightClick'
    }
  }
});
