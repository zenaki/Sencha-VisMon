Ext.define('VisualMonita.view.vm.editor.sideBar.upload_items.multipleUpload.MultipleUploadController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-multipleUpload-controller',

  onRender: function(cmp) {
    cmp.fileInputEl.set({
      multiple: true,
      accept: '.png'
    });
  },

  onUpload: function() {
    var win = this.getView()
    var form = win.down('form').getForm();
    if (form.isValid()) {
      form.submit({
        url: 'resources/vm/php/upload_hmi_items.php',
        waitMsg: 'Uploading item(s)...',
        success: function(fp, o) {
          Ext.Msg.alert('Success', 'Item "' + o.result.file + '" has been uploaded.');
          win.close();
          var grid = Ext.ComponentQuery.query('#uploadedGrid')[0];
          grid.getStore().reload();
        },
        failure: function(fp, o) {
          Ext.Msg.alert('Failure', o.result.file || ' - server error', function () {
            win.close();
          });
        }
      });
    }
  },

  onCancel: function() {
    this.getView().close();
  }
});
