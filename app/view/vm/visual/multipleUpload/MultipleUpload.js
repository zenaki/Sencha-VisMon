Ext.define('VisualMonita.view.vm.visual.multipleUpload.MultipleUpload', {
  extend: 'Ext.window.Window',
  requires: [
    'VisualMonita.view.vm.visual.multipleUpload.MultipleUploadController'
  ],
  xtype: 'vm-visual-multipleUpload',
  controller: 'vm-visual-multipleUpload-controller',

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
