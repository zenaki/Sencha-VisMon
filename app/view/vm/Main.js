Ext.define('VisualMoita.view.vm.Main', {
  extend: 'Ext.container.Container',

  requires: [
    'VisualMoita.view.vm.MainController',
    'VisualMoita.view.vm.MainModel',
    'VisualMoita.view.vm.editor.Editor'
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
