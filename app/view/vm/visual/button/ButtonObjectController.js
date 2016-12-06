Ext.define('VisualMonita.view.vm.visual.button.ButtonObjectController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.visual-btn-obj-controller',

  onButtonObjectPush: function(menu, item, e, eOpts) {
    if (this.getViewModel().get('button.x_path')) {
      var visualFile_path = this.getViewModel().get('button.x_path');
      visualFile_path = visualFile_path.replace('../', 'resources/vm/');
      Ext.Ajax.request({
        url: visualFile_path,
        success: function(response){
          var index_object = 0, index_label = 0, index_button = 0;
          var JSON_Items = Ext.JSON.decode(response.responseText);
          var canvas = Ext.ComponentQuery.query('#visual')[0];
          // var canvas = menu.up('panel').up('panel');
          for (var i = 0; i < Object.keys(JSON_Items.items).length; i++) {
            JSON_Items.items[i].renderTo = 'VisualID';
            if (JSON_Items.items[i].viewModel.data.x_type == 'item_object') {
              index_object++;
              JSON_Items.items[i].xtype = 'panel';
              JSON_Items.items[i].id = 'vm_object_' + index_object;
              JSON_Items.items[i].itemId = 'vm_object_' + index_object;
              JSON_Items.items[i].resizable = false;
              JSON_Items.items[i].floating = true;
              JSON_Items.items[i].shadow = false;
            } else if (JSON_Items.items[i].viewModel.data.x_type == 'item_label') {
              index_label++;
              JSON_Items.items[i].xtype = 'visual-label-object';
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
          canvas.removeAll();
          canvas.add(JSON_Items.items);
          var docked = canvas.getDockedItems('toolbar[dock="top"]');
          delete JSON_Items.dockedItems.items[1];
          for (var i = 0; i < Object.keys(JSON_Items.dockedItems.items[0].items).length; i++) {
            index_button++;
            JSON_Items.dockedItems.items[0].items[i].xtype = 'visual-button-object';
            JSON_Items.dockedItems.items[0].items[i].id = 'vm_button'+index_button;
            JSON_Items.dockedItems.items[0].items[i].itemId = 'vm_button'+index_button;
          }
          canvas.removeDocked(docked[0], true);
          canvas.insertDocked(0, JSON_Items.dockedItems);
        }
      });
    }
  },

  onMenuObjectPush: function(menu, item, e, eOpts) {
    var visualFile_path = menu.getViewModel().get('x_path');
    visualFile_path = visualFile_path.replace('../', 'resources/vm/');
    Ext.Ajax.request({
      url: visualFile_path,
      success: function(response) {
        var index_object = 0, index_label = 0, index_button = 0;
        var JSON_Items = Ext.JSON.decode(response.responseText);
        var canvas = Ext.ComponentQuery.query('#visual')[0];
        // var canvas = menu.up('panel').up('panel');
        for (var i = 0; i < Object.keys(JSON_Items.items).length; i++) {
          JSON_Items.items[i].renderTo = 'VisualID';
          if (JSON_Items.items[i].viewModel.data.x_type == 'item_object') {
            index_object++;
            JSON_Items.items[i].xtype = 'panel';
            JSON_Items.items[i].id = 'vm_object_' + index_object;
            JSON_Items.items[i].itemId = 'vm_object_' + index_object;
            JSON_Items.items[i].resizable = false;
            JSON_Items.items[i].floating = true;
            JSON_Items.items[i].shadow = false;
          } else if (JSON_Items.items[i].viewModel.data.x_type == 'item_label') {
            index_label++;
            JSON_Items.items[i].xtype = 'visual-label-object';
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
        canvas.removeAll();
        canvas.add(JSON_Items.items);
        var docked = canvas.getDockedItems('toolbar[dock="top"]');
        delete JSON_Items.dockedItems.items[1];
        for (var i = 0; i < Object.keys(JSON_Items.dockedItems.items[0].items).length; i++) {
          index_button++;
          JSON_Items.dockedItems.items[0].items[i].xtype = 'visual-button-object';
          JSON_Items.dockedItems.items[0].items[i].id = 'vm_button'+index_button;
          JSON_Items.dockedItems.items[0].items[i].itemId = 'vm_button'+index_button;
        }
        canvas.removeDocked(docked[0], true);
        canvas.insertDocked(0, JSON_Items.dockedItems);
      }
    });
  },

  onMenuRightClick: function(view, e, element) {
    view.stopEvent();
  }
});
