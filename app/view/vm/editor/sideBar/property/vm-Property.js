Ext.define('VisualMonita.view.vm.editor.sideBar.property.vm-Property', {
  extend: 'Ext.grid.property.Grid',
  requires: [
    'VisualMonita.view.vm.editor.sideBar.property.vm-PropertyController'
  ],
  xtype: 'vm-property',
  itemId: 'properties',
  controller: 'vm-property-controller',
  viewModel: {
    data: {
      x_ItemId: 'N/A',
      x_Height: 0,
      x_Width: 0,
      x_POS_X: 0,
      X_POS_Y: 0,
      x_Disable: true
    }
  },
  nameColumnWidth: 165,
  bind: {
    source: {
      label_1: '{x_ItemId}',
      label_2: '{x_Height}',
      label_3: '{x_Width}',
      label_4: '{x_POS_X}',
      label_5: '{X_POS_Y}'
    }
  },
  sourceConfig: {
    label_1: {displayName: 'Item ID'},
    label_2: {displayName: 'Height'},
    label_3: {displayName: 'Width'},
    label_4: {displayName: 'X'},
    label_5: {displayName: 'Y'}
  },
  listeners: {
    propertychange: 'onPropertyChange'
  },
  disabled: true
});
