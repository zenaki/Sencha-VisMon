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
      x_Normal_Color: 'N/A',
      x_Align: 'N/A',
      x_Margin: 0,
      x_Batas_Atas_2: 0,
      x_Warna_Batas_Atas_2: 'N/A',
      x_Batas_Atas_1: 0,
      x_Warna_Batas_Atas_1: 'N/A',
      x_Batas_Bawah_1: 0,
      x_Warna_Batas_Bawah_1: 'N/A',
      x_Batas_Bawah_2: 0,
      x_Warna_Batas_Bawah_2: 'N/A'
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
    label_11: {displayName: 'Font Color (Normal)', type: 'string'},
    label_12: {displayName: 'Font Align', type: 'string'},
    label_13: {displayName: 'Font Margin', type: 'number'},
    label_14: {displayName: 'Batas Atas 2', type: 'number'},
    label_15: {displayName: 'Warna Batas Atas 2', type: 'string'},
    label_16: {displayName: 'Batas Atas 1', type: 'number'},
    label_17: {displayName: 'Warna Batas Atas 1', type: 'string'},
    label_18: {displayName: 'Batas Bawah 1', type: 'number'},
    label_19: {displayName: 'Warna Batas Bawah 1', type: 'string'},
    label_20: {displayName: 'Batas Bawah 2', type: 'number'},
    label_21: {displayName: 'Warna Batas Bawah 2', type: 'string'}
  },
  listeners: {
    propertychange: 'onPropertyChange'
  },
  disabled: true
});
