Ext.define('VisualMonita.view.vm.visual.multipleUpload.MultipleUploadController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.vm-visual-multipleUpload-controller',

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
              var index_object = 0, index_label = 0;
              var JSON_Items = Ext.JSON.decode(response.responseText);
              var visual = Ext.ComponentQuery.query('#visual')[0];
              visual.removeAll();
              for (var i = 0; i < Object.keys(JSON_Items.items).length; i++) {
                JSON_Items.items[i].renderTo = 'VisualID';
                JSON_Items.items[i].resizable = false;
                JSON_Items.items[i].xtype = 'panel';
                JSON_Items.items[i].floating = true;
                JSON_Items.items[i].shadow = false;
                if (JSON_Items.items[i].viewModel.data.x_type == 'item_object') {
                  index_object++;
                  JSON_Items.items[i].id = 'vm_object_' + index_object;
                  JSON_Items.items[i].itemId = 'vm_object_' + index_object;
                } else if (JSON_Items.items[i].viewModel.data.x_type == 'item_label') {
                  index_label++;
                  JSON_Items.items[i].id = 'vm_label_' + index_label;
                  JSON_Items.items[i].itemId = 'vm_label_' + index_label;
                  JSON_Items.items[i].split = true;
                  JSON_Items.items[i].collapsible = true;
                  JSON_Items.items[i].collapsed = false;
                  JSON_Items.items[i].floatable = false;
                  JSON_Items.items[i].bodyBorder = true;
                  JSON_Items.items[i].border = 5;
                  // JSON_Items.items[i].style.borderStyle = 'solid';
                }
              }
              visual.add(JSON_Items.items);
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
