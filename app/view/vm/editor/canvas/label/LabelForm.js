Ext.define('VisualMonita.view.vm.editor.canvas.label.LabelForm', {
  extend: 'Ext.window.Window',
  requires: [
    'VisualMonita.view.vm.editor.canvas.label.LabelFormController'
  ],
  xtype: 'label-form',
  controller: 'lbl-controller',
  title: 'Add Label',
  itemId: 'Addlabel',
  modal: true,
  autoShow: true,
  viewModel: {
    data: {
      x_POS_X: 0,
      x_POS_Y: 0,
      x_ItemId: ''
    }
  },
  items: {
    xtype: 'form',
    border: false,
    bodyStyle: {
      padding: '10px'
    },
    items: [{
      xtype: 'textfield',
      itemId: 'label_vismon',
      fieldLabel: 'Title',
      allowBlank: false
    }, {
      xtype: 'textfield',
      itemId: 'slave_id_vismon',
      fieldLabel: 'Slave ID',
      allowBlank: false
    }, {
      xtype: 'textfield',
      itemId: 'titik_ukur_vismon',
      fieldLabel: 'Titik Ukur',
      allowBlank: false
    }]
  },
  buttons: [{
    text: 'Add',
    handler: 'onAddFormClick'
  }, {
    text: 'Cancel',
    handler: 'onCancelFormClick'
  }]
});
