Ext.define('VisualMonita.view.vm.visual.button.ButtonObject', {
  extend: 'Ext.button.Button',
  requires: [
    'VisualMonita.view.vm.visual.button.ButtonObjectController'
  ],
  xtype: 'visual-button-object',
  controller: 'visual-btn-obj-controller',

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
    click: 'onButtonObjectPush'
  }
});
