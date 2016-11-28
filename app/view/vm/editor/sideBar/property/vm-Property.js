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
      x_Title: 'N/A',
      x_Slave_ID: 0,
      x_Titik_Ukur: 0,
      x_Font: 'N/A',
      x_Font_Size: 'N/A',
      x_Color: 'N/A',
      x_Align: 'N/A',
      x_Margin: 0
    }
  },
  nameColumnWidth: 165,
  bind: {
    source: {
      label_01: '{x_ItemId}',
      label_02: '{x_Height}',
      label_03: '{x_Width}',
      label_04: '{x_POS_X}',
      label_05: '{x_POS_Y}'
    }
  },
  sourceConfig: {
    label_01: {displayName: 'Item ID', type: 'string'},
    label_02: {displayName: 'Height', type: 'number'},
    label_03: {displayName: 'Width', type: 'number'},
    label_04: {displayName: 'X', type: 'number'},
    label_05: {displayName: 'Y', type: 'number'},
    label_06: {displayName: 'Title', type: 'string'},
    label_07: {displayName: 'Slave ID', type: 'number'},
    label_08: {displayName: 'Titik Ukur', type: 'number'},
    label_09: {displayName: 'Font', type: 'string'},
    label_10: {displayName: 'Font Size', type: 'string'},
    label_11: {displayName: 'Font Color', type: 'string'},
    label_12: {displayName: 'Font Align', type: 'string'},
    label_13: {displayName: 'Font Margin', type: 'number'}
  },
  listeners: {
    propertychange: 'onPropertyChange'
  },
  disabled: true
});
