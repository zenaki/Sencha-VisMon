Ext.define('VisualMonita.view.vm.editor.canvas.multipleUpload.MultipleUploadController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-canvas-multipleUpload-controller',

  onRender: function(cmp) {
    cmp.fileInputEl.set({
      multiple: true,
      accept: '.json'
    });
  },

  onUpload: function() {
    var win = this.getView()
    var form = win.down('form').getForm();
    if (form.isValid()) {
      form.submit({
        url: 'resources/vm/php/load_visual_monita.php',
        waitMsg: 'Loading File(s)...',
        success: function(fp, o) {
          Ext.Ajax.request({
            url: 'resources/vm/Visual_Items/Visual_Monita.json',
            success: function(response){
              var JSON_Items = Ext.JSON.decode(response.responseText);
              var canvas = Ext.ComponentQuery.query('#canvas')[0];
              canvas.removeAll();
              canvas.add(JSON_Items.items);
            }
          });
          Ext.Msg.alert('Success', 'File "' + o.result.file + '" has been loaded.');
          win.close();
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
