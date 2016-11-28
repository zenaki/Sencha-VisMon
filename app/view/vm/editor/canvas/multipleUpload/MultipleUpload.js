Ext.define('VisualMonita.view.vm.editor.canvas.multipleUpload.MultipleUpload', {
  extend: 'Ext.window.Window',
  requires: [
    'VisualMonita.view.vm.editor.canvas.multipleUpload.MultipleUploadController'
  ],
  xtype: 'vm-canvas-multipleUpload',
  controller: 'vm-canvas-multipleUpload-controller',

  title: 'Visual Upload File(s)',
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
      name: 'visualFiles[]',
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
