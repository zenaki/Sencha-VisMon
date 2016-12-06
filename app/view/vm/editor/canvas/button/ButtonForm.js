Ext.define('VisualMonita.view.vm.editor.canvas.button.ButtonForm', {
  extend: 'Ext.window.Window',
  requires: [
    'VisualMonita.view.vm.editor.canvas.button.ButtonFormController'
  ],
  xtype: 'button-form',
  controller: 'btn-controller',
  title: 'Add Button',
  itemId: 'Addbutton',
  modal: true,
  autoShow: true,
  viewModel: {
    data: {
      x_itemID: ''
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
      itemId: 'Button-Caption',
      fieldLabel: 'Caption',
      allowBlank: false
    }, {
      xtype: 'combobox',
      itemId: 'ComboBox-Visual-File',
      fieldLabel: 'Visual File',
      store: 'VisualMonita.store.vm.editor.canvas.button.ButtonFormStore',
      queryMode: 'local',
      displayField: 'visualFile',
      valueField: 'visualFile',
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
