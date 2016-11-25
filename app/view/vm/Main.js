Ext.define('VisualMonita.view.vm.Main', {
  extend: 'Ext.container.Container',

  requires: [
    'VisualMonita.view.vm.MainController',
    'VisualMonita.view.vm.MainModel',
    'VisualMonita.view.vm.editor.Editor'
  ],

  xtype: 'vm-main',

  controller: 'vm-main-ctrl',
  viewModel: {
    type: 'vm-main-model'
  },

  layout: {
    type: 'border'
  },

  items: [{
    xtype: 'panel',
    bind: {
      title: '{name}'
    },
    region: 'north'
  }, {
    xtype: 'tabpanel',
    region: 'center',
    items:[{
      xtype: 'vm-editor',
      title: 'Editor'
    }, {
      title: 'Visual'
    }]
  }]
});
