Ext.define('VisualMonita.view.vm.editor.canvas.button.ButtonObject', {
  extend: 'Ext.button.Button',
  requires: [
    'VisualMonita.view.vm.editor.canvas.button.ButtonObjectController'
  ],
  xtype: 'vm-button-object',
  controller: 'btn-obj-controller',

  viewModel: {
    data: {
      button: {
        x_text: '',
        x_path: ''
      }
    }
  },

  bind: {
    text: '{button.x_text}'
  },
  listeners: {
    click: 'onButtonObjectPush',
    contextmenu: {
      element: 'el',
      fn: 'onButtonRightClick'
    }
  }
  // menu: []
});
