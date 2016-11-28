Ext.define('VisualMonita.view.vm.editor.sideBar.upload_items.multipleUpload.MultipleUpload', {
  extend: 'Ext.window.Window',
  requires: [
    'VisualMonita.view.vm.editor.sideBar.upload_items.multipleUpload.MultipleUploadController'
  ],
  xtype: 'vm-multipleUpload',
  controller: 'vm-multipleUpload-controller',

  title: 'Upload File(s)',
  width: 300,
  autoShow: true,
  modal: true,
  renderTo: Ext.getBody(),
  items: {
    xtype: 'form',
    border: false,
    bodyStyle: {
      padding: '10px'
    },
    items: {
      xtype: 'filefield',
      name: 'new_item[]',
      hideLabel: true,
      allowBlank: false,
      anchor: '100%',
      buttonText: 'Browse Items(s) ...',
      listeners: {
        render: 'onRender'
      }
    }
  },
  buttons: [{
    text: 'Upload',
    handler: 'onUpload'
  }, {
    text: 'Cancel',
    handler: 'onCancel'
  }]
});
