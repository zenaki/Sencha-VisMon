Ext.define('VisualMonita.view.vm.editor.canvas.hmi_object.vm-HMI-Object', {
  extend: 'Ext.panel.Panel',
  requires: [
    'VisualMonita.view.vm.editor.canvas.hmi_object.vm-HMI-ObjectController'
  ],
  xtype: 'vm-hmi-object',
  controller: 'vm-hmi-controller',
  resizeable: {
    dynamic: true,
    pinned: true,
    handles: 'all',
    transparent: true
  },
  listeners: {
    resize: 'onPanelObjectResize',
    render: 'onPanelObjectRender',
    mousemove: {
      element: 'el',
      fn: 'onPanelObjectMouseMove'
    },
    contextmenu: {
      element: 'el',
      fn: 'onPanelObjectRightClick'
    }
  },
  height: 50,
  width: 50,
  floating: true,
  shadow: false,
  renderTo: 'CanvasID',
  bodyStyle: 'background:transparent;'
});
