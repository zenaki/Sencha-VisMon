Ext.define('VisualMonita.view.vm.editor.canvas.button.ButtonObjectController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.btn-obj-controller',

  onButtonObjectPush: function(menu, item, e, eOpts) {
    if (this.getViewModel().get('button.x_path')) {
      var visualFile_path = this.getViewModel().get('button.x_path');
      visualFile_path = visualFile_path.replace('../', 'resources/vm/');
      Ext.Ajax.request({
        url: visualFile_path,
        success: function(response){
          var JSON_Items = Ext.JSON.decode(response.responseText);
          var canvas = Ext.ComponentQuery.query('#canvas')[0];
          // var canvas = menu.up('panel');
          canvas.removeAll();
          canvas.add(JSON_Items.items);
          var docked = canvas.getDockedItems('toolbar[dock="top"]');
          canvas.removeDocked(docked[0], true);
          canvas.insertDocked(0, JSON_Items.dockedItems);
        }
      });
    }
  },

  onButtonRightClick: function(view, e, element) {
    view.stopEvent();
    var me = this;
    Ext.create('Ext.menu.Menu', {
      width: 100,
      plain: true,
      floating: true,
      renderTo: Ext.getBody(),
      items: [{
        text: 'Add Menu',
        handler: function() {
          var canvas = Ext.ComponentQuery.query('#canvas')[0];
          this.AddButtonWindow = canvas.add({xtype: 'button-form'});
          this.AddButtonWindow.getViewModel().set('x_itemID', me.getView().getId());
          this.AddButtonWindow.show();
        }
      }, {
        text: 'Delete',
        handler: function() {
          me.getView().destroy();
        }
      }]
    }).showAt(view.getXY());
  },

  onMenuObjectPush: function(menu, item, e, eOpts) {
    var visualFile_path = menu.getViewModel().get('x_path');
    visualFile_path = visualFile_path.replace('../', 'resources/vm/');
    Ext.Ajax.request({
      url: visualFile_path,
      success: function(response) {
        var JSON_Items = Ext.JSON.decode(response.responseText);
        var canvas = Ext.ComponentQuery.query('#canvas')[0];
        // var canvas = menu.up('panel').up('panel');
        canvas.removeAll();
        canvas.add(JSON_Items.items);
        var docked = canvas.getDockedItems('toolbar[dock="top"]');
        canvas.removeDocked(docked[0], true);
        canvas.insertDocked(0, JSON_Items.dockedItems);
      }
    });
  },

  onMenuRightClick: function(view, e, element) {
    view.stopEvent();
    var menu_id = e.id;
    menu_id = menu_id.replace('-textEl', '');
    menu_id = menu_id.replace('-itemEl', '');
    Ext.create('Ext.menu.Menu', {
      width: 100,
      plain: true,
      floating: true,
      renderTo: Ext.getBody(),
      items: [{
        text: 'Add Menu',
        handler: function() {
          var canvas = Ext.ComponentQuery.query('#canvas')[0];
          this.AddButtonWindow = canvas.add({xtype: 'button-form'});
          this.AddButtonWindow.getViewModel().set('x_itemID', menu_id);
          this.AddButtonWindow.show();
        }
      }, {
        text: 'Delete',
        handler: function() {
          me.destroy();
        }
      }]
    }).showAt(view.getXY());
  }
});
