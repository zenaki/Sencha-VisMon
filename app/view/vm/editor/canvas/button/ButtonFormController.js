Ext.define('VisualMonita.view.vm.editor.canvas.button.ButtonFormController', {
  extend: 'Ext.app.ViewController',
  alias: 'controller.btn-controller',

  onAddFormClick: function() {
    var me = this;
    var caption = Ext.ComponentQuery.query('#Button-Caption')[0];
    var visual_file = Ext.ComponentQuery.query('#ComboBox-Visual-File')[0];
    if (this.getViewModel().get('x_itemID')) {
      var button = Ext.getCmp(this.getViewModel().get('x_itemID'));
      me.onAddMenuClick(button, caption.getValue(), visual_file.getValue());
    } else {
      var segment = Ext.ComponentQuery.query('#SegButt')[0];
      me.onAddButtonClick(segment, caption.getValue(), visual_file.getValue());
    }
    me.getView().close();
  },

  onCancelFormClick: function() {
    var me = this;
    me.getView().close();
  },

  onAddButtonClick: function(segment, caption, visual_file) {
    segment.add({
      xtype: 'vm-button-object',
      viewModel: {
        data: {
          button: {
            x_text: caption,
            x_path: visual_file
          }
        }
      }
    });
  },

  onAddMenuClick: function(button, caption, visual_file) {
    // var data = button.getViewModel().getData();
    // if (data['menu']) {
    //   data['menu'].push({'x_text': caption, 'x_path': visual_file});
    // } else {
    //   data['menu'] = [];
    //   data['menu'].push({'x_text': caption, 'x_path': visual_file});
    // }
    if (button.getMenu()) {
      var menu = button.getMenu();
      menu.add({
        text: caption,
        viewModel: {
          data: {
            x_path: visual_file
          }
        },
        listeners: {
          click: 'onMenuObjectPush',
          contextmenu: {
            element: 'el',
            fn: 'onMenuRightClick'
          }
        }
      });
      // button.setMenu(menu);
    } else {
      button.setMenu({
        xtype: 'menu',
        items: [{
          text: caption,
          viewModel: {
            data: {
              x_path: visual_file
            }
          },
          listeners: {
            click: 'onMenuObjectPush',
            contextmenu: {
              element: 'el',
              fn: 'onMenuRightClick'
            }
          }
        }]
      })
    }
  }
});
