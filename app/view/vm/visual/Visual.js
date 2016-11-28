Ext.define('VisualMonita.view.vm.visual.Visual', {
  extend: 'Ext.draw.Container',
  requires: [
    'VisualMonita.view.vm.visual.VisualController',
    'VisualMonita.view.vm.visual.multipleUpload.MultipleUpload'
  ],
  xtype: 'vm-visual',
  controller: 'vm-visual-controller',
  itemId: 'visual',
  id: 'VisualID',
  listeners: {
    contextmenu: {
      element: 'el',
      fn: 'onVisualRightClick'
    }
  },
  scrollable: true
});
